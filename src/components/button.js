import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const Btn = ({ label, onPress, backgroundColor, width }) => {
  return (
    <Button 
      mode="contained" 
      onPress={onPress} 
      style={[styles.button, { backgroundColor: backgroundColor || '#009846', width: width || '90%' }]}
    >
      {label || 'ENTRAR'}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
  },
});

export default Btn;
