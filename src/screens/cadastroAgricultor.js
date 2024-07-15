import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import logo from '../assets/images/icon.png';
import TextInputComponent from '../components/input';
import Btn from '../components/button';
import BtnVoltar from '../components/btnVoltar';

const CadastroAgricultor = () => {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <BtnVoltar />
        <Image source={logo} style={styles.image} />
        <Text variant="titleMedium" style={styles.h2}>INFORMAÇÕES SOBRE O RESPONSÁVEL PELO EMPREENDIMENTO</Text>
        <TextInputComponent />
        <TextInputComponent text="CPF" />
        <TextInputComponent text="Telefone" />
        <TextInputComponent text="E-mail" />
        <Btn text="PRÓXIMO" />
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
    marginTop:10,
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  h2: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default CadastroAgricultor;
