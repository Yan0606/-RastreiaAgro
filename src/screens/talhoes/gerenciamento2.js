import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoTalhoes.png';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';
import ScrollVieww from '../../components/scrollView';

const Gerenciamento2 = ({ navigation }) => {
    const EditarTalhao = (id) => {
        navigation.navigate('EditarTalhao', { id });
    };

    const ExcluirTalhao = (id) => {
        navigation.navigate('ExcluirTalhao', { id });
    };

    const talhoes = [
        { id: 1, nome: 'Talhão 1' },
        { id: 2, nome: 'Talhão 2' },
        { id: 3, nome: 'Talhão 3' },
        { id: 4, nome: 'Talhão 4' },
    ];

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="Menu" />

                <Image source={logo} style={styles.image} />

                <Text variant="titleLarge" style={styles.title}>
                    Gerenciamento de Talhões
                </Text>

                <ScrollVieww
                    talhoes={talhoes}
                    onEdit={EditarTalhao}
                    onDelete={ExcluirTalhao}
                />

                <PersonagemComBalao texto="Selecione se deseja editar ou excluir seus talhões" />
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

export default Gerenciamento2;
