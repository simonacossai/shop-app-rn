import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createStackNavigator} from 'react-navigation-stack';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import CartScreen from '../screens/shop/CartScreen';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../constants/Colors';
import {Platform} from 'react-native';

const defaultOptions =  {
    headerStyle: {
        backgroundColor: Platform.OS==='android' || Platform.OS==='web' ? Colors.primary : ''
    },
    headerTitleStyle:{
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle:{
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS==='android' || Platform.OS==='web' ? 'white' : Colors.primary
}

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    navigationOptions:{
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS==='ios'? 'ios-cart' : 'md-cart'} size={23}
        color={drawerConfig.tintColor}/> 
    },
    defaultNavigationOptions:defaultOptions
});

const OrderNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    navigationOptions:{
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS==='ios'? 'ios-list' : 'md-list'} size={23}
        color={drawerConfig.tintColor}/> 
    },
    defaultNavigationOptions: defaultOptions})

    
const AdminNavigator = createStackNavigator({
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
}, {
    navigationOptions:{
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS==='ios'? 'ios-create' : 'md-create'} size={23}
        color={drawerConfig.tintColor}/> 
    },
    defaultNavigationOptions: defaultOptions})

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrderNavigator,
    Admin: AdminNavigator,
}, {contentOptions: {
    activeTintColor: Colors.primary
}})
export default createAppContainer(ShopNavigator)