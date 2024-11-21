import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoTalhoes.png';
import InputIcon from '../../components/inputIcon';
import TextInputComponent from '../../components/input';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';

import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';

const NovoTalhao = ({ navigation, route }) => {
    //obtendo os dados do contexto
    const { token } = useContext(UserContext);    // Adiciona o setToken
    const { usuarioId } = useContext(UserContext);
    console.log("O ID DO USUARIO É:", usuarioId)

    const { nomeRecebido } = route.params;
    const [nome, setNome] = useState(nomeRecebido); // Inicializa com o valor recebido
    const [localizacao, setLocalizacao] = useState('');
    const [area, setArea] = useState('');

    useEffect(() => {
        if (!usuarioId) {
            Alert.alert('Erro', 'ID do usuário ausente. Retorne e faça o cadastro novamente.');
            navigation.goBack();
        }
    }, [usuarioId]);


    const Gerenciamento = () => {
        navigation.navigate('Gerenciamento');
    };

    const ConfirmaNovoTalhao = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/talhoes/novo', {
                nome,
                localizacao,
                area,
                usuarioId,

            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                console.log("Cadastro de talhao bem-sucedido.");
                navigation.navigate('Gerenciamento2');
            }
        } catch (error) {
            console.error('Erro ao cadastrar talhao:', error);
            Alert.alert('Erro', 'Erro ao cadastrar talhao. Tente novamente.');
        }
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

                <TextInputComponent label="Nome" value={nome} onChangeText={setNome} />
                <TextInputComponent label="Localizacao" value={localizacao} onChangeText={setLocalizacao} />
                <TextInputComponent label="Area" value={area} onChangeText={setArea} />

                <Btn label="PRÓXIMO" onPress={ConfirmaNovoTalhao} />


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
