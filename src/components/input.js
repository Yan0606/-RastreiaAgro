import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const TextInputComponent = ({ text, defaultValue }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <TextInput
      label={text || 'Nome'}
      mode="outlined"
      style={styles.input}
      value={value}
      onChangeText={text => setValue(text)}
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
