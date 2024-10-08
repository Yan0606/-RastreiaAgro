import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoInsumos.png';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';
import ScrollVieww from '../../components/scrollView';

const GerenciamentoInsumos2 = ({ navigation }) => {
    const EditarInsumo = (id) => {
        navigation.navigate('EditarInsumo', { id });
    };

    const ExcluirInsumo = (id) => {
        navigation.navigate('ExcluirInsumo', { id });
    };

    const insumos = [
        { id: 1, nome: 'Adubo orgânico' },
        { id: 2, nome: 'Fertilizante' },
        { id: 3, nome: 'Fungicidas' },
    ];

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="Menu" />

                <Image source={logo} style={styles.image} />

                <Text variant="titleLarge" style={styles.title}>
                    Gerenciamento de Insumos
                </Text>

                <ScrollVieww
                    talhoes={insumos}
                    onEdit={EditarInsumo}
                    onDelete={ExcluirInsumo}
                />

                <PersonagemComBalao texto="Selecione se deseja editar ou excluir seus insumos" />
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

export default GerenciamentoInsumos2;
