import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoMaquina.png';
import TextInputComponent from '../../components/input';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';
import InputData from '../../components/inputData';

import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import { id } from 'react-native-paper-dates';

const ExcluirMaquina = ({ navigation, route }) => {

    const [isReadonly, setIsReadonly] = useState(true); // Estado para controlar o modo readonly

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
            await axios.delete(
                `http://localhost:3000/api/maquina/excluir/${maquinaId.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
                    },
                }
            );
            Alert.alert('Sucesso', 'Insumo excluido com sucesso!');
            navigation.navigate('GerenciamentoMaquina2');
        } catch (error) {
            console.error('Erro ao excluir insumo:', error);
            Alert.alert('Erro', 'Não foi possível excluir o insumo. Tente novamente.');
        }
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                {/* Botão de Voltar fora do pointerEvents */}
                <View style={styles.interactiveContainer}>
                    <BtnVoltar route="GerenciamentoMaquina2" />
                </View>

                <Image source={logo} style={styles.image} />

                <Text variant="titleMedium" style={styles.h2}>
                    Excluir Trator
                </Text>

                {/* View com pointerEvents="none" para tornar os inputs readonly */}
                <View style={isReadonly ? styles.readonlyContainer : null} pointerEvents={isReadonly ? 'none' : 'auto'}>
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
                </View>

                {/* Botão de Excluir fora do pointerEvents */}
                <View style={styles.interactiveContainer}>
                    <Btn label="EXCLUIR" onPress={handleGerenciamentoMaquina2} backgroundColor="red" />
                </View>

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

export default ExcluirMaquina;
