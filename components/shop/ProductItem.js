import React from 'react';
import {StyleSheet, View, Text, Image, Button, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';

const ProductItem=props=>{

    return(
        <View >
            <TouchableOpacity onPress={props.onSelect} useForeground style={styles.product}>
            <View style={styles.imageContainer}>
            <Image source={{uri: props.image}} style={styles.image}/>
            </View>
            <View style={styles.details}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.action}>
             {props.children}
            </View>
    </TouchableOpacity>
        </View>
    )
}

const styles= StyleSheet.create({
    product:{
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius:10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
    },
    image:{
        width: '100%',
        height: '100%',
    },
    title:{
        fontSize: 18,
        marginVertical: 4,
        fontFamily: 'open-sans-bold'
    },
    price:{
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans'
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    },
    details:{
        alignItems: 'center',
        height: '15%',
        padding: 10,
    },
    imageContainer:{
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    }
})

export default ProductItem