import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';


export default function DataSafra({ navigation }) {
    return (
        <Text style={styles.subtitle}>Safra 1 - Início: 26/04/24 - Fim: 02/12/24</Text>
    );
}

const styles = StyleSheet.create({
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 16,
        color: '#fff',
        backgroundColor: 'rgba(9, 255, 122, 0.3)',
        borderRadius: 40,
        padding: 7,
    },
});
