import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/images/icon.png';
import personagem from '../assets/images/vetor_agricultor.png';
import balaoConversa from '../assets/images/balão_conversa.png';
import Btn from '../components/button';

const FirstScreen = () => {
  const navigation = useNavigation();

  const handleCadastroAgricultor = () => {
    navigation.navigate('CadastroAgricultor');
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Image source={logo} style={styles.image} />
        <Text variant="headlineSmall" style={styles.h1}>Bem-Vindo ao Rastreia Agro</Text>
        <Text variant="titleSmall" style={styles.h2}>Já tenho cadastro</Text>
        <Btn />
        <Text variant="titleSmall" style={styles.h2}>Sou novo, ainda não tenho cadastro</Text>
        <Btn text="Cadastrar-se" onPress={handleCadastroAgricultor} />
        <View style={styles.balaoContainer}>
          <Image source={balaoConversa} style={styles.balaoConversa} />
          <Text variant="titleMedium" style={styles.balaoText}>Selecione qual opção você se encaixa</Text>
        </View>
        <Image source={personagem} style={styles.personagem} />
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
    backgroundColor: '#18603A'
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  personagem: {
    height: 250,
    resizeMode: 'contain',
  },
  balaoContainer: {
    position: 'relative',
    width: 200,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balaoConversa: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  balaoText: {
    position: 'absolute',
    color: '#009846',
    textAlign: 'center',
    padding: 10,
  },
  h1: {
    marginTop: 50,
  },
});

export default FirstScreen;
