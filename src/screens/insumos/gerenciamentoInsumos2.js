import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoInsumos.png';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';
import ScrollVieww from '../../components/scrollView';
import { useNavigation, useIsFocused } from '@react-navigation/native';

//importacoes necessarias para consumir api
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import { id } from 'react-native-paper-dates';


const GerenciamentoInsumos2 = ({ navigation }) => {

    const isFocused = useIsFocused(); // Hook para detectar quando a tela está em foco

    //aqui vamos enviar o id que o usuario clicar em editar
    const [insumoId, setInsumoId] = useState('');

    //obtendo os dados do contexto
    const { token, usuarioId } = useContext(UserContext);


    const EditarInsumo = (id) => {
        console.log(id)
        navigation.navigate('EditarInsumo', { id });
    };

    const ExcluirInsumo = (id) => {
        navigation.navigate('ExcluirInsumo', { id });
    };


    const [dadosInsumo, setDadosInsumo] = useState([]);


        const fetchInsumo = async () => {
            if (!usuarioId) {
                Alert.alert("Erro", "ID do usuário não encontrado.");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3000/api/insumo/editar/usuario/${usuarioId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    setDadosInsumo(response.data);
                    console.log(response.data);
                }
            } catch (error) {
                console.error('Erro ao buscar dados dos insumos:', error);
                Alert.alert('Erro', 'Não foi possível carregar os insumos cadastrados.');
            }
        };

    useEffect(() => {
        if (isFocused) {
            fetchInsumo();
        }
    }, [isFocused]);

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="Menu" />

                <Image source={logo} style={styles.image} />

                <Text variant="titleLarge" style={styles.title}>
                    Gerenciamento de Insumos
                </Text>

                <ScrollVieww
                    talhoes={dadosInsumo}
                    onEdit={EditarInsumo}
                    onDelete={ExcluirInsumo}
                />

                { /*<PersonagemComBalao texto="Insira as informações sobre o insumo " /> - Adryan olha isso seu porra*/}
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
    title: {
        marginTop: 20,
        marginBottom: 20,
        color: 'white',
    },
});

export default GerenciamentoInsumos2;
