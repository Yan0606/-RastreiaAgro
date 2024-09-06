import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoMaquina.png';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';
import ScrollVieww from '../../components/scrollView';

const GerenciamentoMaquina2 = ({ navigation }) => {
    const EditarMaquina = (id) => {
        navigation.navigate('EditarMaquina', { id });
    };

    const ExcluirMaquina = (id) => {
        navigation.navigate('ExcluirMaquina', { id });
    };

    const talhoes = [
        { id: 1, nome: 'Trator             ' },
        { id: 2, nome: 'Colheitadeira' },
        { id: 3, nome: 'Pulverizador' },
        { id: 4, nome: 'Roçadeira     ' },
    ];

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="Menu" />

                <Image source={logo} style={styles.image} />

                <Text variant="titleLarge" style={styles.title}>
                    Gerenciamento de Máquinas
                </Text>

                <ScrollVieww
                    talhoes={talhoes}
                    onEdit={EditarMaquina}
                    onDelete={ExcluirMaquina}
                />

                <PersonagemComBalao texto="Selecione se deseja editar ou excluir suas máquinas" />
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
    title: {
        marginTop: 20,
        marginBottom: 20,
        color: 'white',
    },
});

export default GerenciamentoMaquina2;
