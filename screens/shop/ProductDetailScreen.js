import React from 'react';
import {View, Text, StyleSheet, Image, Button, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import * as CartActions from '../../store/actions/cart';

const ProductDetailScreen=props=>{
    const dispatch = useDispatch();
    const productId = props.navigation.getParam('productId');
    const selectedProduct= useSelector(state=>state.products.availableProducts.find(e=>e.id === productId));
    return(
        <ScrollView>
          <Image source={{uri: selectedProduct.imageUrl}} style={styles.image}/>
          <View style={styles.action}>
          <Button title="Add to cart" onPress={()=>{
              dispatch(CartActions.addToCart(selectedProduct));
          }} color={Colors.primary}/>
          </View>
          <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
          <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}
ProductDetailScreen.navigationOptions=navData=>{
    return{
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

const styles= StyleSheet.create({
    image:{
        width:'100%',
        height:300,
    },
    action:{
        marginTop:20,
        alignItems: 'center'
    },
    price:{
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold'
    },
    description:{
        fontSize:14,
        textAlign:'center',
        marginHorizontal:20,
        fontFamily: 'open-sans'
    }
})

export default ProductDetailScreen