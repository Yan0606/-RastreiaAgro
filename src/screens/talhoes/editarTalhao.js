import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import TextInputComponent from '../../components/input';
import logo from '../../assets/images/logoTalhoes.png';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';
import Imagem from '../../components/image';

import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import { id } from 'react-native-paper-dates';

const EditarTalhao = ({ navigation, route }) => {

    const { token, usuarioId } = useContext(UserContext);

    //id do insumo que foi clicado
    const talhaoId = route.params;
    console.log(talhaoId);

    const [nome, setNome] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [area, setArea] = useState('');

    // Função para buscar dados ao carregar a tela
    useEffect(() => {
        const fetchTalhoesData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/talhoes/editar/${talhaoId.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
                    },
                });
                if (response.status === 200) {
                    const { nome, localizacao, area } = response.data;
                    setNome(nome);
                    setLocalizacao(localizacao);
                    setArea(area);
                }
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                Alert.alert('Erro', 'Não foi possível carregar os dados.');
            }
        };

        fetchTalhoesData();
    }, [talhaoId, token]);

    const handleGerenciamento2 = async () => {
        try {
            await axios.put(
                `http://localhost:3000/api/talhoes/editar/${talhaoId.id}`,
                {
                    nome,
                    localizacao,
                    area,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
                    },
                }
            );
            Alert.alert('Sucesso', 'Talhao atualizado com sucesso!');
            navigation.navigate('Gerenciamento2');
        } catch (error) {
            console.error('Erro ao atualizar Talhao:', error);
            Alert.alert('Erro', 'Não foi possível atualizar o talhao. Tente novamente.');
        }
    };


    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="Gerenciamento2" />
                <Image source={logo} style={styles.image} />

                <Text variant="titleLarge" style={styles.title}>
                    Editar Talhão
                </Text>
                <TextInputComponent
                    label="Nome"
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInputComponent
                    label="Localizacao"
                    value={localizacao}
                    onChangeText={setLocalizacao}
                />
                <TextInputComponent
                    label="Area"
                    value={area}
                    onChangeText={setArea}
                />
                <Btn label="Editar" onPress={handleGerenciamento2} backgroundColor="#D88B30" />
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
        height: '100%',
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
    readonlyContainer: {
        width: '100%',
        alignItems: 'center',
        opacity: 0.6, // Deixa os componentes visualmente "desativados"
    },
    interactiveContainer: {
        width: '100%',
        alignItems: 'center',
    },
});


export default EditarTalhao;
