import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import logo from '../../assets/images/logoSafra.png';
import BtnVoltar from '../../components/btnVoltar';
import CardSafra from '../../components/cardSafra';
import BtnAddTalhao from '../../components/btnAddTalhao';
import BottomModal from '../../components/bottomModal';
import Btn from '../../components/button';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';

const NovaSafra = ({ route, navigation }) => {
    const { token } = useContext(UserContext); // Obtém o token do contexto
    const safraId = route?.params?.safraId || null; // Usa o safraId passado como parâmetro
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItems, setSelectedItems] = useState({
        talhao: null,
        cultura: null,
    });
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [nomeSafra, setNomeSafra] = useState('');
    const [safraTalhoes, setSafraTalhoes] = useState([]); // Estado para armazenar os SafraTalhao
    const [talhoes, setTalhoes] = useState([]); // Estado para armazenar todos os talhões disponíveis
    const [culturas, setCulturas] = useState([]); // Estado para armazenar todas as culturas disponíveis


    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Busca os dados da safra
    const fetchSafraData = async () => {
        if (!safraId) return;

        try {
            const response = await axios.get(`http://localhost:3000/api/safra/editar/${safraId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                const { nome, dataInicio, dataFim } = response.data;
                setNomeSafra(nome);
                setDataInicio(dataInicio);
                setDataFim(dataFim);
            }
        } catch (error) {
            console.error('Erro ao buscar dados da safra:', error);
            Alert.alert('Erro', 'Não foi possível carregar os dados da safra.');
        }
    };

    const fetchSafraTalhoes = async () => {
        if (!safraId) {
            Alert.alert('Erro', 'ID da safra não fornecido.');
            return;
        }

        try {
            console.log(`Buscando talhões para safraId: ${safraId}`);

            const response = await axios.get(
                `http://localhost:3000/api/safraTalhao/safra/${safraId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log('Resposta do servidor:', response.data);
            setSafraTalhoes(response.data);
        } catch (error) {
            console.error('Erro ao buscar talhões:', error.response?.data || error.message);
            Alert.alert('Erro', error.response?.data?.message || 'Erro ao buscar talhões.');
        }
    };


    const fetchTalhoes = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/talhoes`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200 && response.data.length > 0) {
                setTalhoes(response.data); // Define os talhões no estado
            } else {
                Alert.alert('Atenção', 'Nenhum talhão encontrado.');
                setTalhoes([]); // Garante que o estado não fica indefinido
            }
        } catch (error) {
            console.error('Erro ao buscar talhões:', error);
            Alert.alert('Erro', 'Não foi possível carregar os talhões.');
        }
    };

    const fetchCulturas = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/cultura`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200 && response.data.length > 0) {
                setCulturas(response.data); // Define as culturas no estado
            } else {
                Alert.alert('Atenção', 'Nenhuma cultura encontrada.');
                setCulturas([]); // Garante que o estado não fica indefinido
            }
        } catch (error) {
            console.error('Erro ao buscar culturas:', error);
            Alert.alert('Erro', 'Não foi possível carregar as culturas.');
        }
    };


    useEffect(() => {
        fetchSafraData();
        fetchSafraTalhoes();
        fetchTalhoes();
        fetchCulturas();
    }, []);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleSelect = (value, type) => {
        setSelectedItems((prevState) => ({
            ...prevState,
            [type]: value,
        }));
    };

    // Cadastra um novo SafraTalhao
    const handleCadastrarSafraTalhao = async () => {
        const { talhao, cultura } = selectedItems;

        if (!talhao || !cultura) {
            Alert.alert('Erro', 'Por favor, selecione um talhão e uma cultura.');
            return;
        }

        try {
            console.log('Dados para cadastro:', { status: 'ativo', talhaoId: talhao, culturaId: cultura, safraId });

            const response = await axios.post(
                `http://localhost:3000/api/safraTalhao/novo`,
                {
                    status: 'Aberto',
                    talhaoId: talhao,
                    culturaId: cultura,
                    safraId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Resposta do backend:', response.data);
            Alert.alert('Sucesso', 'Talhão cadastrado com sucesso!');

            // Fechar o modal
            handleCloseModal();

            // Atualizar a lista de SafraTalhoes
            fetchSafraTalhoes();

        } catch (error) {
            console.error('Erro ao cadastrar SafraTalhao:', error.response?.data || error.message);
            Alert.alert('Erro', error.response?.data?.message || 'Erro ao cadastrar SafraTalhao.');
        }
    };



    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="GerenciamentoSafra" />

                <Image source={logo} style={styles.image} />

                <Text style={styles.h1}>{nomeSafra || 'Safra'}</Text>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Data de Início:</Text>
                    <Text style={styles.value}>{formatDate(dataInicio)}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Data de Término:</Text>
                    <Text style={styles.value}>{formatDate(dataFim)}</Text>
                </View>

                <View style={styles.inputRow}>
                    <Text style={styles.h2}>Talhões registrados</Text>
                    <BtnAddTalhao onPress={handleOpenModal} />
                </View>

                <View>
                    {safraTalhoes.map((safraTalhao) => (
                        <CardSafra
                            key={safraTalhao.id}
                            talhao={safraTalhao.talhao.nome}
                            cultura={safraTalhao.cultura.nome}
                            onDelete={() => console.log(`Excluir SafraTalhao ${safraTalhao.id}`)}
                        />
                    ))}
                </View>

                <BottomModal visible={modalVisible} onClose={handleCloseModal}>
                    <Text>Talhão</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={talhoes.map((talhao) => {
                            console.log('Talhão carregado:', talhao); // Debug
                            return { label: talhao.nome, value: talhao.id };
                        })}
                        labelField="label"
                        valueField="value"
                        placeholder="Selecione um talhão"
                        value={selectedItems.talhao}
                        onChange={(item) => handleSelect(item.value, 'talhao')}
                    />

                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={culturas.map((cultura) => {
                            console.log('Cultura carregada:', cultura); // Debug
                            return { label: cultura.nome, value: cultura.id };
                        })}
                        labelField="label"
                        valueField="value"
                        placeholder="Selecione uma cultura"
                        value={selectedItems.cultura}
                        onChange={(item) => handleSelect(item.value, 'cultura')}
                    />

                    <Btn label="CADASTRAR" width={'100%'} onPress={handleCadastrarSafraTalhao} />
                </BottomModal>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#18603A',
    },
    image: {
        marginTop: 10,
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    h1: {
        marginTop: 20,
        marginBottom: 5,
        color: 'white',
        fontSize: 24,
        alignSelf: 'center',
    },
    h2: {
        marginTop: 10,
        marginBottom: 5,
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 10,
    },
    label: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    value: {
        color: '#fff',
        fontSize: 16,
    },
    dropdown: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
    },
});

export default NovaSafra;
