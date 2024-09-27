import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/images/icon.png';
import Btn from '../components/button';
import BtnVoltar from '../components/btnVoltar';
import PersonagemComBalao from '../components/PersonagemComBalao';

const Obrigado = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true); // Modal inicialmente visível

  const handleFirstScreen = () => {
    navigation.navigate('FirstScreen');
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
        <BtnVoltar route="CadastroPropriedade" />
        <Image source={logo} style={styles.image} />
        <Text variant="headlineLarge" style={styles.h2}>
          Obrigado por terminar seu cadastro conosco
        </Text>
        
        <Btn text="VOLTAR PARA O INÍCIO" onPress={handleFirstScreen} />
        
        <PersonagemComBalao 
          texto="Ótimo (Nome), agora entraremos em contato para terminar seu cadastro" 
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
    textAlign: 'center',
  },
});

export default Obrigado;
