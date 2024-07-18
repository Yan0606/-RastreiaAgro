import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoMaquina.png';
import TextInputComponent from '../../components/input';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';

const NovaMaquina = ({ navigation }) => {
    
    const GerenciamentoMaquina = () => {
        navigation.navigate('GerenciamentoMaquina');
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route={GerenciamentoMaquina} />

                <Image source={logo} style={styles.image} /> 

                <Text variant="titleMedium" style={styles.h2}>
                    Gerenciamento de Máquinas
                </Text>

                <TextInputComponent text="Marca:" />
                <TextInputComponent text="Modelo:" />
                <TextInputComponent text="Placa:" />

                <Btn label="CADASTRAR" onPress={GerenciamentoMaquina} />

                <PersonagemComBalao texto="Informe os detalhes do Talhão a ser cadastrado" />
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
        marginTop: 20,
        marginBottom: 5,
    },
});

export default NovaMaquina;
