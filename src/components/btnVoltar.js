import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import btnVoltar from '../assets/images/btnVoltar.png';

export default function BtnVoltar({ route }) {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.navigate(route);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.touch} onPress={handleGoBack}>
                <Image style={styles.btnVoltar} source={btnVoltar} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10,
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
