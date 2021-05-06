import React from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import Colors from '../../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import * as CartActions from '../../store/actions/cart';
import * as OrderActions from '../../store/actions/order';
import Card from '../../components/UI/Card'

const CartScreen=props=>{
    const cartTotalAmount = useSelector(state=>state.cart.totalAmount);
    const dispatch = useDispatch();
    let cartItems= useSelector(state=>{
        const transformedCartItems=[];
        for (const key in state.cart.items){
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return transformedCartItems.sort((a,b)=> a.productId>b.productId ? 1 : -1);
    });

    return(
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2)*100)/100}</Text></Text>
                <Button title="Order now" disabled={cartItems.length===0} onPress={()=>{dispatch(OrderActions.addOrder(cartItems, cartTotalAmount))}}/>
            </Card>
        <FlatList  data={cartItems} keyExtractor={item=>item.productId} 
        renderItem={itemData=> <CartItem quantity={itemData.item.quantity} title={itemData.item.productTitle} deletable
        amount={itemData.item.sum} onRemove={()=>{dispatch(CartActions.removeFromCart(itemData.item.productId))}}/>}/>
        </View>
    )
}
CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
}

const styles= StyleSheet.create({
    screen:{
        margin:20,
    },
    summary:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
    },
    summaryText:{
        fontFamily: 'open-sans-bold',
        fontSize:18,
    },
    amount:{
        color: Colors.accent
    }
})

export default CartScreen;