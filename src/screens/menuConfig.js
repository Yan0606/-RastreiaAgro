import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import safra from '../assets/images/safra.png';
import caderno from '../assets/images/caderno.png';
import cultura from '../assets/images/cultura.png';
import talhoes from '../assets/images/talhoes.png';
import maquinas from '../assets/images/maquinas.png';
import insumos from '../assets/images/insumos.png';

const MenuConfig = () => {
    const [modalVisible, setModalVisible] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        return () => {
            setModalVisible(false);  // Fecha o modal ao desmontar o componente
        };
    }, []);

    const Menu = () => {
        setModalVisible(false);
        navigation.navigate('Menu');
    }
    const TimelineScreen = () => {
        setModalVisible(false);
        navigation.navigate('TimelineScreen');
    }

    const FirstScreen = () => {
        setModalVisible(false);
        navigation.navigate('FirstScreen');
    }

    const EditarPerfil = () => {
        setModalVisible(false);
        navigation.navigate('EditarPerfil');
    }

    const EditarPropriedade = () => {
        setModalVisible(false);
        navigation.navigate('EditarPropriedade');
    }

    const Qrcodescreen = () => {
        setModalVisible(false);
        navigation.navigate('Qrcodescreen');
    }
   

    return (
        <View style={styles.container}>
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={Menu}>
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <TouchableOpacity style={styles.closeButton} onPress={Menu}>
                                    <Text style={styles.closeButtonText}>X</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={EditarPerfil}>
                                    <Text style={styles.text}>Editar perfil</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={EditarPropriedade}>
                                    <Text style={styles.text}>Editar propriedade</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={Qrcodescreen}>
                                    <Text style={styles.text}>Ver Qr Code</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={TimelineScreen}>
                                    <Text style={styles.text}>Ver linha do tempo</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={FirstScreen}>
                                    <Text style={[styles.text, styles.logoutText]}>Sair da minha conta</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <View style={styles.gridContainer}>
                <View style={styles.gridItem}>
                    <Image style={styles.icon} source={safra} />
                    <Text style={styles.gridText}>Safra</Text>
                </View>
                <View style={styles.gridItem}>
                    <Image style={styles.icon} source={caderno} />
                    <Text style={styles.gridText}>Caderno</Text>
                </View>
                <View style={styles.gridItem}>
                    <Image style={styles.icon} source={cultura} />
                    <Text style={styles.gridText}>Cultura</Text>
                </View>
                <View style={styles.gridItem}>
                    <Image style={styles.icon} source={talhoes} />
                    <Text style={styles.gridText}>Talhões</Text>
                </View>
                <View style={styles.gridItem}>
                    <Image style={styles.icon} source={maquinas} />
                    <Text style={styles.gridText}>Máquinas</Text>
                </View>
                <View style={styles.gridItem}>
                    <Image style={styles.icon} source={insumos} />
                    <Text style={styles.gridText}>Insumos</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '100%',
        backgroundColor: 'white',
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        position: 'absolute',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        borderTopLeftRadius: 40,
        top: 0,
        left: 0,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    closeButtonText: {
        fontSize: 24,
        color: 'black',
    },
    button: {
        width: '100%',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        fontSize: 16,
    },
    logoutButton: {
        borderBottomWidth: 0,
    },
    logoutText: {
        color: 'red',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '40%',
    },
    gridItem: {
        width: 150,
        height: 150,
        aspectRatio: 1,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 10,
        border: 'solid',
    },
    gridText: {
        fontSize: 16,
    },
    icon: {
        width: 62,
        height: 67,
    },
});

export default MenuConfig;
