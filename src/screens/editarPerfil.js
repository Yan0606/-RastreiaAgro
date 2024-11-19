import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import InputIcon from '../components/inputIcon';
import Button from '../components/button';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

const EditarPerfil = () => {
    const { token, usuarioId } = useContext(UserContext); // Acessa `usuarioId` e `token` do contexto
    const [dadosPerfil, setDadosPerfil] = useState({
        nome: '',
        telefone: '',
        email: ''
    });
    const navigation = useNavigation();

    // Função para buscar os dados do perfil
    useEffect(() => {
        const fetchPerfil = async () => {
            if (!usuarioId) {
                Alert.alert("Erro", "ID do usuário não encontrado.");
                return;
            }

            try {
                // Requisição para buscar o perfil do usuário pelo `usuarioId`
                const response = await axios.get(`http://localhost:3000/api/usuario/perfil/usuario/${usuarioId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    setDadosPerfil(response.data); // Carrega os dados do perfil no estado
                }
            } catch (error) {
                console.error('Erro ao buscar dados do perfil:', error);
                Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
            }
        };

        fetchPerfil();
    }, [usuarioId, token]);

    // Função para atualizar o perfil
    const handleEditarPerfil = async () => {
        try {
            await axios.put(
                `http://localhost:3000/api/usuario/perfil/usuario/${usuarioId}`,
                dadosPerfil,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
            navigation.navigate('Menu'); // Navega de volta para o Menu após salvar
        } catch (error) {
            console.error('Erro ao atualizar o perfil:', error);
            Alert.alert('Erro', 'Não foi possível atualizar o perfil.');
        }
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text variant="headlineLarge" style={styles.title}>EDITAR PERFIL</Text>
                <InputIcon
                    label="Nome"
                    value={dadosPerfil.nome}
                    onChangeText={(text) => setDadosPerfil({ ...dadosPerfil, nome: text })}
                />
                <InputIcon
                    label="Telefone"
                    value={dadosPerfil.telefone}
                    onChangeText={(text) => setDadosPerfil({ ...dadosPerfil, telefone: text })}
                />
                <InputIcon
                    label="Email"
                    value={dadosPerfil.email}
                    onChangeText={(text) => setDadosPerfil({ ...dadosPerfil, email: text })}
                />
                <Button label="SALVAR" onPress={handleEditarPerfil} />
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        marginBottom: 69,
    }
});

export default EditarPerfil;
