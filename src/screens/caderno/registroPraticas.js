import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, IconButton, Searchbar } from 'react-native-paper';
import logo from '../../assets/images/logoCaderno.png';
import BtnVoltar from '../../components/btnVoltar';
import DataSafra from '../../components/dataSafra';
import InfoTalhao from '../../components/infoTalhao';

export default function RegistroPraticas({ navigation }) {
    const [searchQuery, setSearchQuery] = React.useState('');
    return (
        <View style={styles.container}>
            <BtnVoltar route="GerenciamentoCaderno" />
            <Image source={logo} style={styles.image} />
            <Text style={styles.title}>Registro de Práticas Agrícolas</Text>
            <DataSafra />
            <InfoTalhao />
            <View style={styles.talhao}>
                <View style={styles.actionButton}>
                    <IconButton
                        icon="plus-thick"
                        iconColor="white"
                        size={20}
                        onPress={() => onEdit(talhao.id)}
                    />
                    <Text style={styles.actionButtonText}>Nova Atividade</Text>
                </View>

                <View style={styles.actionButton2}>
                    <IconButton
                        icon="trash-can-outline"
                        iconColor="white"
                        size={20}
                        onPress={() => onEdit(talhao.id)}
                    />
                    <Text style={styles.actionButtonText2}>Encerrar Safra</Text>
                </View>
            </View>
            <Searchbar
                style={styles.searchBar}
                placeholder="Procurar atividade"
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
            <Text style={styles.text}>Atividades Relacionadas: </Text>
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
        color: '#fff'
    },
    talhao: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,

    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#009846',
        borderRadius: 10,
        margin: 10,
    },
    actionButtonText: {
        marginLeft: 5,
        marginRight: 10,
        fontWeight: 'bold',
        color: '#fff'
    },
    actionButton2: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#BB2929',
        borderRadius: 10,
    },
    actionButtonText2: {
        marginLeft: 5,
        marginRight: 10,
        fontWeight: 'bold',
        color: '#fff'
    },
    searchBar:{
        margin:15,
        borderRadius:15,
    },
    text:{
        fontSize:16,
        fontWeight:'bold',
        color:"#fff",
    }
});
