import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import Button from '../components/button';
import BtnVoltar from '../components/btnVoltar';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';
import { jsPDF } from 'jspdf';
import * as FileSystem from 'expo-file-system';
import config from '../../config';

const Qrcodescreen = () => {
    const [showQRCode, setShowQRCode] = useState(false);
    const navigation = useNavigation();

    const handleGenerateQRCode = () => {
        setShowQRCode(true);
    };

    const handleViewQRCodeContent = () => {
        navigation.navigate('QRCodeRoutes');
    };

    const handleGeneratePDF = async () => {
        const doc = new jsPDF();
        doc.text('Relatorio Linha Tempo', 10, 10);
        doc.text('http://localhost:3000/relatorioLinhaTempo', 10, 20);
        doc.text('Relatorio', 10, 30);
        doc.text('http://localhost:3000/relatorio', 10, 40);

        const pdfOutput = doc.output('blob');
        const pdfUri = `${FileSystem.documentDirectory}QRCodeContent.pdf`;

        try {
            await FileSystem.writeAsStringAsync(pdfUri, pdfOutput, {
                encoding: FileSystem.EncodingType.Base64,
            });
            Alert.alert('PDF Gerado', `PDF salvo em: ${pdfUri}`);
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            Alert.alert('Erro', 'Não foi possível gerar o PDF.');
        }
    };

    const qrData = {
        relatorioLinhaTempo: `${config.serverIp}/relatorioLinhaTempo`,
        relatorio: `${config.serverIp}/relatorio`
    };

    return (
        <View style={styles.container}>
            <BtnVoltar route="Menu" />
            <Text style={styles.scanText}>Scan QR code</Text>
            {showQRCode ? (
                <TouchableOpacity onPress={handleViewQRCodeContent}>
                    <QRCode value={JSON.stringify(qrData)} size={200} />
                </TouchableOpacity>
            ) : (
                <Image source={require('../assets/images/qrcode.png')} style={styles.qrCode} />
            )}
            <Button label="GERAR QR CODE" onPress={handleGenerateQRCode} />
            {showQRCode && (
                <>
                    <Button label="VER CONTEÚDO DO QR CODE" onPress={handleViewQRCodeContent} />
                    <Button label="GERAR PDF" onPress={handleGeneratePDF} />
                </>
            )}
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

export default Qrcodescreen;