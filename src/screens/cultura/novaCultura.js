import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoCultura.png';
import TextInputComponent from '../../components/input';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';

import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';

const NovaCultura = ({ navigation, route }) => {
    //obtendo os dados do contexto
    const { token } = useContext(UserContext);    // Adiciona o setToken
    const { usuarioId } = useContext(UserContext);
    console.log("O ID DO USUARIO É:", usuarioId)

    const { nomeRecebido } = route.params;
    const [nome, setNome] = useState(nomeRecebido); // Inicializa com o valor recebido
    const [tempoProducao, setTempoProducao] = useState('');

    useEffect(() => {
        if (!usuarioId) {
          Alert.alert('Erro', 'ID do usuário ausente. Retorne e faça o cadastro novamente.');
          navigation.goBack();
        }
      }, [usuarioId]);

    const GerenciamentoCultura = () => {
        navigation.navigate('GerenciamentoCultura');
    };

    const handleCadastroCultura = async () => {
        try {
          const response = await axios.post('http://localhost:3000/api/cultura/novo', {
            nome,
            tempoProducao,
            usuarioId,
    
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (response.status === 201) {
            console.log("Cadastro de cultura bem-sucedido.");
            navigation.navigate('GerenciamentoCultura2');
          }
        } catch (error) {
          console.error('Erro ao cadastrar cultura:', error);
          Alert.alert('Erro', 'Erro ao cadastrar cultura. Tente novamente.');
        }
      };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route={GerenciamentoCultura} />

                <Image source={logo} style={styles.image} />

                <Text variant="titleMedium" style={styles.h2}>
                    Gerenciamento de Cultura
                </Text>

                <TextInputComponent label="Nome" value={nome} onChangeText={setNome} />
                <TextInputComponent label="Tempo de produção" value={tempoProducao} onChangeText={setTempoProducao} />

                <Btn label="CADASTRAR" onPress={handleCadastroCultura} />


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
    input: {

    },
    h2: {
        marginTop: 20,
        marginBottom: 5,
    },
});

export default NovaCultura;
