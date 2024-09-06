import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoSafra.png';
import InputData from '../../components/inputData';
import BtnVoltar from '../../components/btnVoltar';
import CardSafra from '../../components/cardSafra';
import BtnAddTalhao from '../../components/btnAddTalhao';
import BottomModal from '../../components/bottomModal';
import Btn from '../../components/button';

const NovaSafra = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItems, setSelectedItems] = useState({
        talhao: null,
        cultura: null,
        tipoIrriga: null,
    });

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
                    Safra 1
                </Text>

                <View style={styles.inputRow}>
                    <InputData
                        label="Data de início"
                        defaultValue=""
                    />
                    <InputData
                        label="Data de término"
                        defaultValue=""
                    />
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
                        onDelete={() => console.log('Excluir Talhão 2')}
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

                    <Btn label="CADASTRAR" width={'100%'} onPress={() => console.log('Cadastrar')} />
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
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 15,
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
