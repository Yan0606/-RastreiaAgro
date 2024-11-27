import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import logo from '../../assets/images/logoCaderno.png';

import { Text } from 'react-native-paper';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import BtnVoltar from '../../components/btnVoltar';
import CardCaderno from '../../components/cardCaderno';

export default function GerenciamentoCaderno({ navigation }) {
    const { token, usuarioId } = useContext(UserContext);
    const [dadosSafraTalhao, setDadosSafraTalhao] = useState([]);

    const fetchCultura = async () => {
        if (!usuarioId) {
            Alert.alert("Erro", "ID do usuário não encontrado.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/safraTalhao/editar/safra/${usuarioId}`, {
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
        navigation.navigate('GerenciamentoCaderno2', { id });
    };

    return (
        <View style={styles.container}>
            <BtnVoltar route="Menu" />
            <Image source={logo} style={styles.image} />

            <Text style={styles.title}>Caderno de Campo</Text>
            <Text style={styles.subtitle}>Selecione a safra</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {dadosSafraTalhao.map((item) => (
                    <CardCaderno
                        key={item.id}
                        data={{
                            //titulo: item.nome || `Safra ${item.id}`,
                            titulo: item.nome,
                            inicio: item.dataInicio,
                            fim: item.dataFim,
                        }}
                        onClick={() => safraSelecionada(item.id)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#18603A',
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 16,
        color: '#fff',
    },
});
