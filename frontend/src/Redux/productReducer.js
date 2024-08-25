import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000';

//fetch-All-Products--------------------------------------------------------------------------
// export const fetchProducts = createAsyncThunk("fetchProducts", async ({keyword ="",currentPage=1,price=[0,25000],category,ratings=0}) => {
//         let link =`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

//         if(category){
//             link =`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
//         }

//         const {data} = await axios.get(link);
//         return data;
// });



// export const fetchProducts = createAsyncThunk(
//     "fetchProducts",
//     async ({ keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0 }, { rejectWithValue }) => {
//       try {
//         let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
  
//         if (category) {
//           link += `&category=${category}`;
//         }
  
//         const { data } = await axios.get(link);
//         return data;
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         return rejectWithValue(error.response?.data || "An error occurred");
//       }
//     }
//   );


export const fetchProducts = createAsyncThunk(
    "fetchProducts",
    async (
      { rejectWithValue }
    ) => {
      try {
        let link = `/api/v1/products`
  
        const { data } = await axios.get(link);
        return data;
      } catch (error) {
        // Return a rejected action with a custom error message
        return rejectWithValue(error.response?.data || "Failed to fetch products");
      }
    }
  );


  






//fetch-Product-Details ---------------------------------------------------------------------------
//  export const fetchProductsDetails = createAsyncThunk("fetchProductsDetails",async(id)=>{
//     const {product} = await axios.get(`/api/v1/product/${id}`);
//     console.log(product)
//     return product;
//  });

export const fetchProductsDetails = createAsyncThunk("fetchProductsDetails", async (id) => {
    try {
      const response = await axios.get(`/api/v1/product/${id}`);
      console.log('API Response:', response.data);
      return response.data; // Directly return the product if no wrapper
    } catch (error) {
      console.error('Error fetching product details:', error);
      throw error;
    }
  });
  




 // New-Review-------------------------------------------------------------------------------------
 export const newReview = createAsyncThunk("newReview",async(reviewData)=>{
    const config = {
        headers: { "Content-Type": "application/json" },
      };
  
    const { review } = await axios.put(`/api/v1/review`, reviewData, config);
    return review;
 });


 // Get All Products For -- Admin
 export const getAdminProduct = createAsyncThunk("getAdminProduct",async()=>{
    const { data } = await axios.get("/api/v1/admin/products");
    return data;
 });

 // Create--Product -- Admin
 export const createProduct = createAsyncThunk("createProduct",async(productData)=>{
    const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(
        `/api/v1/admin/product/new`,
        productData,
        config
    );
    return data;
 });

 // Update--Product -- Admin
 export const updateProduct = createAsyncThunk("updateProduct",async(id, productData)=>{
    const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(
        `/api/v1/admin/product/${id}`,
        productData,
        config
      );
    return data;
 });


 // Delete--Product -- Admin
 export const deleteProduct = createAsyncThunk("deleteProduct",async(id)=>{
    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
    return data;
 });


 // Get-All-Reviews
 export const getAllReviews = createAsyncThunk("getAllReviews",async(id)=>{
    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
    return data;
 });


 // Delete-Reviews
 export const deleteReviews = createAsyncThunk("deleteReviews",async(reviewId, productId)=>{
    const { data } = await axios.delete(
        `/api/v1/reviews?id=${reviewId}&productId=${productId}`
      );
    return data;
 });


 



 //------------------------------------------------------------------------------------------------
  

 
const productsDetailsReducer = createSlice({
    name:"products",
    initialState:{
        data:[],
        productCount:null,
        resultPerPage:null,
        filteredProductsCount:null,
        loading: false,
        product:null,
        review:null,
        reviews:[],
        success:false,
        isUpdated:false,
        isDeleted: false,
        error: null,
      
        
        
    },
    reducers:{

        resetState:()=>{
            return initialState;
        },

        clearError:()=>{
            return{
                initialState,
                error : null,
            }
        },

    },
    extraReducers:(builder)=>{
        builder

        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.products;
            state.productCount = action.payload.productCount;
            state.resultPerPage = action.payload.resultPerPage;
            state.filteredProductsCount = action.payload.filteredProductsCount;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //--------------------

        .addCase(fetchProductsDetails.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchProductsDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
        })
        .addCase(fetchProductsDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //---------------------------

        .addCase(newReview.pending, (state) => {
            state.loading = true;
        })
        .addCase(newReview.fulfilled, (state, action) => {
            state.loading = false;
            state.review = action.payload;
        })
        .addCase(newReview.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //---------Admin----------
        .addCase(getAdminProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(getAdminProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(getAdminProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //--------------------------------------


        .addCase(createProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
            state.product = action.payload.data;
        })
        .addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //------------------------------------------


        .addCase(updateProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload.success;
            state.product = action.payload.data;
        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //-----------------------------------------------

        .addCase(deleteProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload.success;
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //--------------------------------------------------


        .addCase(getAllReviews.pending, (state) => {
            state.loading = true;
        })
        .addCase(getAllReviews.fulfilled, (state, action) => {
            state.loading = false;
            state.reviews = action.payload;
        })
        .addCase(getAllReviews.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //-------------------------------------------


        .addCase(deleteReviews.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteReviews.fulfilled, (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload.success;
        })
        .addCase(deleteReviews.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

    }   
    
});



export const {resetState,clearError} = productsDetailsReducer.actions;
export default productsDetailsReducer.reducer;