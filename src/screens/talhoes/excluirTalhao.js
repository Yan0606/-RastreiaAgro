import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import TextInputComponent from '../../components/input';
import logo from '../../assets/images/logoInsumos.png';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';
import Imagem from '../../components/image';

import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import { id } from 'react-native-paper-dates';

const ExcluirTalhao = ({ navigation, route }) => {

    const [isReadonly, setIsReadonly] = useState(true); // Estado para controlar o modo readonly

    //obtendo os dados do contexto
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
            await axios.delete(
                `http://localhost:3000/api/talhoes/excluir/${talhaoId.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
                    },
                }
            );
            Alert.alert('Sucesso', 'Talhao excluido com sucesso!');
            navigation.navigate('Gerenciamento2');
        } catch (error) {
            console.error('Erro ao excluir talhao:', error);
            Alert.alert('Erro', 'Não foi possível excluir o talhao. Tente novamente.');
        }
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <View style={styles.interactiveContainer}>
                    <BtnVoltar route="Gerenciamento2" />
                </View>

                <Image source={logo} style={styles.image} />

                <Text variant="titleMedium" style={styles.h2}>
                    Excluir Talhões
                </Text>

                <View style={isReadonly ? styles.readonlyContainer : null} pointerEvents={isReadonly ? 'none' : 'auto'}>

                    <TextInputComponent
                        label="Nome"
                        value={nome}
                        onChangeText={setNome}
                    />
                    <TextInputComponent
                        label="Localização"
                        value={localizacao}
                        onChangeText={setLocalizacao}
                    />
                    <TextInputComponent
                        label="Area"
                        value={area}
                        onChangeText={setArea}
                    />

                </View>

                <View style={styles.interactiveContainer}>
                    <Btn label="EXCLUIR" onPress={handleGerenciamento2} backgroundColor="red" />
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


export default ExcluirTalhao;
