import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoRelatorios.png';
import BtnVoltar from '../../components/btnVoltar';
import Btn from '../../components/button';
import PersonagemComBalao from '../../components/PersonagemComBalao';
import ScrollVieww from '../../components/scrollView';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import CardCaderno from '../../components/cardCaderno';


//importacoes necessarias para consumir api
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import { id } from 'react-native-paper-dates';

const relatorioSafra = ({ navigation }) => {

    const isFocused = useIsFocused(); // Hook para detectar quando a tela está em foco


    //obtendo os dados do contexto
    const { token, usuarioId } = useContext(UserContext);

    // Função para formatar a data no formato BR
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const [dadosSafraTalhao, setDadosSafraTalhao] = useState([]);


    const fetchCultura = async () => {
        if (!usuarioId) {
            Alert.alert("Erro", "ID do usuário não encontrado.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/safra/usuario/${usuarioId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setDadosSafraTalhao(response.data);
            }
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            Alert.alert('Erro', 'Não foi possível carregar os dados.');
        }
    };

    useEffect(() => {
        fetchCultura();
    }, []);
    
    const safraSelecionada = (id) => {
        navigation.navigate('RelatorioSafra2', { id });
    };


    const handleRelatorioGeral = (id) => {
        navigation.navigate('Relatorio', { id });
    };

    const handleRelatorioSafra = (id) => {
        navigation.navigate('RelatorioSafra', { id });
    };

    const [dadosTalhoes, setDadosTalhoes] = useState([]);


    const fetchTalhoes = async () => {
        if (!usuarioId) {
            Alert.alert("Erro", "ID do usuário não encontrado.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/talhoes/editar/usuario/${usuarioId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setDadosTalhoes(response.data);
                console.log(response.data);
            }
        } catch (error) {
            console.error('Erro ao buscar dados dos insumos:', error);
            Alert.alert('Erro', 'Não foi possível carregar os insumos cadastrados.');
        }
    };

    useEffect(() => {
        if (isFocused) {
            fetchTalhoes();
        }
    }, [isFocused]);


    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="Menu" />

                <Image source={logo} style={styles.image} />

                <Text variant="titleLarge" style={styles.title}>
                    Relatorios
                </Text>
                <Text variant="titleMedium" style={styles.h2}>
                    Atividades relacionadas
                </Text>

                <View style={styles.botoes}>
                    <Btn label="Atividades" width="60%" onPress={handleRelatorioGeral} />
                    <Btn label="Safras" width="60%" onPress={handleRelatorioSafra} />
                </View>
                <Text style={styles.subtitle}>Selecione a safra</Text>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {dadosSafraTalhao.map((item) => (
                        <CardCaderno
                            key={item.safra.id}
                            data={{
                                titulo: item.safra.nome,
                                inicio: formatDate(item.safra.dataInicio), // Formata a data de início
                                fim: formatDate(item.safra.dataFim), // Formata a data de término
                            }}
                            onClick={() => safraSelecionada(item.safra.id)}
                        />
                    ))}
                </ScrollView>



            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
    title: {
        marginTop: 20,
        marginBottom: 20,
        color: 'white',
    },
    h2: {
        marginBottom: 10,
        color: 'white',

    },
    botoes: {
        width: '350',
        flexDirection: 'row', // Organiza os itens em linha (lado a lado)
        justifyContent: 'center', // Espaça os botões igualmente
        alignItems: 'center', // Centraliza os botões verticalmente
        marginVertical: 10, // Espaçamento entre a `View` e outros componentes
    },
});

export default relatorioSafra;
