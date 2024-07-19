import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoInsumos.png';
import TextInputComponent from '../../components/input';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';

const GerenciamentoInsumos = ({ navigation }) => {

    const handleGerenciamentoInsumos2 = () => {
        navigation.navigate('GerenciamentoInsumos2');
    };
    const handleNovoInsumo = () => {
        navigation.navigate('NovoInsumo')
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="Menu" />

                <Image source={logo} style={styles.image} />

                <Text variant="titleSmall" style={styles.h2}>
                    Gerenciamento de Insumos
                </Text>
                <Text variant="titleSmall" style={styles.h2}>
                    Cadastrar um novo
                </Text>

                <TextInputComponent />
                <Btn label="PRÓXIMO" onPress={handleNovoInsumo} />

                <Text variant="titleSmall" style={styles.second}>
                    Ou gerenciar existentes
                </Text>
                <Btn label="GERENCIAR EXISTENTES" onPress={handleGerenciamentoInsumos2} />

                <PersonagemComBalao texto="Selecione se deseja cadastrar ou editar seus insumos" />
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
    second:{
        marginTop: 45,
        marginBottom: 3,
    }
});

export default GerenciamentoInsumos;
