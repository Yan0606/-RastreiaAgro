import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../assets/images/icon.png';
import TextInputComponent from '../components/input';
import Btn from '../components/button';
import BtnVoltar from '../components/btnVoltar';
import PersonagemComBalao from '../components/PersonagemComBalao';

import axios from 'axios';

const CadastroAgricultor = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  useEffect(() => {
    // Mostrar o modal ao carregar a tela
    setModalVisible(true);
  }, []);

  const handleCadastroPropriedade = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/cadastrar', {
        nome: nome,
        email: 'email1@email.com',
        cpf: cpf,
        telefone: 'telefone',
        senha: 'senha',
        nivel: 'nivel'
      });
      navigation.navigate('CadastroPropriedade');
    } catch (error) {
      console.error(error);
    }

  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <BtnVoltar route="FirstScreen" />

        <Image source={logo} style={styles.image} />

        <Text variant="titleMedium" style={styles.h2}>
          INFORMAÇÕES SOBRE O RESPONSÁVEL PELO EMPREENDIMENTO
        </Text>

        {/* <TextInput
          label="Nome"
          mode="outlined"
          value={nome}
          onChangeText={text => setNome(text)}

        /> */}
        <TextInputComponent
          label="Digite seu nome"
          value={nome}
          onChangeText={text => setNome(text)}
        />

        <TextInputComponent
          label="Digite seu CPF"
          value={cpf}
          onChangeText={text => setCPF(text)}
        />


        <Btn label="PRÓXIMO" onPress={handleCadastroPropriedade} />

        <PersonagemComBalao
          texto="Para continuar com o cadastro, informe algumas informações suas"
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
    marginTop: 20,
    marginBottom: 20,
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default CadastroAgricultor;
