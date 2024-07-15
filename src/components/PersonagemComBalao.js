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
    position: 'relative',
    width: 180,
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
  personagem: {
    height: 250,
    resizeMode: 'contain',
  },
});

export default PersonagemComBalao;
