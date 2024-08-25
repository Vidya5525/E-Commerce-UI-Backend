import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000';

// user-login ---------------------------------------------------------------------------
// export const login = createAsyncThunk("login",async(email,password)=>{
//     const config = {headers:{"Content-Type":"application/json"}};
//     const {data} = await axios.post(`/api/v1/login`,email,password,config);
//     return data;
//  });

// user-login
export const login = createAsyncThunk("login", async ({ email, password }) => {
    console.log(email,password);
    const config = { headers: { "Content-Type": "application/json" } };
    try {
        const { data } = await axios.post(`/api/v1/login`, { email, password }, config);
        return data;
    } catch (error) {
        // You can also include better error handling here
        throw error;
    }
});

 // user-register ---------------------------------------------------------------------------
// export const registerUser = createAsyncThunk("registerUser",async({userData})=>{
//     console.log(userData);
//     const config = {
//         headers: {
//           "Content-Type": "multipart/form-data" // Corrected the typo here
//         }
//       };
//       const { data } = await axios.post(`/api/v1/register`, {userData}, config);
//     return data;
//  });

export const registerUser = createAsyncThunk("registerUser", async (userData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };
        
        // Post the FormData directly, not wrapped in an object
        const  data  = await axios.post(`/api/v1/register`, userData, config);
        return data;
    } catch (error) {
        // Return a rejected action with the error message
        return rejectWithValue(error.response.data.message);
    }
});

 // load-user  ---------------------------------------------------------------------------
export const loadUser = createAsyncThunk("loadUser",async()=>{
    const {data} = await axios.post(`/api/v1/me`);
    return data;
 });

   // logOut-user  ---------------------------------------------------------------------------
export const logout = createAsyncThunk("logout",async()=>{
    await axios.post(`/api/v1/logout`);
 });

// user-profile-success ---------------------------------------------------------------------------
export const updateProfile = createAsyncThunk("updateProfile",async(userData)=>{
    const config = {headers:{"Content-Type":"multipart/form-date"}};
    const {data} = await axios.put(`/api/v1/me/update`,userData,config);
    return data;
 });

 // update-password ---------------------------------------------------------------------------
export const updatePassword = createAsyncThunk("updatePassword",async(passwords)=>{
    const config = {headers:{"Content-Type":"application/json"}};
    const {data} = await axios.put(`/api/v1/password/update`,passwords,config);
    return data;
 });

 // forgot-password ---------------------------------------------------------------------------
 export const forgotPassword = createAsyncThunk("forgotPassword",async(email)=>{
    const config = {headers:{"Content-Type":"application/json"}};
    const {data} = await axios.post(`/api/v1/password/forgot`,email,config);
    return data;
 });



 // get-all-users  --ADMIN-------------------------------------------------------------------------
 export const getAllUsers = createAsyncThunk("getAllUsers",async()=>{
    const { data } = await axios.get(`/api/v1/admin/users`);
    return data;
 });


 // get-user-details  --ADMIN-------------------------------------------------------------------------
 export const getUserDetails = createAsyncThunk("getUserDetails",async(id)=>{
    const { data } = await axios.get(`/api/v1/admin/user/${id}`);
    return data;
 });


 // update-user  --ADMIN-------------------------------------------------------------------------
//  export const updateUser = createAsyncThunk("updateUser",async(id, userData)=>{
//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.put(
//       `/api/v1/admin/user/${id}`,
//       userData,
//       config
//     );
//     return data;
//  });

// update-user --ADMIN
export const updateUser = createAsyncThunk("updateUser", async ({ id, userData }) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, config);
    return data;
});


 // delete-user  --ADMIN-------------------------------------------------------------------------
 export const deleteUser = createAsyncThunk("deleteUser",async(id)=>{
    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
    return data;
 });


