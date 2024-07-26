import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BlockRegistro({ data, pratica }) {
    return (
        <View style={styles.container}>
            <View style={styles.block}>
                <View style={styles.data}>
                    <Text style={styles.texto}>{data}</Text>
                </View>
                <View style={styles.pratica}>
                    <Text style={styles.texto}>{pratica}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 325,
        paddingTop: 16,
    },
    block: {
        margin: 5,
    },
    data: {
        backgroundColor: '#D9D9D9',
        padding: 15,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
    },
    pratica: {
        backgroundColor: '#FFF',
        padding: 15,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
    },
    texto: {
        fontSize: 16,
    },
});
