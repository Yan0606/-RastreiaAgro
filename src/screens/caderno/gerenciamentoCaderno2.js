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

const GerenciamentoCaderno2 = ({ navigation, route }) => {
    const isFocused = useIsFocused(); // Hook para detectar quando a tela está em foco

    // Obtendo os dados do contexto
    const { token, usuarioId } = useContext(UserContext);
    const [dadosSafraTalhaoSelect, setDadosSafraTalhaoSelect] = useState([]);
    const [safra, setSafra] = useState(null);  // Estado para armazenar as informações da safra

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
                setDadosSafraTalhaoSelect(response.data);
                
                // Aqui assumimos que a primeira safra da resposta é a que queremos exibir
                if (response.data.length > 0) {
                    setSafra(response.data[0].safra);  // Armazenando os dados da safra
                }
            }
        } catch (error) {
            console.error('Erro ao buscar dados da safra talhao:', error);
            Alert.alert('Erro', 'Não foi possível carregar os dados da safra.');
        }
    };

    useEffect(() => {
        if (isFocused) {
            fetchCultura();
        }
    }, [isFocused]);

    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <Text>Talhão: {item.talhao.nome}</Text>
                <Text>Cultura: {item.cultura.nome}</Text>
                <Text>Status: {item.status}</Text>
                <Btn label="ABRIR" onPress={() => navigation.navigate('RegistroPraticas', { safraTalhaoId: item.id })} />
            </Card.Content>
        </Card>
    );

    return (
        <View style={styles.container}>
            <BtnVoltar route="GerenciamentoCaderno" />
            <Image source={logo} style={styles.image} />
            <Text style={styles.title}>Detalhes da safra</Text>

            {/* Exibindo a DataSafra apenas se safra estiver disponível */}
            {safra && (
                <DataSafra 
                    titulo={safra.nome} 
                    inicio={safra.dataInicio ? safra.dataInicio.split('T')[0] : 'Data não definida'} 
                    fim={safra.dataFim ? safra.dataFim.split('T')[0] : 'Data não definida'} 
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
        backgroundColor: '#18603A',
    },
    image: {
        marginTop: 10,
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    title: {
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

export default GerenciamentoCaderno2;
