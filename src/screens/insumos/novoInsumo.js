import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoInsumos.png';
import InputIcon from '../../components/inputIcon';
import TextInputComponent from '../../components/input';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';

const NovoInsumo = ({ navigation }) => {
    const GerenciamentoInsumos = () => {
        navigation.navigate('GerenciamentoInsumos');
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route={GerenciamentoInsumos} />

                <Image source={logo} style={styles.image} />

                <Text variant="titleMedium" style={styles.h2}>
                    Gerenciamento de Insumos
                </Text>

                <TextInputComponent text="Marca:" style={styles.input}/>
                <TextInputComponent text="Descrição:" style={styles.input}/>
                <InputIcon label="Foto:" icon="camera" />

                <Btn label="CADASTRAR"   />

                <PersonagemComBalao texto="Insira as informações sobre o insumo " />
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
    input:{

    },
    h2: {
        marginTop: 20,
        marginBottom: 5,
    },
});

export default NovoInsumo;
