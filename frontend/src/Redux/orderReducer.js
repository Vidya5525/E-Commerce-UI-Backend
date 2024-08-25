import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000';

// create-order ---------------------------------------------------------------------------
export const createOrder = createAsyncThunk("createOrder",async(order)=>{
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
    };
    
    const { data } = await axios.post("/api/v1/order/new", order, config);
    return data;
 });

 // my-orders ---------------------------------------------------------------------------
export const myOrders = createAsyncThunk("myOrders",async()=>{      
    const {data} = await axios.get(`/api/v1/orders/me`);
    return data;
 });

  // get-order-details ---------------------------------------------------------------------------
export const getOrderDetails = createAsyncThunk("getOrderDetails",async(id)=>{      
    const { data } = await axios.get(`/api/v1/order/${id}`);
    return data;
 });


  // get-all-order --ADMIN-------------------------------------------------------------------------
  export const getAllOrders = createAsyncThunk("getAllOrders",async()=>{      
    const { data } = await axios.get("/api/v1/admin/orders");
    return data;
 });


  // update-order --ADMIN-------------------------------------------------------------------------
  export const updateOrder = createAsyncThunk("updateOrder",async(id, order)=>{      
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/v1/admin/order/${id}`,
        order,
        config
      );
    return data;
 });


  // delete-order --ADMIN-------------------------------------------------------------------------
  export const deleteOrder = createAsyncThunk("deleteOrder",async(id)=>{      
    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
    return data;
 });





const orderReducer = createSlice({
    name:"orders",
    initialState:{
        order:{},
        orders:[],
        loading:false,
        isUpdated:false,
        isDeleted: false,
        error:null,
    },
    reducers:{

        resetState: (state) => {
            state.order = {};
            state.orders = [];
            state.loading = false;
            state.isUpdated = false;
            state.isDeleted = false;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers:(builder)=>{
        builder

        //---create-order----

        .addCase(createOrder.pending, (state) => {
            state.loading = true;
        })
        .addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload;
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })

        //---my-order----

        .addCase(myOrders.pending, (state) => {
            state.loading = true;
        })
        .addCase(myOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        })
        .addCase(myOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })

        //---get-order-details----

        .addCase(getOrderDetails.pending, (state) => {
            state.loading = true;
        })
        .addCase(getOrderDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload;
        })
        .addCase(getOrderDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })



        .addCase(getAllOrders.pending, (state) => {
            state.loading = true;
        })
        .addCase(getAllOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        })
        .addCase(getAllOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })



        .addCase(updateOrder.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        })
        .addCase(updateOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        .addCase(deleteOrder.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        })
        .addCase(deleteOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    },        
   
});



 // reducers:{
    //     setOrders:(state,action)=>{
    //       state.orders = action.payload;
    //     },
    //     setOrderStatus:(state,action)=>{
    //         state.status = action.payload;
    //     },
      

    // },

// const newOrderReducer = createSlice({
//     name:"orders",
//     initialState:{
//         order:{},
//         status:STATUES.IDEL,
//     },    
//     reducers:{
//         createOrders:(state,action)=>{
//           state.order = action.payload;
//         },
//         createOrderStatus:(state,action)=>{
//             state.status = action.payload;
//         },
      

//     }
// });


// const orderDetailsReducer = createSlice({
//     name:"orders",
//     initialState:{
//         orders:{},
//         status:STATUES.IDEL,
//     },    
//     reducers:{
//         setOrdersDetails:(state,action)=>{
//           state.orders = action.payload;
//         },
//         setOrderDetailsStatus:(state,action)=>{
//             state.status = action.payload;
//         },
      

//     }

// });

//for create order need to making jsx page and send the order

// export function fetchCreateOrder(order){
//     return async function fetchProductThunk(dispatch,getState){
//         dispatch(createOrderStatus(STATUES.LOADING));
//         try{
//             const config = {
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//             };
            
//             const { data } = await axios.post("/api/v1/order/new", order, config);
          
//             dispatch(createOrders(data));
//             dispatch(createOrderStatus(STATUES.IDLE));

            
//         }catch(err){

//             dispatch(createOrderStatus(STATUES.ERROR));


//         }
//     }
// }




//for My order
// export function fetchMyOrder(){
//     return async function fetchProductThunk(dispatch,getState){
//         dispatch(setOrderStatus(STATUES.LOADING));
//         try{
//             const {data} = await axios.get(`/api/v1/orders/me`);
//             dispatch(setOrders(data));
//             dispatch(setOrderStatus(STATUES.IDLE));

            
//         }catch(err){

//             dispatch(setOrderStatus(STATUES.ERROR));


//         }
//     }
// }


//for details

// export function fetchOrdersDetails(id){
//     return async function fetchProductThunk(dispatch,getState){
//         dispatch(setOrderDetailsStatus(STATUES.LOADING));
//         try{
//             const { data } = await axios.get(`/api/v1/order/${id}`);
//             dispatch(setOrdersDetails(data));
//             dispatch(setOrderDetailsStatus(STATUES.IDLE));

            
//         }catch(err){

//             dispatch(setOrderDetailsStatus(STATUES.ERROR));


//         }
//     }
// }
export const {resetState,clearError} = orderReducer.actions;
export default orderReducer.reducer;