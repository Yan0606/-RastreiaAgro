import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/images/icon.png';
import TextInputComponent from '../components/input';
import Btn from '../components/button';
import BtnVoltar from '../components/btnVoltar';
import PersonagemComBalao from '../components/PersonagemComBalao';

const CadastroPropriedade = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {
    // Mostrar o modal ao carregar a tela
    setModalVisible(true);
  }, []);

  const handleObrigado = () => {
    navigation.navigate('Obrigado');
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <BtnVoltar route="CadastroAgricultor" />
        <Image source={logo} style={styles.image} />
        <Text variant="titleMedium" style={styles.h2}>INFORMAÇÕES SOBRE O LOCAL DO EMPREENDIMENTO</Text>
        
        <TextInputComponent />
        <TextInputComponent text="CNPJ" />
        <TextInputComponent text="ÁREA(ha)" />
        <TextInputComponent text="Estado" />
        <TextInputComponent text="Cidade" />
        <TextInputComponent text="Rua" />
        
        <Btn label="PRÓXIMO" onPress={handleObrigado} />
        
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
