import { View, Image, StyleSheet } from 'react-native';
import { PaperProvider, Text } from "react-native-paper";
import logo from "../assets/images/icon.png";
import TextInputComponent from "../components/input";
import Btn from '../components/button';


const Login = ({ navigation }) => {
    const handleMenu = () => {
        navigation.navigate('Menu');
    };

    const handleFirstScreen = () => {
        navigation.navigate('FirstScreen');
    }

    return (
        <PaperProvider>
            <View style={styles.container}>
                
                <Image source={logo} style={styles.image} />
                
                <Text variant="titleMedium" style={styles.h2}>
                Bem-Vindo ao Rastreia Agro
                </Text>

                <TextInputComponent text="Digite seu CPF ou CNPJ" />
                <TextInputComponent text="Digite sua Senha" />
                <Btn text="ENTRAR" onPress={handleMenu} />
                <Text style={styles.label} onPress={handleFirstScreen}>Entre ou Cadastre-se</Text>

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
    h2: {
        marginTop: 20,
        marginBottom: 20,
    },
    label: {
        marginTop: 17,
    }
});

export default Login;