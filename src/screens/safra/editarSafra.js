import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoSafra.png';
import TextInputComponent from '../../components/input';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';

const EditarSafra = ({ route, navigation }) => {
    const { token } = useContext(UserContext);
    const safraId = route?.params?.safraId;

    const [nome, setNome] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');

    // Função para formatar data no formato BR
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Função para converter data do formato BR para API (YYYY-MM-DD)
    const unformatDate = (dateString) => {
        if (!dateString) return '';
        const [day, month, year] = dateString.split('/');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const fetchSafraData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/safra/editar/${safraId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 200) {
                    const { nome, dataInicio, dataFim } = response.data;
                    setNome(nome);
                    setDataInicio(formatDate(dataInicio)); // Formata data para exibição
                    setDataFim(formatDate(dataFim)); // Formata data para exibição
                }
            } catch (error) {
                console.error('Erro ao buscar dados da safra:', error);
                Alert.alert('Erro', 'Não foi possível carregar os dados da safra.');
            }
        };

        fetchSafraData();
    }, [safraId, token]);

    const handleEditarSafra = async () => {
        try {
            await axios.put(
                `http://localhost:3000/api/safra/editar/${safraId}`,
                {
                    nome,
                    dataInicio: unformatDate(dataInicio), // Converte data para formato aceito pela API
                    dataFim: unformatDate(dataFim), // Converte data para formato aceito pela API
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            Alert.alert('Sucesso', 'Safra atualizada com sucesso!');
            navigation.navigate('GerenciamentoSafra2');
        } catch (error) {
            console.error('Erro ao atualizar a safra:', error);
            Alert.alert('Erro', 'Não foi possível atualizar a safra.');
        }
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="GerenciamentoSafra2" />
                <Image source={logo} style={styles.image} />
                <Text variant="titleMedium" style={styles.h2}>Editar Safra</Text>
                <TextInputComponent label="Nome" value={nome} onChangeText={setNome} />
                <TextInputComponent
                    label="Data de Início"
                    value={dataInicio}
                    onChangeText={setDataInicio}
                    placeholder="DD/MM/AAAA"
                />
                <TextInputComponent
                    label="Data de Fim"
                    value={dataFim}
                    onChangeText={setDataFim}
                    placeholder="DD/MM/AAAA"
                />
                <Btn label="Salvar" onPress={handleEditarSafra} backgroundColor="#D88B30" />
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
        color: 'white',
    },
    image: {
        marginTop: 10,
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
});

export default EditarSafra;
