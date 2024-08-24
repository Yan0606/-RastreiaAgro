import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BtnAddTalhao = ({ onPress }) => {
  return (
    <Button 
      mode="contained" 
      onPress={onPress} 
      style={styles.button}
      contentStyle={styles.contentStyle}
      labelStyle={styles.label}
    >
      NOVO
      <Icon name="plus" size={20} color="white" style={styles.icon} />
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row-reverse',
    backgroundColor: '#009846',
    borderRadius: 15,
    marginVertical: 10,
    paddingHorizontal: 5, // Adiciona padding horizontal para espaçar o texto e o ícone
  },
  contentStyle: {
    flexDirection: 'row',
    justifyContent: 'center', // Centraliza o conteúdo (texto e ícone)
    alignItems: 'center', // Garante que ícone e texto estejam alinhados verticalmente
  },
  label: {
    fontSize: 16,
    margin: 10
  },
  icon: {
    marginLeft: 20, // Espaçamento entre o ícone e o texto
  },
});

export default BtnAddTalhao;
