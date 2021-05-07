import React, {useEffect, useCallback, useReducer} from 'react';
import {View, Text, StyleSheet, ScrollView, Platform, Alert, KeyboardAvoidingView} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import {useSelector, useDispatch} from 'react-redux';
import * as productsActions from '../../store/actions/products';
import Input from '../../components/UI/Input';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer=(state, action)=>{
    if(action.type === FORM_INPUT_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let formIsValid = true;
        for(const key in updatedValidities){
            formIsValid = formIsValid && updatedValidities[key];
        }
        return {
            formIsValid: formIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        }
    }
    return state;
}

const EditProductScreen=props=>{
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state=> state.products.userProducts.find(prod=>prod.id === prodId));
    const dispatch = useDispatch();

    const [formState, dispatchFormState]= useReducer(formReducer, {
        inputValues:{
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: '',
        }, inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        }, formIsValid: editedProduct ? true : false})

    const submitHandler=useCallback(()=>{
        if(!formState.formIsValid){
            Alert.alert('Wrong input!', 'Please check the errors in the form', [{text: 'Okay'}])
            return;
        }
        if(editedProduct){
            dispatch(productsActions.updateProduct(prodId, formState.inputValues.title, formState.inputValues.imageUrl, formState.inputValues.description));
        }else{
            dispatch(productsActions.createProduct(formState.inputValues.title, formState.inputValues.imageUrl, formState.inputValues.description, +formState.inputValues.price));
        }
    },[dispatch, prodId, formState]);

    useEffect(() => {
     props.navigation.setParams({submit: submitHandler});
    }, [submitHandler])

    const inputChangeHandler =useCallback((inputIdentifier, inputValue, inputValidity)=>{
        dispatchFormState({type: FORM_INPUT_UPDATE, value: inputValue, isValid: inputValidity, input: inputIdentifier});
    },[dispatchFormState]);

    return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} style={{flex: 1}}>
    <ScrollView>
    <View style={styles.form}>
    <Input keyboardType='default' autoCapitalize='sentences' id='title'
    label="Title" errorText="Please enter a valid title!" 
    returnKeyType='next' onInputChange={inputChangeHandler}
    initialValue={editedProduct ? editedProduct.title : ''} initiallyValid={!!editedProduct} required/>

    <Input keyboardType='default'  label="Image Url" errorText="Please enter a valid url!" returnKeyType='next'
    initialValue={editedProduct ? editedProduct.imageUrl : ''} initiallyValid={!!editedProduct} required id='imageUrl'
    onInputChange={inputChangeHandler}/>

    <Input keyboardType='decimal-pad' label="Price" id='price'
    errorText="Please enter a valid price!" required min={0} onInputChange={inputChangeHandler}/>

    <Input keyboardType='default' id='description' label="Description" errorText="Please enter a valid description!" returnKeyType='next'
     multiline numberOfLines={3} autoCapitalize='sentences' onInputChange={inputChangeHandler}
     initialValue={editedProduct ? editedProduct.description : ''} initiallyValid={!!editedProduct} required minLength={5}/>

    </View>
    </ScrollView>
    </KeyboardAvoidingView>
)}

EditProductScreen.navigationOptions=navData=>{
    const submitFn = navData.navigation.getParam('submit');

    return{
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight:  (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Save" iconName={Platform.OS==='android' ? 'md-checkmark' : 'ios-checkmark'}
            onPress={submitFn}/></HeaderButtons>)
    }
}

const styles = StyleSheet.create({
    form:{
        margin: 20,
    },
  
})

export default EditProductScreen