import React, { useState, useEffect, useContext } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Provider as PaperProvider, Text } from 'react-native-paper';
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
    const safraId = route?.params?.safraId || null; // Usa um valor padrão para safraId
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItems, setSelectedItems] = useState({
        talhao: null,
        cultura: null,
        tipoIrriga: null,
    });
    const [dataInicio, setDataInicio] = useState(''); // Estado para data de início
    const [dataTermino, setDataTermino] = useState(''); // Estado para data de término
    const [nomeSafra, setNomeSafra] = useState(''); // Nome da safra

    // Função para formatar a data no formato "DD/MM/YYYY"
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Função para buscar dados da safra usando o ID
    const fetchSafraData = async () => {
        if (!safraId) return; // Se safraId for nulo, não faz a requisição

        try {
            const response = await axios.get(`http://localhost:3000/api/safra/editar/${safraId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho da requisição
                },
            });
            if (response.status === 200) {
                const { nome, dataInicio, dataFim } = response.data;
                setNomeSafra(nome); // Define o nome da safra
                setDataInicio(formatDate(dataInicio)); // Define a data de início formatada
                setDataTermino(formatDate(dataFim)); // Define a data de término formatada
            }
        } catch (error) {
            console.error('Erro ao buscar dados da safra:', error);
            Alert.alert('Erro', 'Não foi possível carregar os dados da safra.');
        }
    };

    useEffect(() => {
        fetchSafraData(); // Busca os dados da safra ao carregar a tela
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

    const dropdownDataTalhao = [
        { label: 'Talhão 1', value: '1' },
        { label: 'Talhão 2', value: '2' },
        { label: 'Talhão 3', value: '3' },
    ];
    const dropdownDataCulturas = [
        { label: 'Tomate', value: '1' },
        { label: 'Batata', value: '2' },
        { label: 'Milho', value: '3' },
    ];
    const dropdownDataTipoIrriga = [
        { label: 'Aspersão', value: '1' },
        { label: 'Gotejamento', value: '2' },
        { label: 'Superficie', value: '3' },
    ];

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="GerenciamentoSafra" />

                <Image source={logo} style={styles.image} />

                <Text style={styles.h1}>
                    {nomeSafra || 'Safra'} {/* Exibe o nome da safra */}
                </Text>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Data de Início:</Text>
                    <Text style={styles.value}>{dataInicio}</Text> {/* Exibe a data de início formatada */}
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Data de Término:</Text>
                    <Text style={styles.value}>{dataTermino}</Text> {/* Exibe a data de término formatada */}
                </View>

                <View style={styles.inputRow}>
                    <Text style={styles.h2}>
                        Talhões registrados
                    </Text>
                    <BtnAddTalhao onPress={handleOpenModal} />
                </View>

                <View>
                    <CardSafra
                        talhao="2"
                        cultura="Tomate"
                        onDelete={() => console.log('Excluir Talhão 2')}
                    />
                    <CardSafra
                        talhao="1"
                        cultura="Milho"
                        onDelete={() => console.log('Excluir Talhão 1')}
                    />
                </View>

                <BottomModal visible={modalVisible} onClose={handleCloseModal}>
                    <Text>Talhão</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={dropdownDataTalhao}
                        labelField="label"
                        valueField="value"
                        placeholder="Selecione um item"
                        value={selectedItems.talhao}
                        onChange={(item) => handleSelect(item.value, 'talhao')}
                    />
                    <Text>Culturas</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={dropdownDataCulturas}
                        labelField="label"
                        valueField="value"
                        placeholder="Selecione um item"
                        value={selectedItems.cultura}
                        onChange={(item) => handleSelect(item.value, 'cultura')}
                    />
                    <Text>Tipo de irrigação</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={dropdownDataTipoIrriga}
                        labelField="label"
                        valueField="value"
                        placeholder="Selecione um item"
                        value={selectedItems.tipoIrriga}
                        onChange={(item) => handleSelect(item.value, 'tipoIrriga')}
                    />

                    <Btn label="CADASTRAR" width={'100%'} onPress={() => Alert.alert('Safra cadastrada!')} />
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
