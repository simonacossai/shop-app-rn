export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = productId=>{
    return{type: DELETE_PRODUCT, pid: productId};
}

export const createProduct = (title,imageUrl, price,description)=>{
    return async dispatch =>{
        //any async code you want 
      const response= await fetch('https://shop-app-bff56-default-rtdb.europe-west1.firebasedatabase.app/products.json', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title,description, imageUrl, price})
        });
        const resData = await response.json();
        console.log(resData);
        dispatch({
            type: CREATE_PRODUCT, 
            productData: {title, imageUrl,price, description}
        });
    }
}

export const updateProduct= (id, title, imageUrl, description)=>{
    return {type: UPDATE_PRODUCT,
    pid: id, 
    productData: {title, imageUrl, description}
    }
}