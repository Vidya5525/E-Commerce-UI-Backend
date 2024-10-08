import React from 'react'
import "./App.css"
import Header from "./components/layouts/Header/Header.jsx"
import Footer from "./components/layouts/Footer/Footer.jsx"
import Home from "./components/Home/Home.jsx"
import Products from "./components/Product/Products.jsx"

import ProductDetails from "./components/Product/ProductDetails.jsx"
import Profile from "./components/User/Profile.jsx"
import { BrowserRouter as Router } from "react-router-dom";
import {Route, Routes } from "react-router-dom"
//import store from './Redux/store.js';
import { useSelector } from "react-redux";
//import { useEffect } from 'react'
//import  loadUser  from './Redux/userReducer.js';
import ProtectedRoute from './components/Route/ProtectedRoute.jsx'
import UpdateProfile from './components/User/UpdateProfile.jsx'
import LoginSignUp from './components/User/LoginSignUp.jsx'
import UpdatePassword from './components/User/UpdatePassword.jsx'
import ForgotPassword from './components/User/ForgotPassword.jsx'
import Cart from "./components/Cart/Cart.jsx"
import Shipping from "./components/Cart/Shipping.jsx"
import ConfirmOrder from "./components/Cart/ConfirmOrder.jsx"
import OrderSuccess from "./components/Cart/OrderSuccess.jsx"
import MyOrders from "./components/Order/MyOrders.jsx"
import OrderDetails from "./components/Order/OrderDetails.jsx"
import Dashboard from "./components/Admin/Dashboard.jsx"
import ProductList from "./components/Admin/ProductList.jsx"
import NewProduct from './components/Admin/NewProduct.jsx'
import UpdateProduct from "./components/Admin/UpdateProduct.jsx"
import OrderList from "./components/Admin/OrderList.jsx"
import ProcessOrder from "./components/Admin/ProcessOrder.jsx"
import UsersList from "./components/Admin/UsersList.jsx"
import UpdateUser from "./components/Admin/UpdateUser.jsx"
import ProductReviews from "./components/Admin/ProductReviews.jsx"
import Search from "./components/Product/Search.jsx"
import Contact from "./components/layouts/Contact/Contact.jsx"
import About from "./components/layouts/About/About.jsx"
import UserOptions from "./components/layouts/Header/UserOptions.jsx"
//import NotFound from "./components/layouts/Not Found/NotFound.jsx";



const App = () => {

   const { isAuthenticated, user } = useSelector((state) => state.user);

  // useEffect(()=>{
  //   store.dispatch(loadUser());
  // },[]);

  //window.addEventListener("contextmenu", (e) => e.preventDefault());


  return (
    <>
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user}/>}
      <Routes>
      <Route  path="/" element={<Home/>}/>
      <Route  path="/products" element={<Products/>} />

      <Route  path="/product/:id" element={<ProductDetails/>} />
      <Route  path="/products/:keyword" element={<Products/>} />
      <Route  path="/search" element={<Search/>} />
      <Route  path="/contact" element={<Contact/>} />
      <Route  path="/about" element={<About/>} />
      <Route  path="/account" element={<ProtectedRoute component={Profile}/>}/>
      <Route  path="/me/update" element={<ProtectedRoute component={UpdateProfile}></ProtectedRoute>}  />
      <Route  path="/password/update" element={<ProtectedRoute component={UpdatePassword}></ProtectedRoute>}  />
      <Route  path="/password/forgot" element={<ForgotPassword/>} />
      <Route  path="/login" element={<LoginSignUp/>}/>
      <Route  path="/cart" element={<Cart/>}/>
      <Route  path="/shipping" element={<ProtectedRoute component={Shipping}></ProtectedRoute>}  />
      <Route  path="/order/confirm" element={<ProtectedRoute component={ConfirmOrder}></ProtectedRoute>}  />
      <Route  path="/success" element={<ProtectedRoute component={OrderSuccess}></ProtectedRoute>}  />
      <Route  path="/orders" element={<ProtectedRoute component={MyOrders}></ProtectedRoute>}  />
      <Route  path="/order/:id" element={<ProtectedRoute component={OrderDetails}></ProtectedRoute>}  />

      <Route  path="/admin/dashboard" element={<ProtectedRoute isAdmin={true} component={Dashboard}></ProtectedRoute>} />
      <Route  path="/admin/products" element={<ProtectedRoute isAdmin={true} component={ProductList}></ProtectedRoute>} />
      <Route  path="/admin/product" element={<ProtectedRoute isAdmin={true} component={NewProduct}></ProtectedRoute>} />
      <Route  path="/admin/product/:id" element={<ProtectedRoute isAdmin={true} component={UpdateProduct}></ProtectedRoute>} />
      <Route  path="/admin/orders" element={<ProtectedRoute isAdmin={true} component={OrderList}></ProtectedRoute>}/>
      <Route  path="/admin/order/:id" element={<ProtectedRoute isAdmin={true} component={ProcessOrder}></ProtectedRoute>} />
      <Route  path="/admin/users" element={<ProtectedRoute isAdmin={true} component={UsersList}></ProtectedRoute>} />
      <Route  path="/admin/user/:id" element={<ProtectedRoute isAdmin={true} component={UpdateUser}></ProtectedRoute>} />
      <Route  path="/admin/reviews" element={<ProtectedRoute isAdmin={true} component={ProductReviews}></ProtectedRoute>} />
      </Routes>
     
      <Footer/>      
    </Router>
    
    </>
  );
};

export default App;






