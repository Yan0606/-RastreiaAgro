import React from 'react';
import { View, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import personagem from '../assets/images/vetor_agricultor.png';
import balaoConversa from '../assets/images/balão_conversa.png';

const PersonagemComBalao = ({ texto, visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} 
    >
      <View style={styles.modalContainer}>
        <View style={styles.popup}>
          <View style={styles.container}>
            <View style={styles.balaoContainer}>
              <Image source={balaoConversa} style={styles.balaoConversa} />
              <Text variant="titleMedium" style={styles.balaoText}>{texto}</Text>
            </View>
            <Image source={personagem} style={styles.personagemImage} />
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
  },
  popup: {
    width: '80%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Fundo semi-transparente
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000', // Sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  container: {
    alignItems: 'center',
  },
  balaoContainer: {
    maxWidth: '80%',
    minHeight: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  balaoConversa: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    resizeMode: 'stretch',
  },
  balaoText: {
    color: '#009846',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    zIndex: 1,
  },
  personagemImage: {
    height: 450,
    marginTop: -80,
    resizeMode: 'contain',
  },
  closeText: {
    marginTop: 20,
    color: '#009846',
    fontWeight: 'bold',
  },
});

export default PersonagemComBalao;
