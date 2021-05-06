import React,{useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Colors from '../../constants/Colors';
import cart from '../../store/reducers/cart';
import CartItem from './CartItem';
import Card from '../UI/Card';
const OrderItem = props =>{
    const [showDetails, setShowDetails] = useState(false);
    return (
    <Card style={styles.OrderItem}>
        <View style={styles.summary}>
            <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
            <Text style={styles.date}>{props.date}</Text>
        </View>
        <Button title={showDetails ? 'Hide Details' : 'Show Details'} color={Colors.primary} onPress={()=>setShowDetails(prevState=>!prevState)}/>
         {showDetails && <View style={styles.details}>
             {props.items.map(cartItem=> <CartItem key={cartItem.productId} quantity={cartItem.quantity} title={cartItem.productTitle} amount={cartItem.sum}/>)}
        </View>}
    </Card>
    )}

const styles = StyleSheet.create({
    OrderItem:{
        margin: 20,
        padding:10,
        alignItems: 'center'
    },
    summary:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:'100%',
        paddingBottom: 5
    },
    amount:{
        fontFamily: 'open-sans-bold',
        fontSize:16,
        paddingBottom: 5
    },
    date:{
        fontFamily: 'open-sans',
        color: '#888',
        fontSize:16
    },
    details:{
        width:'100%'
    }
})

export default OrderItem