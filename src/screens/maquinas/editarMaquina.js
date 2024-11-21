import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoMaquina.png';
import TextInputComponent from '../../components/input';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';

import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import { id } from 'react-native-paper-dates';

const EditarMaquina = ({ navigation, route }) => {

    //obtendo os dados do contexto
    const { token, usuarioId } = useContext(UserContext);

    //id do insumo que foi clicado
    const maquinaId = route.params;
    console.log(maquinaId);

    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [placa, setPlaca] = useState('');

    // Função para buscar dados ao carregar a tela
    useEffect(() => {
        const fetchMaquinaData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/maquina/editar/${maquinaId.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
                    },
                });
                if (response.status === 200) {
                    console.log(response.data)
                    const { marca, modelo, placa, nome } = response.data;
                    setNome(nome);
                    setMarca(marca);
                    setModelo(modelo);
                    setPlaca(placa);

                }
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                Alert.alert('Erro', 'Não foi possível carregar os dados.');
            }
        };

        fetchMaquinaData();
    }, [maquinaId, token]);


    const handleGerenciamentoMaquina2 = async () => {
        try {
            await axios.put(
                `http://localhost:3000/api/maquina/editar/${maquinaId.id}`,
                {
                    marca,
                    modelo,
                    placa,
                    nome,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
                    },
                }
            );
            Alert.alert('Sucesso', 'Maquina atualizada com sucesso!');
            navigation.navigate('GerenciamentoMaquina2');
        } catch (error) {
            console.error('Erro ao atualizar maquina:', error);
            Alert.alert('Erro', 'Não foi possível atualizar a maquina. Tente novamente.');
        }
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="GerenciamentoMaquina2" />
                <Image source={logo} style={styles.image} />

                <Text variant="titleMedium" style={styles.h2}>
                    Editar Trator
                </Text>
                <TextInputComponent
                    label="Nome"
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInputComponent
                    label="Marca"
                    value={marca}
                    onChangeText={setMarca}
                />
                <TextInputComponent
                    label="Modelo"
                    value={modelo}
                    onChangeText={setModelo}
                />
                <TextInputComponent
                    label="Placa"
                    value={placa}
                    onChangeText={setPlaca}
                />
                <Btn label="Editar" onPress={handleGerenciamentoMaquina2} backgroundColor="#D88B30" />
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

export default EditarMaquina;
