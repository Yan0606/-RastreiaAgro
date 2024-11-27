import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoSafra.png';
import { useNavigation } from '@react-navigation/native';
import TextInputComponent from '../../components/input';
import { TextInputMask } from 'react-native-masked-text';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';

const GerenciamentoSafra = () => {
    const navigation = useNavigation();
    const { token } = useContext(UserContext); // Obtém o token do contexto de usuário
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [nomeSafra, setNomeSafra] = useState('');

    const handleGerenciamentoSafra2 = () => {
        navigation.navigate('GerenciamentoSafra2');
    };

    const formatDate = (date) => {
        if (!date) return null;
        const day = date.split('/')[0];
        const month = date.split('/')[1];
        const year = date.split('/')[2];
        return `${year}-${month}-${day}`; // Formato "YYYY-MM-DD"
    };

    const handleNovaSafra = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3000/api/safra/novo',
                {
                    nome: nomeSafra,
                    dataInicio: formatDate(dataInicio),
                    dataFim: formatDate(dataFim),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Token adicionado automaticamente
                    },
                }
            );

            if (response.status === 201) {
                Alert.alert('Sucesso', 'Safra cadastrada com sucesso!');
                navigation.navigate('NovaSafra', { safraId: response.data.id });
            }
        } catch (error) {
            console.error('Erro ao cadastrar safra:', error);
            Alert.alert('Erro', 'Não foi possível cadastrar a safra.');
        }
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="Menu" />
                <Image source={logo} style={styles.image} />
                <Text variant="titleMedium" style={styles.h2}>Gerenciamento de Safras</Text>

                <TextInputMask
                    type={'custom'}
                    options={{ mask: '99/99/9999' }}
                    value={dataInicio}
                    onChangeText={(text) => setDataInicio(text)}
                    style={styles.maskInput}
                />
                <TextInputMask
                    type={'custom'}
                    options={{ mask: '99/99/9999' }}
                    value={dataFim}
                    onChangeText={(text) => setDataFim(text)}
                    style={styles.maskInput}
                />
                <TextInputComponent
                    label="Nome da Safra"
                    value={nomeSafra}
                    onChangeText={setNomeSafra}
                />
                <Btn label="PRÓXIMO" onPress={handleNovaSafra} />

                <Text variant="titleSmall" style={styles.second}>
                    Ou gerenciar existentes
                </Text>
                <Btn label="GERENCIAR EXISTENTES" onPress={handleGerenciamentoSafra2} />

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
    maskInput: {
        width: '90%',
        height: 34,
        marginBottom: 15,
        backgroundColor: '#fff',
        paddingVertical: 10,
    },
});

export default GerenciamentoSafra;
