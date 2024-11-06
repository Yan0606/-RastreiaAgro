import React, { useState, useContext } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { PaperProvider, Text } from "react-native-paper";
import logo from "../assets/images/icon.png";
import TextInputComponent from "../components/input";
import Btn from '../components/button';

import { UserContext } from '../contexts/UserContext';
import axios from 'axios';


const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { setUser, setToken } = useContext(UserContext); // Adiciona o setToken

    const handleMenu = async () => {

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { email, senha });
            const userName = response.data.nome;
            const userToken = response.data.token; // Obtém o token da resposta
            setUser(userName);  // Armazena o nome do usuário - faça uma chamada a API para buscar o nome do usuário
            setToken(userToken); // Armazena o token no contexto
            navigation.navigate('Menu');
        } catch (error) {
            console.error(error);
        }
    };

    const handleFirstScreen = () => {
        navigation.navigate('FirstScreen');
    }

    return (
        <PaperProvider>
            <View style={styles.container}>

                <Image source={logo} style={styles.image} />

                <Text variant="titleMedium" style={styles.h2}>
                    Bem-Vindo ao Rastreia Agro
                </Text>

                <TextInputComponent
                    label="Digite seu Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInputComponent
                    label="Digite sua Senha"
                    value={senha}
                    onChangeText={text => setSenha(text)}
                />
                <Btn text="ENTRAR" onPress={handleMenu} />
                <Text style={styles.label} onPress={handleFirstScreen}>Entre ou Cadastre-se</Text>

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
        color: '#fff',
    },
    label: {
        marginTop: 17,
        color: '#fff',
    }
});

export default Login;