import React from 'react';
import { View,Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoMaquina.png';

import TextInputComponent from '../../components/input';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';

const EditarInsumo = ({ navigation }) => {
    const handleGerenciamentoMaquina2 = () => {
        navigation.navigate('GerenciamentoMaquina2');
    };
    
    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="GerenciamentoMaquina2" />
                <Image source={logo} style={styles.image} />

                <Text variant="titleMedium" style={styles.h2}>
                    Editar Trator
                </Text>
                <TextInputComponent text="Marca " defaultValue="JHON DEERE" />
                <TextInputComponent text="Modelo" defaultValue="6135M" />
                <TextInputComponent text="Placa" defaultValue="AAA-123" />
                <Btn label="Editar" onPress={handleGerenciamentoMaquina2} backgroundColor="#D88B30" />
                <PersonagemComBalao texto="Edite as informações que deseja" />
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
    h2: {
        marginTop: 20,
        marginBottom: 25,
    },
});

export default EditarInsumo;
