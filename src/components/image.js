import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import imgTalhao from '../assets/images/imgTalhao.png';

const Imagem = () => {
    return (
        <View style={styles.container}>
            <Image           
                style={styles.img}
                source={imgTalhao}
            />    
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        borderWidth: 8,
        borderColor: 'white',
        borderRadius:40,
    },
});

export default Imagem;
