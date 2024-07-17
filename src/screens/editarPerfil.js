import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import InputIcon from '../components/inputIcon';
import Button from '../components/button';
import { useNavigation } from '@react-navigation/native';

const EditarPerfil = () => {

    const navigation = useNavigation();
    
    const Menu = () => {
        navigation.navigate('Menu');
    }

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text variant="headlineLarge" style={styles.title}>EDITAR PERFIL</Text>
                <InputIcon />
                <InputIcon label="Telefone" />
                <InputIcon label="Email" />
                <Button label="SALVAR" onPress={Menu}></Button>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        marginBottom:69,
    }
});

export default EditarPerfil;
