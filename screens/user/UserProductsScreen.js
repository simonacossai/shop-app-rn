import React from 'react';
import {FlatList, Platform, Button, Alert} from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as ProductsAction from '../../store/actions/products';

const UserProductsScreen=props=>{
    const userProducts = useSelector(state=>state.products.userProducts);
    const dispatch = useDispatch();
    const editProductHandler=(id)=>{
        props.navigation.navigate('EditProduct', {productId:id});
    }
    const deleteHandler=(id)=>{
        Alert.alert('Are you sure?','Do you really want to delete this item?', 
        [{text: 'No', style: 'default'}, {text: 'Yes', style: 'destructive',
         onPress:()=>{dispatch(ProductsAction.deleteProduct(id))}}]);
    }
    return <FlatList data={userProducts} keyExtractor={item=>item.id} 
    renderItem={itemData=> <ProductItem image={itemData.item.imageUrl} title={itemData.item.title} price={itemData.item.price}
     onSelect={()=>{editProductHandler(itemData.item.id)}}>
        <Button title="Edit" onPress={()=>editProductHandler(itemData.item.id)} color={Colors.primary}/>
        <Button title="Delete" onPress={()=> deleteHandler(itemData.item.id)} color={Colors.primary} />
    </ProductItem>}/>
}


UserProductsScreen.navigationOptions=(navData)=>{
    return{
    headerTitle:'Your products',
    headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName={Platform.OS==='android'? 'md-menu' : 'ios-menu'}
        onPress={()=>{navData.navigation.toggleDrawer()}}/></HeaderButtons>),
    
    headerRight: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item title="Menu" iconName={Platform.OS==='android' ? 'md-create' : 'ios-create'}
    onPress={()=>{navData.navigation.navigate('EditProduct')}}/></HeaderButtons>)
    }
}

export default UserProductsScreen