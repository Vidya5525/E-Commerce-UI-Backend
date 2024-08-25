import React, { useEffect,Fragment } from 'react'
import { PiMouseMiddleClickThin } from "react-icons/pi";
import MetaData from '../layouts/MetaData.jsx';
import {useSelector , useDispatch} from "react-redux";
import { fetchProducts } from '../../Redux/productReducer';
import "./Home.css"
import ProductCard from './ProductCard.jsx';
import Loader from '../layouts/Loader/Loader.jsx';
// import Product from "./Product.jsx"

const Home = () => {
  const Dispatch = useDispatch();
  const { loading,data}  = useSelector((state) => state.products);
  console.log(data)


  useEffect(()=>{
    Dispatch(fetchProducts());

  },[Dispatch]);
 
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <PiMouseMiddleClickThin />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {data &&
              data.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
};

export default Home;