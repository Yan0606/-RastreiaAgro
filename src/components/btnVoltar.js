import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import btnVoltar from '../assets/images/btnVoltar.png';

export default function BtnVoltar() {
    const navigation = useNavigation();

    const handleFirstScreen = () => {
      navigation.navigate('FirstScreen');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.touch} onPress={handleFirstScreen}>
                <Image style={styles.btnVoltar} source={btnVoltar} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin:10,
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10, // Garante que o botão fique acima de outros elementos
    },
    touch: {
        margin: 10,
    },
    btnVoltar: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
});
