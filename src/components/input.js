import React from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const TextInputComponent = ({ label, value, onChangeText, secureTextEntry }) => {
  return (
    <TextInput
      label={label || 'Nome'}  // Define a label dinamicamente
      mode="outlined"
      style={styles.input}
      value={value}            // Usa o valor vindo da prop
      onChangeText={onChangeText}  // Chama a função passada via prop
      secureTextEntry={secureTextEntry}  // Adiciona a funcionalidade de ocultar senha
      theme={{
        roundness: 40,
        colors: {
          primary: '#18603A', // Cor da borda quando o input está focado
          outline: '#18603A', // Cor da borda quando o input não está focado
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '90%',
    height: 34,
    marginBottom: 15,
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
});

export default TextInputComponent;
