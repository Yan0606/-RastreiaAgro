import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoInsumos.png';
import TextInputComponent from '../../components/input';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';

import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import { id } from 'react-native-paper-dates';

const EditarInsumo = ({ navigation, route }) => {

    //obtendo os dados do contexto
    const { token, usuarioId } = useContext(UserContext);

    //id do insumo que foi clicado
    const insumoId = route.params;
    console.log(insumoId);

    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [descricao, setDescricao] = useState('');

    // Função para buscar dados ao carregar a tela
    useEffect(() => {
        const fetchInsumoData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/insumo/editar/${insumoId.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
                    },
                });
                if (response.status === 200) {
                    const { nome, marca, descricao } = response.data;
                    setNome(nome);
                    setMarca(marca);
                    setDescricao(descricao);
                }
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                Alert.alert('Erro', 'Não foi possível carregar os dados.');
            }
        };

        fetchInsumoData();
    }, [insumoId, token]);


    const handleGerenciamentoInsumos2 = async () => {
        try {
            await axios.put(
                `http://localhost:3000/api/insumo/editar/${insumoId.id}`,
                {
                    nome,
                    marca,
                    descricao,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
                    },
                }
            );
            Alert.alert('Sucesso', 'Insumo atualizado com sucesso!');
            navigation.navigate('GerenciamentoInsumos2');
        } catch (error) {
            console.error('Erro ao atualizar insumo:', error);
            Alert.alert('Erro', 'Não foi possível atualizar o insumo. Tente novamente.');
        }
    };


    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="GerenciamentoInsumos2" />
                <Image source={logo} style={styles.image} />

                <Text variant="titleMedium" style={styles.h2}>
                    Editar Insumos
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
                    label="Descricao"
                    value={descricao}
                    onChangeText={setDescricao}
                />
                <Btn label="Editar" onPress={handleGerenciamentoInsumos2} backgroundColor="#D88B30" />

                { /*<PersonagemComBalao texto="Insira as informações sobre o insumo " /> - Adryan olha isso seu porra*/}
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
        color:'#fff',
    },
});

export default EditarInsumo;
