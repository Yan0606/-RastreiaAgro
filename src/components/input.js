import React from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const TextInputComponent = ({ text }) => {
  return (
    <TextInput
      label={text || 'Nome'}
      mode="outlined"
      style={styles.input}
      theme={{ roundness: 40 }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '90%',
    height: 34 ,
    marginBottom: 15,
  },
});

export default TextInputComponent;
