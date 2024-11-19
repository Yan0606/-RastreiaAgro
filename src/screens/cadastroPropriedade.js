import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../assets/images/icon.png';
import TextInputComponent from '../components/input';
import Btn from '../components/button';
import BtnVoltar from '../components/btnVoltar';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

const CadastroPropriedade = ({ route, navigation }) => {
  const { token } = useContext(UserContext);
  const { usuarioId } = route.params || {}; // Recebe o ID do usuário como parâmetro
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [area, setArea] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [rua, setRua] = useState('');

  useEffect(() => {
    console.log("usuarioId recebido na tela CadastroPropriedade:", usuarioId);
    if (!usuarioId) {
      Alert.alert('Erro', 'ID do usuário ausente. Retorne e faça o cadastro novamente.');
      navigation.goBack();
    }
  }, [usuarioId]);

  const handleCadastroPropriedade = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/propriedade/novo', {
        nome,
        cnpj,
        area,
        estado,
        cidade,
        endereco: rua,
        usuarioId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        console.log("Cadastro da propriedade bem-sucedido.");
        navigation.navigate('Obrigado');
      }
    } catch (error) {
      console.error('Erro ao cadastrar a propriedade:', error);
      Alert.alert('Erro', 'Erro ao cadastrar a propriedade. Tente novamente.');
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <BtnVoltar route="CadastroAgricultor" />
        <Image source={logo} style={styles.image} />
        <Text variant="titleMedium" style={styles.h2}>
          INFORMAÇÕES SOBRE O LOCAL DO EMPREENDIMENTO
        </Text>
        <TextInputComponent label="Nome da Propriedade" value={nome} onChangeText={setNome} />
        <TextInputComponent label="CNPJ" value={cnpj} onChangeText={setCnpj} />
        <TextInputComponent label="Área (ha)" value={area} onChangeText={setArea} />
        <TextInputComponent label="Estado" value={estado} onChangeText={setEstado} />
        <TextInputComponent label="Cidade" value={cidade} onChangeText={setCidade} />
        <TextInputComponent label="Rua" value={rua} onChangeText={setRua} />
        <Btn label="PRÓXIMO" onPress={handleCadastroPropriedade} />
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
    marginTop: 20,
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
});

export default CadastroPropriedade;
