import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../../assets/images/logoInsumos.png';
// import InputIcon from '../../components/inputIcon'; SAPORRA AQUI ENVOLVE A PORRA LA EM BAIXO
import TextInputComponent from '../../components/input';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';

import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';

const NovoInsumo = ({ navigation, route }) => {
  //obtendo os dados do contexto
  const { token } = useContext(UserContext);    // Adiciona o setToken
  const { usuarioId } = useContext(UserContext);
  console.log("O ID DO USUARIO É:", usuarioId)


  const { nomeRecebido } = route.params;
  const [nome, setNome] = useState(nomeRecebido); // Inicializa com o valor recebido
  const [marca, setMarca] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState('');

  useEffect(() => {
    if (!usuarioId) {
      Alert.alert('Erro', 'ID do usuário ausente. Retorne e faça o cadastro novamente.');
      navigation.goBack();
    }
  }, [usuarioId]);


  const GerenciamentoInsumos = () => {
    navigation.navigate('GerenciamentoInsumos');
  };



  const handleCadastroInsumo = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/insumo/novo', {
        nome,
        marca,
        descricao,
        foto: "none",
        usuarioId,

      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        console.log("Cadastro de insumo bem-sucedido.");
        navigation.navigate('GerenciamentoInsumos2');
      }
    } catch (error) {
      console.error('Erro ao cadastrar insumo:', error);
      Alert.alert('Erro', 'Erro ao cadastrar insumo. Tente novamente.');
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <BtnVoltar route={GerenciamentoInsumos} />

        <Image source={logo} style={styles.image} />

        <Text variant="titleMedium" style={styles.h2}>
          Gerenciamento de Insumos
        </Text>

        <TextInputComponent label="Nome" value={nome} onChangeText={setNome} />
        <TextInputComponent label="Marca" value={marca} onChangeText={setMarca} />
        <TextInputComponent label="Descrição" value={descricao} onChangeText={setDescricao} />
        {/*<TextInputComponent label="Foto" value={nome} onChangeText={setNome} /> - Isso aqui vai ter que ficar pra depois*/}


        {/* <InputIcon label="Foto:" icon="camera" />  SAPORRA AQI TAVA DANDO B.O - YAN OLHA ISSO*/}

        <Btn label="CADASTRAR" onPress={handleCadastroInsumo} />

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
  input: {

  },
  h2: {
    marginTop: 20,
    marginBottom: 5,
  },
});

export default NovoInsumo;