const userReducer = createSlice({
    name:"user",
    initialState:{
        user:null,
        users:[],
        loading:false,
        error: null,
        isAuthenticated:false,
        isUpdated:false,
        isDeleted: false,
        message:null,
    },
    reducers:{

        resetState:(state)=>{
            return initialState;
        },

        clearError:(state)=>{
            return{
                initialState,
                error : null,
            }
        },
    },
    extraReducers:(builder)=>{
        builder

        //----login-------

        .addCase(login.pending, (state) => {
            state.loading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        })

        //---register-user-----

        .addCase(registerUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        })

        //----loaduser----

        .addCase(loadUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        })
        .addCase(loadUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.error = action.payload.message;
        })

        //----logout----

        .addCase(logout.pending, (state) => {
            state.loading = true;
        })
        .addCase(logout.fulfilled, (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase(logout.rejected, (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        })

        //----update-profile----

        .addCase(updateProfile.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateProfile.fulfilled, (state,action) => {
            state.user = action.payload;
            state.isUpdated = true;
        })
        .addCase(updateProfile.rejected, (state,action) => {
            state.isUpdated = false;
            state.error = action.payload.message;
        })

        //----update-password----

        .addCase(updatePassword.pending, (state) => {
            state.loading = true;
        })
        .addCase(updatePassword.fulfilled, (state,action) => {
            state.user = action.payload;
            state.isUpdated = true;
        })
        .addCase(updatePassword.rejected, (state,action) => {
            state.isUpdated = false;
            state.error = action.payload.message;
        })

        //----forgot-password----

        .addCase(forgotPassword.pending, (state) => {
            state.loading = true;
        })
        .addCase(forgotPassword.fulfilled, (state,action) => {
            state.user = action.payload;
            state.isUpdated = true;
        })
        .addCase(forgotPassword.rejected, (state,action) => {
            state.isUpdated = false;
            state.error = action.payload.message;
        })

              //admin

        .addCase(getAllUsers.pending, (state) => {
            state.loading = true;
        })
        .addCase(getAllUsers.fulfilled, (state,action) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(getAllUsers.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
        })


        .addCase(getUserDetails.pending, (state) => {
            state.loading = true;
        })
        .addCase(getUserDetails.fulfilled, (state,action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(getUserDetails.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
        })


        .addCase(updateUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateUser.fulfilled, (state,action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        })
        .addCase(updateUser.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
        })
        


        .addCase(deleteUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteUser.fulfilled, (state,action) => {
            state.loading = false;
            state.isDeleted = action.payload.success;
            state.message = action.payload.message;
        })
        .addCase(deleteUser.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
        })



        

    },   
    // reducers:{
        // logginSuccess:(state,action)=>{
        //   state.user = action.payload;
        //   state.isAuthenticated = true;
        // },
        // setlogginStatus:(state,action)=>{
        //     state.status = action.payload;
        // },
        // loginFail:(state,action)=>{
        //     state.user = null;
        //     state.isAuthenticated = false;
        // },

        // registerSuccess:(state,action)=>{
        //     state.user = action.payload;
        //     state.isAuthenticated = true;
        // },
        // setStatusRegister:(state,action)=>{
        //     state.status = action.payload;
        // },
        // registerFail:(state,action)=>{
        //     state.user = null;
        //     state.isAuthenticated = false;
        // },

        // lordUser:(state,action)=>{
        //     state.user = action.payload;
        //     state.isAuthenticated = true;
        // },
        // setStatusLoad:(state,action)=>{
        //     state.status = action.payload;
        // },
        // lordUserFail:(state,action)=>{
        //     state.user = null;
        //     state.isAuthenticated = false;
        // },

    //     logoutSuccess:(state,action)=>{
    //         state.user = null;
    //         state.isAuthenticated = false;
    //     },
    //     setStatusLogout:(state,action)=>{
    //         state.status = action.payload;
    //     },


    // }
});


 //Login User


// export function loginUserDetails(email,password){
//     return async function fetchUserThunk(dispatch,getState){
//         dispatch(setStatus(STATUES.LOADING));
//         try{
//             const config = {headers:{"Content-Type":"application/json"}};
//             const {data} = await axios.post(`/api/v1/login`,{email,password},config);
//             dispatch(logginSuccess(data));
//             dispatch(setlogginStatus(STATUES.IDLE));

            
//         }catch(err){

//             dispatch(loginFail());
//             dispatch(setStatus(STATUES.ERROR));
            


//         }
//     }
// }


 // Register user

// export function registerUserDetails(userData){
//     return async function fetchUserThunk(dispatch,getState){
//         dispatch(setStatusRegister(STATUES.LOADING));
//         try{
//             const config = {headers:{"Content-Type":"multipart/from-data"}};
//             const {data} = await axios.post(`/api/v1/register`,{userData},config);
//             dispatch(registerSuccess(data));
//             dispatch(setStatusRegister(STATUES.IDLE));

            
//         }catch(err){
            
//             dispatch(registerFail());
//             dispatch(setStatusRegister(STATUES.ERROR));
            


//         }
//     }
// }


// Lord user  like refresh page but still user login

// export function lordUserDetails(){
//     return async function fetchUserThunk(dispatch,getState){
//         dispatch(setStatusLoad(STATUES.LOADING));
//         try{
//             const {data} = await axios.post(`/api/v1/me`);
//             dispatch(lordUser(data));
//             dispatch(setStatusLoad(STATUES.IDLE));

            
//         }catch(err){
            
//             dispatch(lordUserFail());
//             dispatch(setStatusLoad(STATUES.ERROR));
            


//         }
//     }
// }


// Logout user

// export function logoutUser(){
//     return async function fetchUserThunk(dispatch,getState){
//         dispatch(setStatusLogout(STATUES.LOADING));
//         try{
//             await axios.post(`/api/v1/logout`);
//             dispatch(logoutSuccess());
//             dispatch(setStatusLogout(STATUES.IDLE));

            
//         }catch(err){
            
//             dispatch(setStatusLogout(STATUES.ERROR));
            


//         }
//     }
// }
export const {resetState,clearError} = userReducer.actions;
export default userReducer.reducer ;