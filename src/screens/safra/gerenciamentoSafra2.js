import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoSafra.png';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';
import ScrollVieww from '../../components/scrollView';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';

const GerenciamentoSafra2 = () => {
    const navigation = useNavigation();
    const { token } = useContext(UserContext); // Obtém o token do contexto
    const [modalVisible, setModalVisible] = useState(true);
    const [safras, setSafras] = useState([]); // Estado para armazenar as safras do banco
    const isFocused = useIsFocused(); // Hook para detectar quando a tela está em foco

    // Função para buscar todas as safras
    const fetchSafras = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/safra', {
                headers: {
                    Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho da requisição
                },
            });
            if (response.status === 200) {
                setSafras(response.data); // Atualiza o estado com as safras retornadas
            }
        } catch (error) {
            console.error('Erro ao buscar as safras:', error);
            Alert.alert('Erro', 'Não foi possível carregar as safras.');
        }
    };

    // Atualiza a lista de safras sempre que a tela for focada
    useEffect(() => {
        if (isFocused) {
            fetchSafras();
        }
    }, [isFocused]);

    const handleEditarSafra = (id) => {
        navigation.navigate('EditarSafra', { safraId: id });
    };

    const handleExcluirSafra = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/safra/excluir/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSafras(safras.filter(safra => safra.id !== id)); // Atualiza o estado para remover a safra excluída
            Alert.alert('Sucesso', 'Safra excluída com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir safra:', error);
            Alert.alert('Erro', 'Não foi possível excluir a safra.');
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="GerenciamentoSafra" />

                <Image source={logo} style={styles.image} />

                <Text variant="titleMedium" style={styles.h2}>
                    Gerenciamento de Safras
                </Text>

                <ScrollVieww
                    talhoes={safras}
                    onEdit={handleEditarSafra}
                    onDelete={handleExcluirSafra}
                />

                <PersonagemComBalao 
                    texto="Selecione se deseja editar ou excluir suas safras" 
                    visible={modalVisible} 
                    onClose={closeModal} 
                />
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
    h2: {
        marginTop: 20,
        marginBottom: 5,
        color: "white",
    },
});

export default GerenciamentoSafra2;
