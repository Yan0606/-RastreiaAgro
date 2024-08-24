import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoSafra.png';
import TextInputComponent from '../../components/input';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';
import InputData from '../../components/inputData';

const ExcluirSafra = ({ navigation }) => {

    const [isReadonly, setIsReadonly] = useState(true); // Estado para controlar o modo readonly

    const handleGerenciamentoSafra2 = () => {
        navigation.navigate('GerenciamentoSafra2');
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                {/* Botão de Voltar fora do pointerEvents */}
                <View style={styles.interactiveContainer}>
                    <BtnVoltar route="GerenciamentoSafra2" />
                </View>

                <Image source={logo} style={styles.image} />

                <Text variant="titleMedium" style={styles.h2}>
                    Excluir Safra
                </Text>

                {/* View com pointerEvents="none" para tornar os inputs readonly */}
                <View style={isReadonly ? styles.readonlyContainer : null} pointerEvents={isReadonly ? 'none' : 'auto'}>
                    <TextInputComponent text="Nome " defaultValue="Safra 1" />

                    <View style={styles.container2}>
                        <InputData
                            label="Data de início"
                            defaultValue="2024-08-23"
                        />
                        <InputData
                            label="Data de Término"
                            defaultValue="2025-08-23"
                        />
                    </View>
                </View>

                {/* Botão de Excluir fora do pointerEvents */}
                <View style={styles.interactiveContainer}>
                    <Btn label="EXCLUIR" onPress={handleGerenciamentoSafra2} backgroundColor="red" />
                </View>

                <PersonagemComBalao texto="Tem certeza que deseja excluir essa safra?" />
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#18603A',
        width: '100%',
    },
    h2: {
        marginTop: 20,
        marginBottom: 25,
        color: 'white',
    },
    container2: {
        justifyContent: 'flex-start',
        width: '90%',
    },
    readonlyContainer: {
        width: '100%',
        alignItems: 'center',
        opacity: 0.6, // Deixa os componentes visualmente "desativados"
    },
    interactiveContainer: {
        width: '100%',
        alignItems: 'center',
    },
});

export default ExcluirSafra;
