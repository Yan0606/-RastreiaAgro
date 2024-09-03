import React from 'react';
import { View,Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoCultura.png';
import TextInputComponent from '../../components/input';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';

const EditarCultura = ({ navigation }) => {
    const handleGerenciamentoCultura2 = () => {
        navigation.navigate('GerenciamentoCultura2');
    };
    
    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="GerenciamentoCultura2" />
                <Image source={logo} style={styles.image} />

                <Text variant="titleMedium" style={styles.h2}>
                    Editar Cultura
                </Text>
                <TextInputComponent text="Tomate" style={styles.input}/>
                <TextInputComponent text="Tempo de produção" style={styles.input}/>

                <Btn label="Editar" onPress={handleGerenciamentoCultura2} backgroundColor="#D88B30" />
                <PersonagemComBalao texto="Edite as informações que deseja" />
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
        marginBottom: 25,
    },
});

export default EditarCultura;
