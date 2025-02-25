import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, SectionList, Alert } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoRelatorios.png';
import BtnVoltar from '../../components/btnVoltar';
import Btn from '../../components/button';
import PersonagemComBalao from '../../components/PersonagemComBalao';
import ScrollVieww from '../../components/scrollView';
import { useNavigation, useIsFocused } from '@react-navigation/native';

// Importações necessárias para consumir API
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';

const Relatorio = ({ navigation }) => {

    const isFocused = useIsFocused(); // Hook para detectar quando a tela está em foco

    // Obtendo os dados do contexto
    const { token, usuarioId } = useContext(UserContext);

    const handleRelatorioGeral = (id) => {
        navigation.navigate('Relatorio', { id });
    };

    const handleRelatorioSafra = (id) => {
        navigation.navigate('RelatorioSafra', { id });
    };

    const [dadosAtividades, setDadosAtividades] = useState([]);

    const fetchAtividades = async () => {
        if (!usuarioId) {
            Alert.alert("Erro", "ID do usuário não encontrado.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/caderno/editar/${usuarioId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setDadosAtividades(response.data);
                console.log(response.data);
            }
        } catch (error) {
            console.error('Erro ao buscar dados dos insumos:', error);
            Alert.alert('Erro', 'Não foi possível carregar os insumos cadastrados.');
        }
    };

    useEffect(() => {
        if (isFocused) {
            fetchAtividades();
        }
    }, [isFocused]);

    // Transformando os dados para o formato necessário pelo SectionList
    const sections = Object.keys(dadosAtividades).map(date => ({
        title: date,
        data: dadosAtividades[date].reverse() // Revertendo a ordem dos dados
    })).reverse(); // Reverte as seções também, para mostrar a data mais recente primeiro

    // Função para formatar a data no formato BR
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
    
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
    
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const formatHora = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
    
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
    
        return `${hours}:${minutes}`;
    };

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

                <SectionList
                    sections={sections}
                    keyExtractor={(item) => item.id.toString()} // Garantindo que cada item tem uma chave única
                    renderItem={({ item }) => (
                        <View style={styles.activityCard}>
                            <Text style={styles.time}>{formatHora(item.createdAt)}</Text>
                            <Text style={styles.activity}>{item.descricao}</Text>
                            <Text style={styles.details}>{item.safraTalhao.talhaoId} - {item.safraTalhao.culturaId}</Text>
                        </View>
                    )}
                    renderSectionHeader={({ section }) => (
                        <View style={styles.header}>
                            <Text style={styles.headerText}>{section.title}</Text>
                        </View>
                    )}
                />

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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginBottom: 30,
    },
    header: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DDD',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#333',
    },
    activityCard: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DDD',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    time: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    activity: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 5,
        color: '#333',
    },
    details: {
        fontSize: 14,
        marginTop: 5,
        color: '#777',
    },
});

export default Relatorio;
