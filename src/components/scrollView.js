import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

const ScrollVieww = ({ talhoes, onEdit, onDelete }) => {
    return (
        <ScrollView contentContainerStyle={styles.talhoesContainer}>
            {talhoes.map((talhao) => (
                <View key={talhao.id} style={styles.talhao}>
                    <Text style={styles.talhaoText}>{talhao.nome}</Text>
                    <View style={styles.actionButtonsContainer}>
                        <IconButton
                            icon="pencil"
                            size={20}
                            onPress={() => onEdit(talhao.id)}
                            style={[styles.actionButton, styles.editButton]}
                        />
                        <IconButton
                            icon="delete"
                            size={20}
                            onPress={() => onDelete(talhao.id)}
                            style={[styles.actionButton, styles.deleteButton]}
                        />
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
        flex: 1,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 5, 
    },
    actionButton: {
        borderRadius: 10,
        padding: 5,
    },
    editButton: {
        backgroundColor: '#FFA500', 
    },
    deleteButton: {
        backgroundColor: '#BB2929', 
    },
});

export default ScrollVieww;
