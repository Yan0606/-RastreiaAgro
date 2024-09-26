import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/images/icon.png';
import Btn from '../components/button';
import PersonagemComBalao from '../components/PersonagemComBalao';

const FirstScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Mostrar o modal ao carregar a tela
    setModalVisible(true);
  }, []);

  const handleCadastroAgricultor = () => {
    navigation.navigate('CadastroAgricultor');
  };
  
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Image source={logo} style={styles.image} />
        <Text variant="headlineSmall" style={styles.h1}>Bem-Vindo ao Rastreia Agro</Text>
        <Text variant="titleSmall" style={styles.h2}>Já tenho cadastro</Text>
        <Btn onPress={handleLogin} />
        
        <Text variant="titleSmall" style={styles.h2}>Sou novo, ainda não tenho cadastro</Text>
        <Btn label="CADASTRAR-SE" onPress={handleCadastroAgricultor} />
        
        <PersonagemComBalao 
          texto="Selecione qual opção você se encaixa" 
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
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  h1: {
    marginTop: 50,
    color: '#fff',
  },
  h2: {
    marginVertical: 10,
    color: '#fff',
  },
});

export default FirstScreen;
