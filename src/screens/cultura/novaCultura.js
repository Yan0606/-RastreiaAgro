import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoCultura.png';
import TextInputComponent from '../../components/input';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';

const NovaCultura = ({ navigation }) => {
    const GerenciamentoCultura = () => {
        navigation.navigate('GerenciamentoCultura');
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route={GerenciamentoCultura} />

                <Image source={logo} style={styles.image} />

                <Text variant="titleMedium" style={styles.h2}>
                    Gerenciamento de Cultura
                </Text>

                <TextInputComponent text="Tempo de produção:" />
                
                <Btn label="CADASTRAR"   />

                <PersonagemComBalao texto="Informe o tempo aproximado para produção dessa cultura " />
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

export default NovaCultura;
