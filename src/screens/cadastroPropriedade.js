import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../assets/images/icon.png';
import TextInputComponent from '../components/input';
import Btn from '../components/button';
import BtnVoltar from '../components/btnVoltar';
import PersonagemComBalao from '../components/PersonagemComBalao';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

const CadastroPropriedade = ({ navigation }) => {
  const { token } = useContext(UserContext); // Obtém o token do contexto
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioId, setUsuarioId] = useState(null); // Armazena o ID do usuário após o GET
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [area, setArea] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [rua, setRua] = useState('');

  useEffect(() => {
    setModalVisible(true);
    if (!token) {
      Alert.alert("Erro", "Token de autenticação ausente.");
      return;
    }

    // Faz a requisição GET para obter o usuarioId
    const fetchUsuarioId = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/usuario', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setUsuarioId(response.data.id);
        console.log("usuarioId recebido:", response.data.id);
      } catch (error) {
        console.error('Erro ao obter o usuarioId:', error);
        Alert.alert('Erro', 'Erro ao obter o ID do usuário.');
      }
    };

    fetchUsuarioId();
  }, [token]);

  const handleCadastroPropriedade = async () => {
    if (!usuarioId || !token) {
      Alert.alert("Erro", "ID do usuário ou token de autenticação ausente.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/propriedade/novo', {
        nome: nome || "Nome da Propriedade",
        cnpj: cnpj,
        area: area,
        estado: estado,
        cidade: cidade,
        endereco: rua,
        usuarioId: usuarioId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        navigation.navigate('Obrigado');
      }
    } catch (error) {
      console.error('Erro ao cadastrar a propriedade:', error);
      Alert.alert('Erro', 'Erro ao cadastrar a propriedade. Tente novamente.');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <BtnVoltar route="CadastroAgricultor" />
        <Image source={logo} style={styles.image} />
        <Text variant="titleMedium" style={styles.h2}>
          INFORMAÇÕES SOBRE O LOCAL DO EMPREENDIMENTO
        </Text>

        <TextInputComponent
          label="Nome da Propriedade"
          value={nome}
          onChangeText={text => setNome(text)}
        />

        <TextInputComponent
          label="Digite seu CNPJ"
          value={cnpj}
          onChangeText={text => setCnpj(text)}
        />

        <TextInputComponent 
          label="Área (ha)"
          value={area}
          onChangeText={text => setArea(text)}
        />

        <TextInputComponent
          label="Estado"
          value={estado}
          onChangeText={text => setEstado(text)}
        />

        <TextInputComponent
          label="Cidade"
          value={cidade}
          onChangeText={text => setCidade(text)}
        />

        <TextInputComponent
          label="Rua"
          value={rua}
          onChangeText={text => setRua(text)}
        />

        <Btn label="PRÓXIMO" onPress={handleCadastroPropriedade} />

        <PersonagemComBalao
          texto="Ótimo (Nome), agora informe sobre o local de empreendimento"
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
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default CadastroPropriedade;
