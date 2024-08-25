// import React, { useState ,  useEffect,Fragment } from 'react';
// import {useSelector , useDispatch} from "react-redux";
// import {fetchProducts} from "../../Redux/productReducer";
// import ProductCard from '../Home/ProductCard.jsx';
// import Loader from '../layouts/Loader/Loader';
// import ReactPaginate from 'react-paginate';
// import Slider from '@mui/material/Slider';
// import Typography from '@mui/material/Typography';
// import MetaData from '../layouts/MetaData';
// import { useParams } from 'react-router-dom';
// import "./Products.css";


// const categories =[
//   "Laptop",
//   "Footwear",
//   "Bottom",
//   "Tops",
//   "Attire",
//   "Camera",
//   "SmartPhones",
// ];

// const Products = () => {
//     const dispatch = useDispatch();
//     const {data,productsCount,resultPerPage,loading,filteredProductsCount} = useSelector(state=>state.products);
//     console.log(data)

    
//     const [currentPage,setCurrentPage] = useState(1);
//     const [price, setprice] = useState([0,25000]);
//     const [category, setCategory] = useState("");
//     const [ratings, setRating] = useState(0);
//     const { keyword } = useParams();

//     let count = filteredProductsCount;


//     useEffect(()=>{
//       dispatch(fetchProducts({ keyword, currentPage, price, category, ratings }));
  
//     }, [dispatch, keyword, currentPage, price, category, ratings]);


//   const setCurrentPageNo =(e)=>{
//     setCurrentPage(e)
//   }

//   const priceHandler = (event , newPrice)=>{
//     setprice(newPrice)
//   }




//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <MetaData title="PRODUCTS -- ECOMMERCE" />
//           <h2 className="productsHeading">Products</h2>

//           <div className="products">
//               {data && data.length > 0 ? (
//                 data.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))
//            ) : (
//                  <p>No Products Found</p>
//           )}
//          </div>

//           {/* <div className="products">
//             {data &&
//               data.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//           </div> */}

//           <div className="filterBox">
//             <Typography>Price</Typography>
//             <Slider
//               value={price}
//               onChange={priceHandler}
//               valueLabelDisplay="auto"
//               aria-labelledby="range-slider"
//               min={0}
//               max={25000}
//             />

//             <Typography>Categories</Typography>
//             <ul className="categoryBox">
//               {categories.map((category) => (
//                 <li
//                   className="category-link"
//                   key={category}
//                   onClick={() => setCategory(category)}
//                 >
//                   {category}
//                 </li>
//               ))}
//             </ul>

//             <fieldset>
//               <Typography component="legend">Ratings Above</Typography>
//               <Slider
//                 value={ratings}
//                 onChange={(e, newRating) => {
//                   setRating(newRating);
//                 }}
//                 aria-labelledby="continuous-slider"
//                 valueLabelDisplay="auto"
//                 min={0}
//                 max={5}
//               />
//             </fieldset>
//           </div>
//           {resultPerPage < count && (
//             <div className="paginationBox">
//               <ReactPaginate
//                 activePage={currentPage}
//                 itemsCountPerPage={resultPerPage}
//                 totalItemsCount={productsCount}
//                 onChange={setCurrentPageNo}
//                 nextLabel="next >"
//                 previousLabel="< previous"
//                 firstPageText="1st"
//                 lastPageText="Last"
//                 itemClass="page-item"
//                 linkClass="page-link"
//                 activeClass="pageItemActive"
//                 activeLinkClass="pageLinkActive"
//               />
//             </div>
//           )}
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default Products;





import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../Redux/productReducer";
import ProductCard from '../Home/ProductCard.jsx';
import Loader from '../layouts/Loader/Loader';
import ReactPaginate from 'react-paginate';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import MetaData from '../layouts/MetaData';
import { useParams } from 'react-router-dom';
import "./Products.css";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const dispatch = useDispatch();
  const { data, productsCount, resultPerPage, loading, filteredProductsCount } = useSelector(state => state.products);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRating] = useState(0);
  const { keyword } = useParams();

  useEffect(() => {
    dispatch(fetchProducts({ keyword, currentPage, price, category, ratings }));
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e.selected + 1);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {data && data.length > 0 ? (
              data.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p>No Products Found</p>
            )}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => setRating(newRating)}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < filteredProductsCount && (
            <div className="paginationBox">
              <ReactPaginate
                previousLabel="< previous"
                nextLabel="next >"
                breakLabel="..."
                breakClassName="break-me"
                pageCount={Math.ceil(filteredProductsCount / resultPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={setCurrentPageNo}
                containerClassName="pagination"
                activeClassName="active"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
