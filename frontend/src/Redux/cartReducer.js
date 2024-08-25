import { createSlice} from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000';


const cartReducer = createSlice({
    name:"cart",
    initialState:{
        cartItems:[],
        shippingInfo: {},
    },    
    reducers:{
        addToCart:(state,action)=>{
          const item = action.payload;
          const isItemExist = state.cartItems.find(
            (i) => i.product === item.product
          );

          if (isItemExist) {
            return {
              ...state,
              cartItems: state.cartItems.map((i) =>
                i.product === isItemExist.product ? item : i
              ),
            };
          } else {
            return {
              ...state,
              cartItems: [...state.cartItems, item],
            };
          }
        },

        removeCart:(state,action)=>{
            return {
            ...state,
            cartItems: state.cartItems.filter((i) => i.product !== action.payload),
          };
        },

        shippingInfo:(state,action)=>{
            return {
                ...state,
                shippingInfo: action.payload,
              };
        }
    }
});

//ADD to Cart

export function addItemsToCart(id, quantity){
    return async function fetchUserThunk(dispatch,getState){
        const { data } = await axios.get(`/api/v1/product/${id}`);
            dispatch(addToCart({
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.Stock,
                quantity,
              }));

            localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    }
};

//REMOVE to Cart

export function removeItemsToCart(id){
    return async function fetchUserThunk(dispatch,getState){
        dispatch(removeCart(id))
        
          localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    }
};


//SHIPPING data

export function shippingToCart(data){
    return async function fetchUserThunk(dispatch){
        dispatch(shippingInfo(data))
        
        localStorage.setItem("shippingInfo", JSON.stringify(data));
        }
};

export const {addToCart,removeCart,shippingInfo} = cartReducer.actions;
export default cartReducer.reducer;