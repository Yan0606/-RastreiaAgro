import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoTalhoes.png';
import TextInputComponent from '../../components/input';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';

const Gerenciamento = ({ navigation }) => {

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="Menu" />

                <Image source={logo} style={styles.image} />
                
                <Text variant="titleSmall" style={styles.h2}>
                    Gerenciamento de Talhões
                </Text>
                <Text variant="titleSmall" style={styles.h2}>
                    Cadastrar um novo
                </Text>

                <TextInputComponent />
                <Btn text="PRÓXIMO"  />

                <Text variant="titleSmall" style={styles.h2}>
                    Ou gerenciar existentes
                </Text>
                <Btn text="PRÓXIMO"  />

                <PersonagemComBalao texto="Selecione se deseja cadastrar ou editar seu talhões" />
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
        marginBottom: 20,
    },
});

export default Gerenciamento;
