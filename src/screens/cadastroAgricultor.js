import React, { useState, useContext } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../assets/images/icon.png';
import TextInputComponent from '../components/input';
import Btn from '../components/button';
import BtnVoltar from '../components/btnVoltar';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

const CadastroAgricultor = ({ navigation }) => {
  const { setToken } = useContext(UserContext);
  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/cadastrar', {
        nome,
        cpf,
        email,
        telefone,
        senha,
      });

      if (response.status === 201) {
        const { token, usuarioId } = response.data;
        setToken(token); // Salva o token no contexto do usuário
        console.log("Cadastro bem-sucedido. ID do usuário:", usuarioId);
        
        // Verifica se o `usuarioId` é válido antes de navegar
        if (usuarioId) {
          navigation.navigate('CadastroPropriedade', { usuarioId });
        } else {
          Alert.alert("Erro", "ID do usuário ausente. Não é possível continuar para o cadastro de propriedade.");
          console.error("ID do usuário ausente após o cadastro.");
        }
      }
    } catch (error) {
      console.error('Erro ao cadastrar o agricultor:', error);
      Alert.alert('Erro', 'Erro ao cadastrar o agricultor. Tente novamente.');
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <BtnVoltar route="FirstScreen" />
        <Image source={logo} style={styles.image} />
        <Text variant="titleMedium" style={styles.h2}>
          INFORMAÇÕES SOBRE O RESPONSÁVEL PELO EMPREENDIMENTO
        </Text>
        <TextInputComponent label="Nome" value={nome} onChangeText={setNome} />
        <TextInputComponent label="CPF" value={cpf} onChangeText={setCPF} />
        <TextInputComponent label="Email" value={email} onChangeText={setEmail} />
        <TextInputComponent label="Telefone" value={telefone} onChangeText={setTelefone} />
        <TextInputComponent label="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
        <Btn label="PRÓXIMO" onPress={handleCadastro} />
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

export default CadastroAgricultor;
