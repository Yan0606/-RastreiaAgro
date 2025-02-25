import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import BtnVoltar from '../components/btnVoltar';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import config from '../../config';

const QRCodeRoutes = () => {
    const [routeContents, setRouteContents] = useState([]);
    const { token, usuarioId } = useContext(UserContext);

    useEffect(() => {
        const fetchRouteContents = async () => {
            try {
                const responses = await Promise.all([
                    axios.get(`${config.serverIp}/api/safra`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                ]);

                const safraData = responses[0].data.map(item => ({
                    id: item.id,
                    nome: item.nome,
                    descricao: item.descricao,
                    dataInicio: item.dataInicio,
                    dataFim: item.dataFim,
                }));

                setRouteContents([
                    { name: 'Relatorio Linha Tempo', content: safraData },
                    // { name: 'Relatorio', content: responses[1].data }
                ]);
            } catch (error) {
                console.error('Erro ao buscar conteúdo das rotas:', error);
                Alert.alert('Erro', 'Não foi possível carregar o conteúdo das rotas.');
            }
        };

        fetchRouteContents();
    }, [token, usuarioId]);

    const renderContent = (content) => {
        return content.map((item, index) => (
            <View key={index} style={styles.contentColumn}>
                <View style={styles.contentRow}>
                    <Text style={styles.contentKey}>ID:</Text>
                    <Text style={styles.contentValue}>{item.id}</Text>
                </View>
                <View style={styles.contentRow}>
                    <Text style={styles.contentKey}>Nome:</Text>
                    <Text style={styles.contentValue}>{item.nome}</Text>
                </View>
                <View style={styles.contentRow}>
                    <Text style={styles.contentKey}>Descrição:</Text>
                    <Text style={styles.contentValue}>{item.descricao}</Text>
                </View>
                <View style={styles.contentRow}>
                    <Text style={styles.contentKey}>Data Início:</Text>
                    <Text style={styles.contentValue}>{new Date(item.dataInicio).toLocaleDateString()}</Text>
                </View>
                <View style={styles.contentRow}>
                    <Text style={styles.contentKey}>Data Fim:</Text>
                    <Text style={styles.contentValue}>{new Date(item.dataFim).toLocaleDateString()}</Text>
                </View>
                <View style={styles.divider} />
            </View>
        ));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <BtnVoltar route="Menu" />
            <Text style={styles.title}>QR Code Routes</Text>
            {routeContents.map((route, index) => (
                <View key={index} style={styles.contentContainer}>
                    <Text style={styles.routeName}>{route.name}</Text>
                    {renderContent(route.content)}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
    },
    title: {
        marginTop: 40,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    contentContainer: {
        width: '100%',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    routeName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    contentRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    contentKey: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    contentValue: {
        flex: 1,
        flexWrap: 'wrap',
    },
    divider: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 10,
    },
});

export default QRCodeRoutes;
