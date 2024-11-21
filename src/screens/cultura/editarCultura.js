import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoCultura.png';
import TextInputComponent from '../../components/input';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';

import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import { id } from 'react-native-paper-dates';

const EditarCultura = ({ navigation, route }) => {

    //obtendo os dados do contexto
    const { token, usuarioId } = useContext(UserContext);

    //id do insumo que foi clicado
    const culturaId = route.params;
    console.log(culturaId);

    const [nome, setNome] = useState('');
    const [tempoProducao, setTempoProducao] = useState('');

    // Função para buscar dados ao carregar a tela
    useEffect(() => {
        const fetchCulturaData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/cultura/editar/${culturaId.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
                    },
                });
                if (response.status === 200) {
                    const { nome, tempoProducao } = response.data;
                    setNome(nome);
                    setTempoProducao(tempoProducao);
                }
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                Alert.alert('Erro', 'Não foi possível carregar os dados.');
            }
        };

        fetchCulturaData();
    }, [culturaId, token]);

    const handleGerenciamentoCultura2 = async () => {
        try {
            await axios.put(
                `http://localhost:3000/api/cultura/editar/${culturaId.id}`,
                {
                    nome,
                    tempoProducao,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
                    },
                }
            );
            Alert.alert('Sucesso', 'cultura atualizada com sucesso!');
            navigation.navigate('GerenciamentoCultura2');
        } catch (error) {
            console.error('Erro ao atualizar cultura:', error);
            Alert.alert('Erro', 'Não foi possível atualizar a cultura. Tente novamente.');
        }
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="GerenciamentoCultura2" />
                <Image source={logo} style={styles.image} />

                <Text variant="titleMedium" style={styles.h2}>
                    Editar Cultura
                </Text>
                <TextInputComponent
                    label="Nome"
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInputComponent
                    label="Tempo de produção"
                    value={tempoProducao}
                    onChangeText={setTempoProducao}
                />

                <Btn label="Editar" onPress={handleGerenciamentoCultura2} backgroundColor="#D88B30" />

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
