import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const InputIcon = ({ label, icon, value, onChangeText }) => {
    return (
        <TextInput
            mode="outlined"
            label={label || 'Nome'}
            style={styles.input}
            value={value} // Use a prop `value` para exibir o valor inicial
            onChangeText={onChangeText} // Chame a função `onChangeText` para atualizar o valor no componente pai
            right={<TextInput.Icon icon={icon || 'pencil'} />}
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
        marginBottom: 15,
    },
});

export default InputIcon;
