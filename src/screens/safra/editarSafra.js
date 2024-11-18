import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoSafra.png';
import TextInputComponent from '../../components/input';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import InputData from '../../components/inputData';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';

const EditarSafra = ({ route, navigation }) => {
    const { token } = useContext(UserContext); // Obtém o token do contexto
    const safraId = route?.params?.safraId; // Obtém o ID da safra a partir dos parâmetros da rota

    const [nome, setNome] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataTermino, setDataTermino] = useState('');

    // Função para formatar a data no formato "YYYY-MM-DD" para o valor inicial
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    // Função para buscar dados da safra ao carregar a tela
    useEffect(() => {
        const fetchSafraData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/safra/editar/${safraId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
                    },
                });
                if (response.status === 200) {
                    const { nome, dataInicio, dataFim } = response.data;
                    setNome(nome);
                    setDataInicio(formatDate(dataInicio));
                    setDataTermino(formatDate(dataFim));
                }
            } catch (error) {
                console.error('Erro ao buscar dados da safra:', error);
                Alert.alert('Erro', 'Não foi possível carregar os dados da safra.');
            }
        };

        fetchSafraData();
    }, [safraId, token]);

    // Função para atualizar a safra
    const handleEditarSafra = async () => {
        try {
            await axios.put(
                `http://localhost:3000/api/safra/editar/${safraId}`,
                {
                    nome,
                    dataInicio,
                    dataFim: dataTermino,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
                    },
                }
            );
            Alert.alert('Sucesso', 'Safra atualizada com sucesso!');
            navigation.navigate('GerenciamentoSafra2'); // Navega de volta para a lista de safras
        } catch (error) {
            console.error('Erro ao atualizar a safra:', error);
            Alert.alert('Erro', 'Não foi possível atualizar a safra. Tente novamente.');
        }
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="GerenciamentoSafra2" />

                <Image source={logo} style={styles.image} />

                <Text variant="titleMedium" style={styles.h2}>
                    Editar Safra
                </Text>

                <TextInputComponent
                    label="Nome"
                    value={nome}
                    onChangeText={setNome}
                />

                <View style={styles.container2}>
                    <InputData
                        label="Data de Início"
                        defaultValue={dataInicio}
                        editable={false} // Torna o campo não editável
                    />
                    <InputData
                        label="Data de Término"
                        defaultValue={dataTermino}
                        editable={false} // Torna o campo não editável
                    />
                </View>

                <Btn label="Editar" onPress={handleEditarSafra} backgroundColor="#D88B30" />
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
