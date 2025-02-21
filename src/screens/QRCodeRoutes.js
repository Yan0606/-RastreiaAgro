import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import BtnVoltar from '../components/btnVoltar';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

const QRCodeRoutes = () => {
    const [routeContents, setRouteContents] = useState([]);
    const { token, usuarioId } = useContext(UserContext);

    useEffect(() => {
        const fetchRouteContents = async () => {
            try {
                const responses = await Promise.all([
                    axios.get(`http://localhost:3000/api/talhoes/editar/${usuarioId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    axios.get(`http://localhost:3000/api/caderno/editar/${usuarioId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                ]);

                setRouteContents([
                    { name: 'Relatorio Linha Tempo', content: responses[0].data },
                    { name: 'Relatorio', content: responses[1].data }
                ]);
            } catch (error) {
                console.error('Erro ao buscar conteúdo das rotas:', error);
                Alert.alert('Erro', 'Não foi possível carregar o conteúdo das rotas.');
            }
        };

        fetchRouteContents();
    }, [token, usuarioId]);

    const renderContent = (content) => {
        return Object.keys(content).map((key, index) => (
            <View key={index} style={styles.contentRow}>
                <Text style={styles.contentKey}>{key}:</Text>
                <Text style={styles.contentValue}>{JSON.stringify(content[key], null, 2)}</Text>
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
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
    },
    title: {
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
});

export default QRCodeRoutes;
