import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoTalhoes.png';
import InputIcon from '../../components/inputIcon';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';

const NovoTalhao = ({ navigation }) => {
    const Gerenciamento = () => {
        navigation.navigate('Gerenciamento');
    };

    const ConfirmaNovoTalhao = () => {
        navigation.navigate('ConfirmaNovoTalhao');
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route={Gerenciamento} />

                <Image source={logo} style={styles.image} />

                <Text variant="titleMedium" style={styles.h2}>
                    Gerenciamento de Talhões
                </Text>
                <Text variant="titleSmall" style={styles.h2}>
                    Cadastrar um novo
                </Text>

                <InputIcon label="Local:" icon="map-marker-outline" />
                <InputIcon label="Área:" icon="ruler" />
                <InputIcon label="Foto:" icon="camera" />

                <Btn label="PRÓXIMO" onPress={ConfirmaNovoTalhao}  />

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

export default NovoTalhao;
