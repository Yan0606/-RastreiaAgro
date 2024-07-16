import React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { Provider as PaperProvider, Text, IconButton } from 'react-native-paper';
import logo from '../../assets/images/logoTalhoes.png';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';

const Gerenciamento2 = ({ navigation }) => {

    const talhoes = [
        { id: 1, nome: 'Talhão 1' },
        { id: 2, nome: 'Talhão 2' },
        { id: 3, nome: 'Talhão 3' },
        { id: 4, nome: 'Talhão 4' },
    ];

    return (
        <PaperProvider>
            <View style={styles.container}>
                <BtnVoltar route="Menu" />

                <Image source={logo} style={styles.image} />

                <Text variant="titleLarge" style={styles.title}>
                    Gerenciamento de Talhões
                </Text>

                <ScrollView contentContainerStyle={styles.talhoesContainer}>
                    {talhoes.map((talhao) => (
                        <View key={talhao.id} style={styles.talhao}>
                            <Text style={styles.talhaoText}>{talhao.nome}</Text>
                            <View style={styles.actionButton}>
                                <IconButton
                                    icon="pencil"
                                    color="#FFA500"
                                    size={20}
                                    onPress={() => console.log('Editar', talhao.id)}
                                />
                                <Text style={styles.actionButtonText}>Editar</Text>
                            </View>
                            <View style={styles.actionButton2}>
                                <IconButton
                                    icon="delete"
                                    color="#FF6347"
                                    size={20}
                                    onPress={() => console.log('Excluir', talhao.id)}
                                />
                                <Text style={styles.actionButtonText}>Excluir</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <PersonagemComBalao texto="Selecione se deseja editar ou excluir seus talhões" />
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#18603A',
    },
    image: {
        marginTop: 10,
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    title: {
        marginTop: 20,
        marginBottom: 20,
        color: 'white',
    },
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

export default Gerenciamento2;
