import AsyncStorage from '@react-native-async-storage/async-storage';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
let timer;
export const authenticate = (userId, token, expiryTime)=>{
    return dispatch=>{
        dispatch(setLogoutTimer(expiryTime))
        dispatch({type: AUTHENTICATE, userId: userId, token: token})
    }
}

export const signup=(email, password)=>{
    return async dispatch=>{
       const response = await  fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxvQFRloX46igOvFlKbp1fghp7rPyt7qE',{ 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password, returnSecureToken:true})
        })
        if(!response.ok){
            const errorResData= await response.json();
            const errorId =errorResData.error.message;
            let message = 'Something went wrong';
            if(errorId === 'EMAIL_EXISTS'){
                message = 'This email already exists!';
            }
            console.log(message)
           throw new Error(message);
        }
        const resData = await response.json();
        console.log(resData)
        dispatch(authenticate(resData.localId, resData.idToken, +resData.expiresIn * 1000));
        const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    }
}

export const login=(email, password)=>{
    return async dispatch=>{
       const response = await  fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxvQFRloX46igOvFlKbp1fghp7rPyt7qE',{ 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password, returnSecureToken:true})
        })
        if(!response.ok){
            const errorResData= await response.json();
            const errorId =errorResData.error.message;
            let message = 'Something went wrong';
            if(errorId === 'EMAIL_NOT_FOUND'){
                message = 'This email could not be found!';
            }else if(errorId === 'INVALID_PASSWORD'){
                message = 'Password is not valid! Try again';
            }
            console.log(message)
           throw new Error(message);
        }

        const resData = await response.json();
        console.log(resData)
        dispatch(authenticate(resData.localId, resData.idToken, +resData.expiresIn * 1000));
        const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    }
}

export const logout=()=>{
        clearLogoutTimer();
        AsyncStorage.removeItem('userData');
        return {type: LOGOUT};
}

const setLogoutTimer = expirationTime=>{
    return dispatch=>{
        timer = setTimeout(()=>{
            dispatch(logout());
        },expirationTime);
    }
}

const clearLogoutTimer = ()=>{
    if(timer){
        clearTimeout(timer);
    }
}

const saveDataToStorage= (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({token: token, userId: userId, expiryDate: expirationDate.toISOString()}))
}