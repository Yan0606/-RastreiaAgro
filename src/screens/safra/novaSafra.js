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
    const { token, usuarioId } = useContext(UserContext); // Obtém o token e o usuarioId do contexto
    const safraId = route?.params?.safraId || null; // Usa um valor padrão para safraId
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItems, setSelectedItems] = useState({
        talhao: null,
        cultura: null,
        tipoIrriga: null,
    });
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [nomeSafra, setNomeSafra] = useState('');
    const [talhoes, setTalhoes] = useState([]); // Estado para armazenar os talhões
    const [culturas, setCulturas] = useState([]); // Estado para armazenar as culturas

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

    const fetchTalhoes = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/talhoes?usuarioId=${usuarioId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setTalhoes(response.data); // Define os talhões no estado
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
            if (response.status === 200) {
                setCulturas(response.data); // Define as culturas no estado
            }
        } catch (error) {
            console.error('Erro ao buscar culturas:', error);
            Alert.alert('Erro', 'Não foi possível carregar as culturas.');
        }
    };

    useEffect(() => {
        fetchSafraData();
        fetchTalhoes(); // Busca os talhões ao carregar a tela
        fetchCulturas(); // Busca as culturas ao carregar a tela
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
        console.log(`Selected ${type}:`, value);
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="GerenciamentoSafra" />

                <Image source={logo} style={styles.image} />

                <Text style={styles.h1}>
                    {nomeSafra || 'Safra'}
                </Text>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Data de Início:</Text>
                    <Text>{dataInicio}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Data de Término:</Text>
                    <Text>{dataFim}</Text>
                </View>

                <View style={styles.inputRow}>
                    <Text style={styles.h2}>Talhões registrados</Text>
                    <BtnAddTalhao onPress={handleOpenModal} />
                </View>

                <View>
                    {/* Renderiza os talhões dinamicamente */}
                    {talhoes.map((talhao) => (
                        <CardSafra
                            key={talhao.id}
                            talhao={talhao.nome}
                            cultura={talhao.cultura}
                            onDelete={() => console.log(`Excluir Talhão ${talhao.id}`)}
                        />
                    ))}
                </View>

                <BottomModal visible={modalVisible} onClose={handleCloseModal}>
                    <Text>Talhão</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={talhoes.map((talhao) => ({ label: talhao.nome, value: talhao.id }))}
                        labelField="label"
                        valueField="value"
                        placeholder="Selecione um talhão"
                        value={selectedItems.talhao}
                        onChange={(item) => handleSelect(item.value, 'talhao')}
                    />
                    <Text>Culturas</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={culturas.map((cultura) => ({ label: cultura.nome, value: cultura.id }))}
                        labelField="label"
                        valueField="value"
                        placeholder="Selecione uma cultura"
                        value={selectedItems.cultura}
                        onChange={(item) => handleSelect(item.value, 'cultura')}
                    />
                    <Btn label="CADASTRAR" width={'100%'} onPress={() => Alert.alert('Talhão cadastrado!')} />
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
    dropdown: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#999',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#333',
    },
});

export default NovaSafra;
