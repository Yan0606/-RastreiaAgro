import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, Alert, FlatList } from 'react-native';
import { Card, Text } from 'react-native-paper';
import logo from '../../assets/images/logoCaderno.png';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import DataSafra from '../../components/dataSafra';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext';

const RelatorioSafra2 = ({ navigation, route }) => {
    const isFocused = useIsFocused(); // Hook para detectar quando a tela está em foco
    const safraId = route.params;
    const { token, usuarioId } = useContext(UserContext); // Obtendo os dados do contexto
    console.log("safra selecionada:",safraId)
    const [dadosSafraTalhaoSelect, setDadosSafraTalhaoSelect] = useState([]);
    const [safra, setSafra] = useState(null);

    // Função para formatar a data no formato DD/MM/YYYY
    const formatDate = (date) => {
        if (!date) return 'Data não definida';
        const [year, month, day] = date.split('T')[0].split('-');
        return `${day}/${month}/${year}`;
    };

    const fetchSafraTalhao = async () => {
        if (!usuarioId) {
            Alert.alert("Erro", "ID do usuário não encontrado.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/safraTalhao/detalhes/fechado/${usuarioId}/${safraId.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setDadosSafraTalhaoSelect(response.data);
            }
        } catch (error) {
            console.error('Erro ao buscar dados da safra talhao:', error);
            Alert.alert('Erro', 'Não foi possível carregar os dados da safra.');
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/safra/editar/${safraId.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setSafra(response.data);
            }
        } catch (error) {
            console.error('Erro ao buscar dados da safra:', error);
            Alert.alert('Erro', 'Não foi possível carregar os dados da safra.');
        }
    };

    useEffect(() => {
        if (isFocused) {
            fetchSafraTalhao();
        }
    }, [isFocused]);

    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <Text>Talhão: {item.talhao.nome}</Text>
                <Text>Cultura: {item.cultura.nome}</Text>
                <Text>Status: {item.status}</Text>
                <Btn
                    label="ABRIR"
                    onPress={() =>
                        navigation.navigate('RelatorioLinhaTempo', {
                            talhaoId: item.talhao.id,
                            safraTalhaoId: item.id,
                            culturaId: item.cultura.id,
                            safraId,
                        })
                    }
                />
            </Card.Content>
        </Card>
    );

    return (
        <View style={styles.container}>
            <BtnVoltar route="RelatorioSafra" />
            <Image source={logo} style={styles.image} />
            <Text style={styles.title}>Detalhes da safra</Text>

            {/* Exibindo a DataSafra apenas se safra estiver disponível */}
            {safra && (
                <DataSafra
                    titulo={safra.nome}
                    inicio={formatDate(safra.dataInicio)}
                    fim={formatDate(safra.dataFim)}
                />
            )}

            <FlatList
                data={dadosSafraTalhaoSelect}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',

        paddingTop: 50,
        paddingHorizontal: '10%',
        backgroundColor: '#18603A',
    },
    image: {
        marginTop: 20,
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    title: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
    card: {
        marginVertical: 8,
        width: '100%',
        alignSelf: 'center',
    },
    listContent: {
        paddingBottom: 20,
    },
});

export default RelatorioSafra2;
