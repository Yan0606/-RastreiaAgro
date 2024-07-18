import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import TextInputComponent from '../../components/input';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';
import Imagem from '../../components/image';

const ExcluirTalhao = ({ navigation }) => {
    const handleGerenciamento2 = () => {
        navigation.navigate('Gerenciamento2');
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="Gerenciamento2" />
                <Text variant="titleSmall" style={styles.h2}>
                    Gerenciamento de Talhões
                </Text>
                <TextInputComponent text="Nome do Talhão" defaultValue="Talhão 1" />
                <TextInputComponent text="Rua" defaultValue="Rua terezinha 75 - Vila Paulo Roberto" />
                <TextInputComponent text="Área" defaultValue="25m" />
                <Imagem/>
                <Btn label="Excluir" onPress={handleGerenciamento2} backgroundColor="#BB2929"/>
                <PersonagemComBalao texto="Confirme se as informações estão corretas" />
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
        marginBottom: 20,
    },
});

export default ExcluirTalhao;
