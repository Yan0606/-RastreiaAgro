import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, TextInput } from 'react-native';
import { Text, IconButton, Searchbar } from 'react-native-paper';
import logo from '../../assets/images/logoCaderno.png';
import BtnVoltar from '../../components/btnVoltar';
import DataSafra from '../../components/dataSafra';
import InfoTalhao from '../../components/infoTalhao';
import BlockRegistro from '../../components/blockRegistro';
import PersonagemComBalao from '../../components/PersonagemComBalao';
import Btn from '../../components/button';

const registros = [
    { data: '25/04/2023', pratica: 'Irrigação' },
    { data: '23/04/2023', pratica: 'Adubação' },
    { data: '22/04/2023', pratica: 'Irrigação' },
    { data: '20/04/2023', pratica: 'Adubação' },
    { data: '18/04/2023', pratica: 'Adubação' },
];

export default function RegistroPraticas({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRegistros, setFilteredRegistros] = useState(registros);
    const [searchBarFocused, setSearchBarFocused] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalNovaAtividadeVisible, setModalNovaAtividadeVisible] = useState(false);
    const [modalEditarAtividadeVisible, setModalEditarAtividadeVisible] = useState(false);
    const [modalPersonagemVisible, setModalPersonagemVisible] = useState(false); // Estado para o personagem
    const [modalEdicaoConfirmada, setModalEdicaoConfirmada] = useState(false);

    const [message, setMessage] = useState('Tem certeza que deseja encerrar a Safra?');

    const onChangeSearch = (query) => {
        setSearchQuery(query);
        setFilteredRegistros(
            registros.filter(
                (registro) =>
                    registro.data.includes(query) ||
                    registro.pratica.toLowerCase().includes(query.toLowerCase())
            )
        );
    };

    const onEncerrarSafra = () => {
        if (modalVisible) {
            setMessage('Safra encerrada com sucesso');
        } else {
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setMessage('Tem certeza que deseja encerrar a Safra?');
    };

    const onNovaAtividade = () => {
        setModalNovaAtividadeVisible(true);
    };

    const closeModalNovaAtividade = () => {
        setModalNovaAtividadeVisible(false);
    };

    const onEditarAtividade = () => {
        setModalEditarAtividadeVisible(true);
    };

    const closeModalEditarAtividade = () => {
        setModalEditarAtividadeVisible(false);
    };

    const onEditarConfirmacao = () => {
        setModalPersonagemVisible(true);
    };


    const onEdicaoConfirmada = () => {
        setModalEdicaoConfirmada(true);
    };

    const closeModalEdicaoConfirmada = () => {
        setModalEdicaoConfirmada(false);
    };

    const closeModalPersonagem = () => {
        setModalPersonagemVisible(false);
    };

    useEffect(() => {
        if (message === 'Safra encerrada com sucesso') {
            setTimeout(() => {
                navigation.navigate('GerenciamentoCaderno');
                closeModal();
            }, 2000); // 2 segundos para navegar para a próxima página
        }
    }, [message, navigation]);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {!searchBarFocused && (
                    <>
                        <BtnVoltar route="GerenciamentoCaderno" />
                        <Image source={logo} style={styles.image} />
                        <Text style={styles.title}>Registro de Práticas Agrícolas</Text>
                        <DataSafra />
                        <InfoTalhao />
                        <View style={styles.talhao}>
                            <TouchableOpacity style={styles.actionButton} onPress={onNovaAtividade}>
                                <IconButton
                                    icon="plus-thick"
                                    iconColor="white"
                                    size={20}
                                />
                                <Text style={styles.actionButtonText}>Nova Atividade</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.actionButton2} onPress={onEncerrarSafra}>
                                <IconButton
                                    icon="trash-can-outline"
                                    iconColor="white"
                                    size={20}
                                />
                                <Text style={styles.actionButtonText2}>Encerrar Safra</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
                <Searchbar
                    style={styles.searchBar}
                    placeholder="Procurar atividade"
                    onFocus={() => setSearchBarFocused(true)}
                    onBlur={() => setSearchBarFocused(false)}
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
                <Text style={styles.text}>Atividades Relacionadas: </Text>
                {filteredRegistros.map((registro, index) => (
                    <BlockRegistro key={index} data={registro.data} pratica={registro.pratica} />
                ))}
            </ScrollView>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <TouchableOpacity onPress={onEncerrarSafra}>
                        <PersonagemComBalao texto={message} />
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalNovaAtividadeVisible}
                onRequestClose={closeModalNovaAtividade}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Cadastro de Prática Agrícola</Text>
                        <View style={styles.inputEditar}>
                            <TextInput placeholder="Tipo de Irrigação" style={styles.inputW} />
                            <Btn label="Editar" backgroundColor="#D88B30" width={"30%"} onPress={onEditarAtividade} />
                        </View>
                        <TextInput placeholder="Outra atividade" style={styles.input} />
                        <TextInput placeholder="Quantidade (se houver)" style={styles.input} />
                        <Btn label="Cadastrar" onPress={closeModalNovaAtividade} />
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalEditarAtividadeVisible}
                onRequestClose={closeModalEditarAtividade}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={closeModalEditarAtividade}
                        >
                            <Text style={{ fontSize: 34, color: '#FF0000' }}>✕</Text>
                        </TouchableOpacity>
                        <TextInput placeholder="Talhão selecionado" style={styles.input} />
                        <TextInput placeholder="Culturas" style={styles.input} />
                        <TextInput placeholder="Tipo de Irrigação" style={styles.input} />
                        <Btn label="Editar" backgroundColor="#D88B30" width={"30%"} onPress={onEditarConfirmacao} />
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalPersonagemVisible}
                onRequestClose={closeModalPersonagem}
            >
                <View style={styles.modalOverlay}>
                <Btn style={styles.btnEntrar} label="Editar" backgroundColor="#D88B30" width={"40%"} onPress={onEdicaoConfirmada} />
                    <PersonagemComBalao texto="Tem certeza que deseja editar o tipo de irrigação do talhão 1?" />
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalEdicaoConfirmada}
                onRequestClose={closeModalEdicaoConfirmada}
            >
                <View style={styles.modalOverlay}>
                <Btn style={styles.btnEntrar} label="Continuar" backgroundColor="#009846" width={"40%"} onPress={closeModalEdicaoConfirmada} />
                    <PersonagemComBalao texto="Tipo de irrigação do talhão 1 alterado com sucesso para Aspersão  " />
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#18603A',
    },
    image: {
        marginTop: 10,
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        marginTop: 16,
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
        color: '#fff',
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
        color: '#fff',
    },
    searchBar: {
        margin: 15,
        width: '95%',
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    scrollViewContent: {
        alignItems: 'center',
        width: '100%',
        paddingTop: 50,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 40,
        width: '100%',
        alignItems: 'center',
    },
    modalCloseButton: {
        alignSelf: 'flex-end',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#009846'
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    inputW: {
        width: '67%',
        padding: 10,
        marginVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 8,
    },
    inputEditar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#009846',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
