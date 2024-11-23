import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const InputDataPick = ({ label, defaultValue, onChangeDate }) => {
    const [chosenDate, setChosenDate] = useState(defaultValue || new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleConfirm = (date) => {
        setChosenDate(date);
        setDatePickerVisibility(false);
        if (onChangeDate) onChangeDate(date);
    };

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <Button
                mode="outlined"
                onPress={() => setDatePickerVisibility(true)}
                style={styles.button}
                labelStyle={styles.buttonText}
            >
                {chosenDate.toLocaleDateString()}
            </Button>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                date={chosenDate}
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisibility(false)}
            />

            {/* EXEMPLO DE COMO USAR 
            <InputData
                label="Data de Nascimento"
                defaultValue={new Date('1990-01-01')}
                onChangeDate={(date) => console.log(date.toLocaleDateString())}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#18603A',
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#fff',
        borderColor: '#18603A',
        borderWidth: 1,
        borderRadius: 40,
        justifyContent: 'center',
        height: 50,
    },
    buttonText: {
        color: '#18603A',
        fontSize: 16,
    },
});

export default InputDataPick;
