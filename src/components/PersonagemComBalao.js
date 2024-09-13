import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import personagem from '../assets/images/vetor_agricultor.png';
import balaoConversa from '../assets/images/balão_conversa.png';

const PersonagemComBalao = ({ texto }) => {
  return (
    <View style={styles.container}>
      <View style={styles.balaoContainer}>
        <Image source={balaoConversa} style={styles.balaoConversa} />
        <Text variant="titleMedium" style={styles.balaoText}>{texto}</Text>
      </View>
      <Image source={personagem} style={styles.personagem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  balaoContainer: {
    maxWidth: '80%', // Limita a largura máxima do balão
    minHeight: '35%',
    paddingHorizontal: 20, // Adiciona algum espaço ao redor do texto
    paddingVertical: 10, // Adiciona algum espaço ao redor do texto
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 5, // Espaço entre o balão e o personagem
  },
  balaoConversa: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'stretch', // Permite que a imagem estique para cobrir a área do texto
  },
  balaoText: {
    color: '#009846',
    textAlign: 'center',
    paddingHorizontal: 0, // Espaço interno no texto
    zIndex: 1, // Certifica-se de que o texto esteja acima do balão
  },
  personagem: {
    height: 250,
    resizeMode: 'contain',
   
  },
});

export default PersonagemComBalao;
