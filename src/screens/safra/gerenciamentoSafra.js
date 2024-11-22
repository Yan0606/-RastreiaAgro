import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoSafra.png';
import { useNavigation } from '@react-navigation/native';
import TextInputComponent from '../../components/input';
import InputData from '../../components/inputData';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext'; // Supondo que você tenha um contexto de usuário para o token
import { TextInputMask } from 'react-native-masked-text';

const GerenciamentoSafra = () => {
    const navigation = useNavigation();
    const { token, usuarioId } = useContext(UserContext); // Acessa o token do contexto de usuário
    const [modalVisible, setModalVisible] = useState(true); // Modal inicialmente visível
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [nomeSafra, setNomeSafra] = useState('');

    const formatDate = (date) => {
        if (!date) return null;  // Se não houver data, retorna null
    
        const day = date.getDate().toString().padStart(2, '0'); // Adiciona 0 à esquerda se o dia for menor que 10
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adiciona 0 à esquerda se o mês for menor que 10
        const year = date.getFullYear();  // Ano com 4 dígitos
    
        return `${year}-${month}-${day}`;  // Formato "YYYY-MM-DD"
    };

    const handleNovaSafra = async () => {
        const formattedDataInicio = formatDate(new Date(dataInicio));  // Formata data de início
        const formattedDataFim = formatDate(new Date(dataFim));  

        try {

            const response = await axios.post(
                'http://localhost:3000/api/safra/novo',
                {
                    nome: nomeSafra,
                    dataInicio: formattedDataInicio,
                    dataFim: formattedDataFim,
                    usuarioId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
                    },
                }
            );

            if (response.status === 201) {
                const safraId = response.data.id; // Captura o ID da safra retornado pela API
                Alert.alert('Sucesso', 'Safra cadastrada com sucesso!');

                // Navega para a tela NovaSafra, passando o safraId como parâmetro
                navigation.navigate('NovaSafra', { safraId });
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível cadastrar a safra. Verifique sua autenticação e tente novamente.');
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        // Mostrar o modal ao carregar a tela
        setModalVisible(true);
    }, []);

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="Menu" />

                <Image source={logo} style={styles.image} />

                <Text variant="titleMedium" style={styles.h2}>
                    Gerenciamento de Safras
                </Text>

                <View style={styles.inputRow}>
                    {/* <InputData
                        label="Data de início"
                        value={dataInicio}
                        onChangeDate={(date) => setDataInicio(date)} // Captura o valor selecionado no InputData
                    />
                    <InputData
                        label="Data de término"
                        value={dataFim}
                        onChangeDate={(date) => setDataFim(date)} // Captura o valor selecionado no InputData
                    /> */}
                </View>

                <TextInputMask
                        type={'custom'}
                        options={{
                            mask: '99/99/9999' // Define a máscara de data DD/MM/YYYY
                        }}
                        value={dataInicio}
                        onChangeText={(text) => setDataInicio(text)} // Atualiza o estado com o valor digitado
                        keyboardType="numeric" // Define o tipo de teclado como numérico
                        style={styles.maskInput}
                    />
                <TextInputMask
                        type={'custom'}
                        options={{
                            mask: '99/99/9999' // Define a máscara de data DD/MM/YYYY
                        }}
                        value={dataFim}
                        onChangeText={(text) => setDataFim(text)} // Atualiza o estado com o valor digitado
                        keyboardType="numeric" // Define o tipo de teclado como numérico
                        style={styles.maskInput}
                    />
                <TextInputComponent
                    label="Nome da Safra"
                    value={nomeSafra}
                    onChangeText={setNomeSafra}
                />

                <Btn label="PRÓXIMO" onPress={handleNovaSafra} />

                <Text variant="titleSmall" style={styles.h2}>
                    Ou gerenciar existentes
                </Text>
                <Btn label="SELECIONAR" onPress={() => navigation.navigate('GerenciamentoSafra2')} />

                <PersonagemComBalao
                    texto="Selecione se deseja cadastrar ou editar suas safras"
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
        color: "#fff",
        marginTop: 20,
        marginBottom: 5,
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 15,
    },
    input: {
        flex: 1,
        marginHorizontal: 5,
    },
    maskInput:{
        width: '90%',
        height: 34,
        marginBottom: 15,
        backgroundColor: "#fff",
        paddingVertical: 10,
    }
});

export default GerenciamentoSafra;
