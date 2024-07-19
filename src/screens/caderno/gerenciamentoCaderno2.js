import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Card, Text, IconButton } from 'react-native-paper';
import logo from '../../assets/images/logoCaderno.png';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';

export default function GerenciamentoCaderno2({ navigation }) {
    return (
        <View style={styles.container}>
            <BtnVoltar route="GerenciamentoCaderno" />
            <Image source={logo} style={styles.image} />
            <Text style={styles.title}>Detalhes da safra</Text>
            <Text style={styles.subtitle}>Safra 1 - Início: 26/04/24 - Fim: 02/12/24</Text>
            <Card style={styles.card}>
                <Card.Content>
                    <Text>Talhão 1: Milho</Text>
                    <Btn label="ABRIR"/>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                    <Text>Talhão 2: Batata</Text>
                    <Btn label="ABRIR"/>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                    <Text>Talhão 3: Tomate</Text>
                    <Btn label="ABRIR"/>
                </Card.Content>
            </Card>
            <PersonagemComBalao texto="Selecione qual talhão referente a safra deseja cadastrar nova atividade"/>
        </View>
    );
}

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
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color:'#fff'
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 16,
        color:'#fff',
        backgroundColor:'rgba(9, 255, 122, 0.3)',
        borderRadius:40,
        padding:7,
        
    },
    card: {
        marginVertical: 8,
        width:'90%'
    },
    openButton: {
        marginTop: 8,
    },
});
