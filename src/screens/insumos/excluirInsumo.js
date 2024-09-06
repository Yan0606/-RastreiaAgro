import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoInsumos.png';
import TextInputComponent from '../../components/input';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';

const ExcluirInsumo = ({ navigation }) => {
    const [isReadonly, setIsReadonly] = useState(true); // Estado para controlar o modo readonly

    const handleGerenciamentoInsumos2 = () => {
        navigation.navigate('GerenciamentoInsumos2');
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                {/* Botão de Voltar fora do pointerEvents */}
                <View style={styles.interactiveContainer}>
                    <BtnVoltar route="GerenciamentoInsumos2" />
                </View>

                <Image source={logo} style={styles.image} />

                <Text variant="titleMedium" style={styles.h2}>
                    Excluir Insumos
                </Text>

                {/* View com pointerEvents="none" para tornar os inputs readonly */}
                <View style={isReadonly ? styles.readonlyContainer : null} pointerEvents={isReadonly ? 'none' : 'auto'}>
                    <TextInputComponent text="Adubo orgânico" style={styles.input} />
                    <TextInputComponent text="Vaca Muu" style={styles.input} />
                    <TextInputComponent text="Cocô natural de vaca" style={styles.input} />
                    <TextInputComponent text="Foto" style={styles.input} />

                </View>

                {/* Botão de Excluir fora do pointerEvents */}
                <View style={styles.interactiveContainer}>
                    <Btn label="EXCLUIR" onPress={handleGerenciamentoInsumos2} backgroundColor="red" />
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

export default ExcluirInsumo;
