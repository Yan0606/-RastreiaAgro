import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Button from '../components/button';
import InputIcon from '../components/inputIcon';
import BtnVoltar from '../components/btnVoltar';
const Qrcodescreen = () => {
    return (
        
        <View style={styles.container}>
             <BtnVoltar route="FirstScreen" />
             <InputIcon />
            <Text style={styles.scanText}>Scan QR code</Text>
            <Image source={require('../assets/images/qrcode.png')} style={styles.qrCode} />
            <Button label="BAIXAR"></Button>
            <Button label="VER LINHA DO TEMPO"></Button>
            
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0E0E0',
        borderRadius: 25,
    },
    backText: {
        fontSize: 20,
        color: '#000',
    },
    scanText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    qrCode: {
        width: 200,
        height: 200,
        marginBottom: 40,
    },
    button: {
        width: '80%',
        padding: 15,
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
export default  Qrcodescreen 