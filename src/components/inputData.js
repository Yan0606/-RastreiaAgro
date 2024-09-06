import React, { useState, useEffect } from 'react';
import { View, Text, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-paper';

const InputData = ({ label, defaultValue }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (defaultValue) {
      const initialDate = new Date(defaultValue);
      setDate(initialDate);
      setFormattedDate(formatDate(initialDate));
    }
  }, [defaultValue]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setFormattedDate(formatDate(currentDate));
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        mode="outlined"
        style={styles.input}
        value={formattedDate}
        onFocus={() => setShow(true)}
        theme={{
          roundness: 40,
          colors: {
            primary: '#18603A',
            outline: '#18603A',
          },
        }}
      />

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: '#fff',
  },
  input: {
    width: '100%',
    height: 34,
    marginBottom: 15,
  },
});

export default InputData;
