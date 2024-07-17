import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const Btn = ({ label, onPress }) => {
  return (
    <Button mode="contained" onPress={onPress} style={styles.button}>
      {label || 'ENTRAR'}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '90%',
    marginTop: 15,
    backgroundColor: '#009846'
  },
});

export default Btn;
