import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

const CardCaderno = ({ data, onClick }) => {
    return (
        <Card style={styles.card} onPress={onClick}>
            <Card.Content>
                <Text style={styles.title}>{data?.titulo || 'Título não disponível'}</Text>
                <Text style={styles.date}>Início: {data?.inicio || 'N/A'}</Text>
                <Text style={styles.date}>Fim: {data?.fim || 'N/A'}</Text>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        width: '90%',
        alignSelf: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    date: {
        fontSize: 14,
        color: '#777',
    },
});

export default CardCaderno;
