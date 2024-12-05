import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Text, IconButton, Searchbar } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import TextInputComponent from '../../components/input';

import Icon from 'react-native-vector-icons/MaterialIcons';
import TimelineEvent from '../TimelineEvent';

import logo from '../../assets/images/logoCaderno.png';
import BtnVoltar from '../../components/btnVoltar';
import DataSafra from '../../components/dataSafra';
import InfoTalhao from '../../components/infoTalhao';
import BlockRegistro from '../../components/blockRegistro';
import PersonagemComBalao from '../../components/PersonagemComBalao';
import Btn from '../../components/button';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import { id } from 'react-native-paper-dates';


const relatorioLinhaTempo = ({ navigation, route }) => {


    //obtendo os dados do contexto
    const { token, usuarioId } = useContext(UserContext);

    //id do insumo que foi clicado
    const RegistroPraticas = route.params;
    console.log("Envio de informacoes de gerenciamentoCaderno2", RegistroPraticas);

    const [dadosSafraTalhaoSelect, setDadosSafraTalhaoSelect] = useState([]);

    const [safra, setSafra] = useState(null);  // Estado para armazenar as informações da safra

    const [dadosTalhao, setDadosTalhao] = useState(null); // Estado para armazenar as informacoes do talhao

    const [dadosCultura, setDadosCultura] = useState(null);// Estado para armazenar as informacoes da cultura

    const [dadosCaderno, setDadosCaderno] = useState([]);
    const registros = Array.isArray(dadosCaderno) ? dadosCaderno : []; // Garante que seja um array

    const [dadosInsumo, setDadosInsumo] = useState([]);
    const [dadosMaquina, setDadosMaquina] = useState([]);

    const isFocused = useIsFocused(); // Hook para detectar quando a tela está em foco

    const fetchSafraTalhao = async () => {
        if (!usuarioId) {
            Alert.alert("Erro", "ID do usuário não encontrado.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/safraTalhao/detalhes/${usuarioId}/${RegistroPraticas.safraId.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setDadosSafraTalhaoSelect(response.data);

                // Aqui assumimos que a primeira safra da resposta é a que queremos exibir
                if (response.data.length > 0) {
                    setSafra(response.data[0].safra);  // Armazenando os dados da safra
                }
            }
        } catch (error) {
            console.error('Erro ao buscar dados da safra talhao:', error);
            Alert.alert('Erro', 'Não foi possível carregar os dados da safra.');
        }
        //GET PARA TALHOES
        try {
            // Segundo GET
            const anotherResponse = await axios.get(`http://localhost:3000/api/talhoes/editar/${RegistroPraticas.talhaoId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (anotherResponse.status === 200) {
                console.log("Dados do talhão recebidos:", anotherResponse.data);
                setDadosTalhao(anotherResponse.data);
            }
        } catch (error) {
            console.error('Erro ao buscar dados adicionais:', error);
            Alert.alert('Erro', 'Não foi possível carregar os dados adicionais.');
        }
        //GET PARA CULTURAS
        try {
            // terceiro GET
            const anotherResponse2 = await axios.get(`http://localhost:3000/api/cultura/editar/${RegistroPraticas.culturaId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (anotherResponse2.status === 200) {
                console.log("Dados da cultura recebidos:", anotherResponse2.data);
                setDadosCultura(anotherResponse2.data);
            }
        } catch (error) {
            console.error('Erro ao buscar dados adicionais:', error);
            Alert.alert('Erro', 'Não foi possível carregar os dados adicionais.');
        }
        //GET PARA CADERNO
        try {
            // quarto GET
            const anotherResponse3 = await axios.get(`http://localhost:3000/api/caderno/editar/usuario/${usuarioId}/${RegistroPraticas.safraTalhaoId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (anotherResponse3.status === 200) {
                console.log("Dados do caderno recebidos:", anotherResponse3.data);
                setDadosCaderno(anotherResponse3.data);
            }
        } catch (error) {
            console.error('Erro ao buscar dados adicionais:', error);
            Alert.alert('Erro', 'Não foi possível carregar os dados adicionais.');
        }
        //GET PARA INSUMO
        try {
            // QUINTO GET
            const anotherResponse4 = await axios.get(`http://localhost:3000/api/insumo/editar/usuario/${usuarioId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (anotherResponse4.status === 200) {
                console.log("Dados do insumo recebidos:", anotherResponse4.data);
                setDadosInsumo(anotherResponse4.data);
            }
        } catch (error) {
            console.error('Erro ao buscar dados adicionais:', error);
            Alert.alert('Erro', 'Não foi possível carregar os dados adicionais.');
        }
        //GET PARA MAQUINAS
        try {//SEXTO GET
            const response = await axios.get(`http://localhost:3000/api/maquina/editar/usuario/${usuarioId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setDadosMaquina(response.data);
                console.log(response.data);
            }
        } catch (error) {
            console.error('Erro ao buscar dados dos insumos:', error);
            Alert.alert('Erro', 'Não foi possível carregar os insumos cadastrados.');
        }

    };

    useEffect(() => {
        if (isFocused) {
            fetchSafraTalhao();
        }
    }, [isFocused]);

    const dropdownDataTipoIrriga = [
        { label: 'Aspersão', value: '1' },
        { label: 'Gotejamento', value: '2' },
        { label: 'Superficie', value: '3' },
    ];
    const dropdownDataInsumo = dadosInsumo.map((insumo) => ({
        label: insumo.nome,  // Nome do insumo
        value: insumo.id     // ID do insumo
    }));

    const dropdownDataMaquina = dadosMaquina.map((maquina) => ({
        label: maquina.nome,  // Nome do insumo
        value: maquina.id     // ID do insumo
    }));


    const [irrigacao, setIrrigacao] = useState('');
    console.log("A irrigação é: ", irrigacao.label)

    const [descricao, setDescricao] = useState('');
    const [insumoId, setInsumoId] = useState('');
    console.log("O id do insumo é: ", insumoId)

    const [maquinaId, setMaquinaId] = useState('');
    console.log("O id da maquina é: ", maquinaId)

    const [qtdInsumo, setQtdInsumo] = useState('')

    //MT COISA AQUI N TO ENTENDENDO NAO
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRegistros, setFilteredRegistros] = useState(registros);
    const [searchBarFocused, setSearchBarFocused] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalNovaAtividadeVisible, setModalNovaAtividadeVisible] = useState(false);
    const [modalEditarAtividadeVisible, setModalEditarAtividadeVisible] = useState(false);
    const [modalPersonagemVisible, setModalPersonagemVisible] = useState(false); // Estado para o personagem
    const [modalEdicaoConfirmada, setModalEdicaoConfirmada] = useState(false);
    const [modalEscolherFotoVisible, setModalEscolherFotoVisible] = useState(false); // Novo estado para escolher foto
    const [modalAdicionarFotoVisible, setModalAdicionarFotoVisible] = useState(false); // Novo estado para adicionar foto



    const [message, setMessage] = useState('Tem certeza que deseja encerrar a Safra?');


    const onChangeSearch = (query) => {
        setSearchQuery(query);
        setFilteredRegistros(
            dadosCaderno.filter(
                (registro) =>
                    registro.createdAt.includes(query) ||
                    (registro.descricao &&
                        registro.descricao.toLowerCase().includes(query.toLowerCase()))
            )
        );
    };

    const onEncerrarSafra = () => {





        // if (modalVisible) {
        //     setMessage('Safra encerrada com sucesso');
        // } else {
        //     setModalVisible(true);
        // }
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

    const closeModalEscolherFoto = () => {
        setModalEscolherFotoVisible(false);
    };

    const closeModalAdicionarFoto = () => {
        setModalAdicionarFotoVisible(false);
    };

    const onNaoPress = () => {
        closeModalAdicionarFoto();
    };

    const onSimPress = () => {
        setModalEscolherFotoVisible(true);
        setModalAdicionarFotoVisible(false);
    };

    const onCadastrarAtividade = async () => {
        //setModalAdicionarFotoVisible(true);
        try {
            const response = await axios.post('http://localhost:3000/api/caderno/novo', {
                irrigacao: irrigacao,
                safraTalhaoId: RegistroPraticas.safraTalhaoId,
                insumosId: insumoId || "",
                qtdInsumo: qtdInsumo || "",
                descricao,
                maquinaId: maquinaId || "",
                foto: "",
                usuarioId,

            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                console.log("Cadastro de atividade bem-sucedido.");
                closeModalNovaAtividade();

            }
        } catch (error) {
            console.error('Erro ao cadastrar atividade:', error);
            Alert.alert('Erro', 'Erro ao cadastrar atividade. Tente novamente.');
        }
    };

    useEffect(() => {
        if (message === 'Safra encerrada com sucesso') {
            setTimeout(() => {
                navigation.navigate('GerenciamentoCaderno');
                closeModal();
            }, 2000); // 2 segundos para navegar para a próxima página
        }
    }, [message, navigation]);

    useEffect(() => {
        setFilteredRegistros(dadosCaderno);
    }, [dadosCaderno]);

    const handleSelect = (item) => {
        setIrrigacao(item.label); // Armazena o label ("Aspersão", "Gotejamento", etc.)
        console.log('Tipo de irrigação selecionado:', item.label);
    };

    const handleSelectInsumo = (item) => {
        // Apenas o ID do insumo será armazenado
        setInsumoId(item.value);  // Armazena o ID
        console.log('Selected Insumo ID:', item.value);
    };

    const handleSelectMaquina = (item) => {
        // Apenas o ID do insumo será armazenado
        setMaquinaId(item.value);  // Armazena o ID
        console.log('Selected Insumo ID:', item.value);
    };

    const events = [
        { id: 1, type: 'Irrigação', date: '23/04' },
        { id: 2, type: 'Irrigação', date: '25/04' },
        { id: 3, type: 'Adubação', date: '23/04' },
        { id: 4, type: 'Irrigação', date: '25/04' },
        { id: 5, type: 'Adubação', date: '23/04' },
    ];

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {!searchBarFocused && (
                    <>
                        <BtnVoltar route="RelatorioSafra2" />
                        <Image source={logo} style={styles.image} />
                        <Text style={styles.title}>Registro de Práticas Agrícolas</Text>
                        {/* Exibindo a DataSafra apenas se safra estiver disponível */}
                        {safra && (
                            <DataSafra
                                titulo={safra.nome}
                                inicio={safra.dataInicio ? safra.dataInicio.split('T')[0] : 'Data não definida'}
                                fim={safra.dataFim ? safra.dataFim.split('T')[0] : 'Data não definida'}
                            />
                        )}
                        <InfoTalhao
                            talhaoSelecionado={dadosTalhao?.nome || "Carregando..."}
                            plantio={dadosCultura?.nome || "Carregando..."}
                        />
                    </>
                )}

                <Text style={styles.title}>SUA LINHA DO TEMPO</Text>

                <View style={styles.timelineContainer}>
                    {filteredRegistros.map((registro, index) => (
                        <TimelineEvent
                            index={index}
                            type={registro.descricao || "Sem descrição"}
                            date={new Date(registro.createdAt).toLocaleDateString('pt-BR')}
                            total={Object.keys(events).length}
                        />
                    ))}
                </View>
            </ScrollView>

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
    inputDropDown: {
        width: '100%',
        borderColor: '#ccc',
        borderRadius: 5,
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
    btnContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '50%',
        marginTop: 20,
    },
    dropdown: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#999',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#333',
    },
});

export default relatorioLinhaTempo;
