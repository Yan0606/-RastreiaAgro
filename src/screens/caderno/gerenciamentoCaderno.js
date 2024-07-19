import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Text } from 'react-native-paper';
import logo from '../../assets/images/logoCaderno.png';
import Btn from '../../components/button';
import BtnVoltar from '../../components/btnVoltar';
import PersonagemComBalao from '../../components/PersonagemComBalao';

export default function GerenciamentoCaderno({ navigation }) {
    return (
        <View style={styles.container}>
            <BtnVoltar route="Menu" />
            <Image source={logo} style={styles.image} />
            <Text style={styles.title}>Caderno de campo</Text>
            <Text style={styles.subtitle}>Selecione a safra</Text>
            <Card style={styles.card} onPress={() => navigation.navigate('GerenciamentoCaderno2')}>
                <Card.Content>
                    <Text>Safra 1</Text>
                    <Text style={styles.dt}>Início: 26/04/24</Text>
                    <Text style={styles.dt}>Fim: 02/12/24</Text>
                </Card.Content>
            </Card>
            <Card style={styles.card} onPress={() => navigation.navigate('GerenciamentoCaderno2')}>
                <Card.Content>
                    <Text>Safra 2</Text>
                    <Text style={styles.dt}>Início: 30/02/24</Text>
                    <Text style={styles.dt}>Fim: 02/02/25</Text>
                </Card.Content>
            </Card>
            <Btn label="PRÓXIMO" />
            <Text style={styles.label} >Ou cadastre uma nova...</Text>
            <PersonagemComBalao texto="Selecione qual safra deseja cadastrar atividades ou cadastre uma 
nova"/>
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
    backButton: {
        alignSelf: 'flex-start',
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
        color:'#fff'
    },
    dt:{
        color:'#D5D5D5',
        fontWeight:'bold',
    },
    card: {
        marginVertical: 8,
        width: '90%',
    },
    button: {
        marginTop: 16,
    },
    label: {
        margin: 17,
        textDecorationLine:"underline",
        color:'#fff'
    }

});
