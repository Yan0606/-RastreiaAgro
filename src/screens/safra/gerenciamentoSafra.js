import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoSafra.png';
import { useNavigation } from '@react-navigation/native';
import TextInputComponent from '../../components/input';
import InputData from '../../components/inputData';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';

    const GerenciamentoSafra = () => {
        const navigation = useNavigation();
        const [modalVisible, setModalVisible] = useState(true); // Modal inicialmente visível
      

    const [selectedDate, setSelectedDate] = useState('');

    const handleGerenciamentoSafra2 = () => {
        navigation.navigate('GerenciamentoSafra2');
    };
    const handleNovaSafra = () => {
        navigation.navigate('NovaSafra');
    };
    const closeModal = () => {
        setModalVisible(false);
      };
    
      useEffect(() => {
        // Mostrar o modal ao carregar a tela
        setModalVisible(true);
      }, []);


    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="Menu" />

                <Image source={logo} style={styles.image} />

                <Text variant="titleMedium" style={styles.h2}>
                    Gerenciamento de Safras
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

                <TextInputComponent />

                <Btn label="PRÓXIMO" onPress={handleNovaSafra} />

                <Text variant="titleSmall" style={styles.h2}>
                    Ou gerenciar existentes
                </Text>
                <Btn label="SELECIONAR" onPress={handleGerenciamentoSafra2} />

                <PersonagemComBalao texto="Selecione se deseja cadastrar ou editar suas safras" 
                visible={modalVisible} 
                onClose={closeModal} />
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
    h2: {
        color: "#fff",
        marginTop: 20,
        marginBottom: 5,
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 15,
    },
    input: {
        flex: 1,
        marginHorizontal: 5,
    },
});

export default GerenciamentoSafra;
