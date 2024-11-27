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

    useEffect(() => {
        const fetchSafraData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/safra/editar/${safraId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 200) {
                    const { nome, dataInicio, dataFim } = response.data;
                    setNome(nome);
                    setDataInicio(dataInicio);
                    setDataFim(dataFim);
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
                { nome, dataInicio, dataFim },
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
                <TextInputComponent label="Data de Início" value={dataInicio} onChangeText={setDataInicio} />
                <TextInputComponent label="Data de Fim" value={dataFim} onChangeText={setDataFim} />
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
});

export default EditarSafra;
