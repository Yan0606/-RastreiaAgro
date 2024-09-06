import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoSafra.png';
import TextInputComponent from '../../components/input';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';
import InputData from '../../components/inputData';

const EditarSafra = ({ navigation }) => {
    
    const handleGerenciamentoSafra2 = () => {
        navigation.navigate('GerenciamentoSafra2');
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="GerenciamentoSafra2" />

                <Image source={logo} style={styles.image} />


                <Text variant="titleMedium" style={styles.h2}>
                    Editar Safra
                </Text>

                <TextInputComponent text="Nome " defaultValue="Safra 1" />

                <View style={styles.container2}>
                <InputData
                        label="Data de início"
                        defaultValue="2024-08-23"
                />
                <InputData
                        label="Data de Termino"
                        defaultValue="2025-08-23"
                />
                </View>


                <Btn label="Editar" onPress={handleGerenciamentoSafra2} backgroundColor="#D88B30"/>
                <PersonagemComBalao texto="Edite as informações que deseja" />
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#18603A',
        width: '100%',

    },
    h2: {
        marginTop: 20,
        marginBottom: 25,
        color: 'white',
    },
    container2: {
        justifyContent: 'flex-start',
        width: '90%',

    },
    input: {
        width: 35,
        height: 34,
        marginBottom: 15,
      },

});

export default EditarSafra;
