import { configureStore,combineReducers } from '@reduxjs/toolkit';
import productDetailsReducer from "./productReducer.js";
import UserReducer from './userReducer.js';
import cartReducer from './cartReducer.js';
import orderReducer from './orderReducer.js';





const reducer = combineReducers({
  products:productDetailsReducer,
  user:UserReducer,
  cart:cartReducer,
  order:orderReducer,


});

// let initialState = {
//     cart: {
//       cartItems: localStorage.getItem("cartItems")
//         ? JSON.parse(localStorage.getItem("cartItems"))
//         : [],
//       shippingInfo: localStorage.getItem("shippingInfo")
//         ? JSON.parse(localStorage.getItem("shippingInfo"))
//         : {},
//     },
//   };
  
  // need to implement into store as per github store


const store = configureStore({
  reducer,

});

export default store;
