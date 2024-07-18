import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

const ScrollVieww = ({ talhoes, onEdit, onDelete }) => {
    return (
        <ScrollView contentContainerStyle={styles.talhoesContainer}>
            {talhoes.map((talhao) => (
                <View key={talhao.id} style={styles.talhao}>
                    <Text style={styles.talhaoText}>{talhao.nome}</Text>
                    <View style={styles.actionButton}>
                        <IconButton
                            icon="pencil"
                            color="#FFA500"
                            size={20}
                            onPress={() => onEdit(talhao.id)}
                        />
                        <Text style={styles.actionButtonText}>Editar</Text>
                    </View>
                    <View style={styles.actionButton2}>
                        <IconButton
                            icon="delete"
                            color="#FF6347"
                            size={20}
                            onPress={() => onDelete(talhao.id)}
                        />
                        <Text style={styles.actionButtonText}>Excluir</Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    talhoesContainer: {
        width: 350,
        paddingHorizontal: 10,
    },
    talhao: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 5,
        padding: 10,
    },
    talhaoText: {
        fontSize: 16,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D88B30',
        borderRadius: 10,
        height: '75%',
    },
    actionButton2: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#BB2929',
        borderRadius: 10,
        height: '75%',
    },
    actionButtonText: {
        marginLeft: 5,
        marginRight: 10,
    },
});

export default ScrollVieww;
