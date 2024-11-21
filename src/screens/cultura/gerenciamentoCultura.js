import React, { useState } from 'react'; // Import useState
import { View, Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoCultura.png';
import TextInputComponent from '../../components/input';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';

const GerenciamentoCultura = ({ navigation }) => {
    const [nomeRecebido, setNomeRecebido] = useState(''); // Estado para o nome

    const handleGerenciamentoCultura2 = () => {
        navigation.navigate('GerenciamentoCultura2');
    };
    const NovaCultura = () => {
        navigation.navigate('NovaCultura', { nomeRecebido });
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="Menu" />

                <Image source={logo} style={styles.image} />

                <Text variant="titleMedium" style={styles.h2}>
                    Gerenciamento de Cultura
                </Text>
                <Text variant="titleSmall" style={styles.h2}>
                    Cadastrar uma nova
                </Text>

                <TextInputComponent label="Nome" value={nomeRecebido} onChangeText={setNomeRecebido} />
                <Btn label="PRÓXIMO" onPress={NovaCultura} />

                <Text variant="titleSmall" style={styles.second}>
                    Ou gerenciar existentes
                </Text>
                <Btn label="GERENCIAR EXISTENTES" onPress={handleGerenciamentoCultura2} />


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
    second: {
        marginTop: 45,
        marginBottom: 3,
    }
});

export default GerenciamentoCultura;
