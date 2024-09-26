import React, { useEffect, useState } from 'react';
import { View, Image, Modal, StyleSheet, Animated } from 'react-native';
import { Text } from 'react-native-paper';
import personagem from '../assets/images/vetor_agricultor.png';
import balaoConversa from '../assets/images/balão_conversa.png';

const PersonagemComBalao = ({ texto, visible, onClose }) => {
  const [opacity] = useState(new Animated.Value(1)); // Estado para opacidade

  useEffect(() => {
    if (visible) {
      // Reiniciar opacidade quando a modal se torna visível
      opacity.setValue(1);

      const timer = setTimeout(() => {
        // Animar para desaparecer
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500, // duração da animação
          useNativeDriver: true,
        }).start(() => {
          onClose(); // Fechar após a animação
        });
      }, 3000); // 3 segundos

      // Limpeza do timer ao desmontar ou ao fechar
      return () => clearTimeout(timer);
    }
  }, [visible, onClose, opacity]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Animated.View style={[styles.popup, { opacity }]}>
          <View style={styles.container}>
            <View style={styles.balaoContainer}>
              <Image source={balaoConversa} style={styles.balaoConversa} />
              <Text variant="titleMedium" style={styles.balaoText}>{texto}</Text>
            </View>
            <Image source={personagem} style={styles.personagemImage} />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: '80%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
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
});

export default PersonagemComBalao;
