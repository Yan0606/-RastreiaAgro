import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoMaquina.png';
import TextInputComponent from '../../components/input';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';

const GerenciamentoMaquina = ({ navigation }) => {

    const handleGerenciamentoMaquina2 = () => {
        navigation.navigate('GerenciamentoMaquina2');
    };
    const handleNovaMaquina = () => {
        navigation.navigate('NovaMaquina')
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="Menu" />

                <Image source={logo} style={styles.image} />

                <Text variant="titleMedium" style={styles.h2}>
                    Gerenciamento de Maquinas
                </Text>
                <Text variant="titleSmall" style={styles.h2}>
                    Cadastrar uma nova
                </Text>

                <TextInputComponent />
                <Btn label="PRÓXIMO" onPress={handleNovaMaquina} />

                <Text variant="titleSmall" style={styles.h2}>
                    Ou gerenciar existentes
                </Text>
                <Btn label="PRÓXIMO" onPress={handleGerenciamentoMaquina2} />

                <PersonagemComBalao texto="Selecione se deseja cadastrar ou editar suas máquinas" />
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

export default GerenciamentoMaquina;
