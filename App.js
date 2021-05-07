import React, {useState} from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/order';
import ShopNavigator from './navigation/ShopNavigator';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import {composeWithDevTools} from 'redux-devtools-extension'
const fetchFonts=()=>{
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
}

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default function App() {
  const [dataLoaded, setDataLoaded]= useState(false);
  if(!dataLoaded){
    return <AppLoading startAsync={fetchFonts}
    onFinish={()=>setDataLoaded(true)}
    onError={(err)=>console.log(err)}/>
  }
  return (
  <Provider store={store}>
   <ShopNavigator/>
  </Provider>
  );
}

