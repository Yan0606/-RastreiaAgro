import React, { useEffect, useState, useContext } from 'react';

import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { PaperProvider, Text } from "react-native-paper";
import config from '../assets/images/config.png';
import rel from '../assets/images/rel.png';
import person from '../assets/images/person.png';
import safra from '../assets/images/safra.png';
import caderno from '../assets/images/caderno.png';
import cultura from '../assets/images/cultura.png';
import talhoes from '../assets/images/talhoes.png';
import maquinas from '../assets/images/maquinas.png';
import insumos from '../assets/images/insumos.png';
import PersonagemComBalao from '../components/PersonagemComBalao';


import { UserContext } from '../contexts/UserContext';
const windowWidth = Dimensions.get('window').width;

const Login = ({ navigation }) => {
    const { user } = useContext(UserContext);    // Adiciona o setToken
    const { usuarioId } = useContext(UserContext);

    console.log("O ID DO USUARIO É:", usuarioId)
    const handleMenuConfig = () => {
        navigation.navigate('MenuConfig');
    }

    // 29 - 39 necessarias para que o personagem balao apareca
    const [modalVisible, setModalVisible] = useState(true); // Modal inicialmente visível
    const closeModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        // Mostrar o modal ao carregar a tela
        setModalVisible(true);
    }, []);

    const renderButton = (icon, label, onPress) => (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image source={icon} style={styles.icon} />
            <Text>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <PaperProvider>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.profileSection}>
                        <Image source={person} style={styles.profileIcon} />
                        <Text style={styles.profileName}>{user}</Text>


                    </View>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity onPress={handleMenuConfig}>
                            <Image source={config} style={styles.headerIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={rel} style={styles.headerIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.grid}>
                    {renderButton(safra, 'Safra', () => navigation.navigate('GerenciamentoSafra'))}
                    {renderButton(caderno, 'Caderno', () => navigation.navigate('GerenciamentoCaderno'))}
                    {renderButton(cultura, 'Cultura', () => navigation.navigate('GerenciamentoCultura'))}
                    {renderButton(talhoes, 'Talhões', () => navigation.navigate('Gerenciamento'))}
                    {renderButton(maquinas, 'Máquinas', () => navigation.navigate('GerenciamentoMaquina'))}
                    {renderButton(insumos, 'Insumos', () => navigation.navigate('GerenciamentoInsumos'))}
                </View>
                {/*<PersonagemComBalao
                    texto={`Ola ${user}, seja bem vindo!`}
                    visible={modalVisible}
                    onClose={closeModal}
                />*/}
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
        marginTop: 15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    profileName: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerIcons: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    headerIcon: {
        width: 30,
        height: 30,
        marginBottom: 10,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    button: {
        width: (windowWidth - 60) / 2,
        height: (windowWidth - 60) / 2,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    }
});

export default Login;
