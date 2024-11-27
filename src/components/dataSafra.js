import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function DataSafra({ titulo = "Safra", inicio, fim }) {
    return (
        <Text style={styles.subtitle}>
            {titulo} - Início: {inicio} - Fim: {fim}
        </Text>
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
