import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import InputIcon from '../components/inputIcon';
import Button from '../components/button';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

const EditarPropriedade = () => {
    const { token, usuarioId } = useContext(UserContext); // Certifique-se de que `usuarioId` está disponível no contexto
    const [dadosPropriedade, setDadosPropriedade] = useState({
        cnpj: '',
        area: '',
        estado: '',
        cidade: '',
        endereco: '',
    });
    const navigation = useNavigation();

    useEffect(() => {
        const fetchPropriedade = async () => {
            if (!usuarioId) {
                Alert.alert("Erro", "ID do usuário não encontrado.");
                return;
            }

            try {
                // Faça a requisição para buscar a propriedade associada ao `usuarioId`
                const response = await axios.get(`http://localhost:3000/api/propriedade/editar/${usuarioId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    setDadosPropriedade(response.data);
                }
            } catch (error) {
                console.error('Erro ao buscar dados da propriedade:', error);
                Alert.alert('Erro', 'Não foi possível carregar os dados da propriedade.');
            }
        };

        fetchPropriedade();
    }, [usuarioId, token]);

    const handleEditarPropriedade = async () => {
        try {
            await axios.put(
                `http://localhost:3000/api/propriedade/editar/${usuarioId}`,
                dadosPropriedade,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            Alert.alert('Sucesso', 'Propriedade atualizada com sucesso!');
            navigation.navigate('Menu');
        } catch (error) {
            console.error('Erro ao atualizar a propriedade:', error);
            Alert.alert('Erro', 'Não foi possível atualizar a propriedade.');
        }
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text variant="headlineLarge" style={styles.title}>EDITAR PROPRIEDADE</Text>
                <InputIcon
                    label="CNPJ"
                    value={dadosPropriedade.cnpj}
                    onChangeText={(text) => setDadosPropriedade({ ...dadosPropriedade, cnpj: text })}
                />
                <InputIcon
                    label="Área"
                    value={dadosPropriedade.area}
                    onChangeText={(text) => setDadosPropriedade({ ...dadosPropriedade, area: text })}
                />
                <InputIcon
                    label="Estado"
                    value={dadosPropriedade.estado}
                    onChangeText={(text) => setDadosPropriedade({ ...dadosPropriedade, estado: text })}
                />
                <InputIcon
                    label="Cidade"
                    value={dadosPropriedade.cidade}
                    onChangeText={(text) => setDadosPropriedade({ ...dadosPropriedade, cidade: text })}
                />
                <InputIcon
                    label="Endereço"
                    value={dadosPropriedade.endereco}
                    onChangeText={(text) => setDadosPropriedade({ ...dadosPropriedade, endereco: text })}
                />

                <Button label="SALVAR" onPress={handleEditarPropriedade} />
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

export default EditarPropriedade;
