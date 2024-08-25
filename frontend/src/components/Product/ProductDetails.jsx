// import React, { useEffect,useState,Fragment } from 'react';
// import Carousel from 'react-material-ui-carousel';
// import "./ProductDetails.css";
// import {useDispatch,useSelector} from 'react-redux';
// import {fetchProductsDetails} from "../../Redux/productReducer.js";
// //import { newReview } from '../../Redux/productReducer.js';
// import Loader from '../layouts/Loader/Loader.jsx';
// import ReviewCard from "./ReviweCard.jsx"
// import MetaData from '../layouts/MetaData.jsx'
// import { addItemsToCart } from '../../Redux/cartReducer.js'
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import Button from '@mui/material/Button';
// import Rating from '@mui/material/Rating';
// import { useParams } from 'react-router-dom';


// const ProductDetails = () => {
//     const dispatch = useDispatch();
//     const { id } = useParams(); // Use useParams to get product ID
//     const {product,loading} = useSelector((state)=>state.Products);
//     console.log(product)
//     //const  { success, error: reviewError } = useSelector((state)=>state.Products.review);  need to check

//     const options = {
//       size: "large",
//       value: product.ratings,
//       readOnly: true,
//       precision: 0.5,
//     };

//     const [quantity, setQuantity] = useState(1);
//     const [open, setOpen] = useState(false);
//     const [rating, setRating] = useState(0);
//     const [comment, setComment] = useState("");


//     useEffect(()=>{
//       dispatch(fetchProductsDetails(id))

//   },[dispatch,id]);


//     const increaseQuantity = () => {
//       if (product.Stock <= quantity) return;
  
//       const qty = quantity + 1;
//       setQuantity(qty);
//     };
  
//     const decreaseQuantity = () => {
//       if (1 >= quantity) return;
  
//       const qty = quantity - 1;
//       setQuantity(qty);
//     };


//     const addToCartHandler = () => {
//       dispatch(addItemsToCart(id, quantity));
//       //alert.success("Item Added To Cart");
//     };


//     const submitReviewToggle = () => {
//       open ? setOpen(false) : setOpen(true);
//     };
  
//     const reviewSubmitHandler = () => {
//       const myForm = new FormData();
  
//       myForm.set("rating", rating);
//       myForm.set("comment", comment);
//       myForm.set("productId", id);
  
//       dispatch(newReview(myForm));
  
//       setOpen(false);
//     };
  



//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <MetaData title={`${product.name} -- ECOMMERCE`} />
//           <div className="ProductDetails">
//             <div>
//               <Carousel>
//                 {product.image &&
//                   product.image.map((item, i) => (
//                     <img
//                       className="CarouselImage"
//                       key={i}
//                       src={item.url}
//                       alt={`${i} Slide`}
//                     />
//                   ))}
//               </Carousel>
//             </div>

//             <div>
//               <div className="detailsBlock-1">
//                 <h2>{product.name}</h2>
//                 <p>Product # {product._id}</p>
//               </div>
//               <div className="detailsBlock-2">
//                 <Rating {...options} />
//                 <span className="detailsBlock-2-span">
//                   {" "}
//                   ({product.numOfReviews} Reviews)
//                 </span>
//               </div>
//               <div className="detailsBlock-3">
//                 <h1>{`₹${product.price}`}</h1>
//                 <div className="detailsBlock-3-1">
//                   <div className="detailsBlock-3-1-1">
//                     <button onClick={decreaseQuantity}>-</button>
//                     <input readOnly type="number" value={quantity} />
//                     <button onClick={increaseQuantity}>+</button>
//                   </div>
//                   <button
//                     disabled={product.stock < 1 ? true : false}
//                     onClick={addToCartHandler}
//                   >
//                     Add to Cart
//                   </button>
//                 </div>

//                 <p>
//                   Status:
//                   <b className={product.stock < 1 ? "redColor" : "greenColor"}>
//                     {product.Stock < 1 ? "OutOfStock" : "InStock"}
//                   </b>
//                 </p>
//               </div>

//               <div className="detailsBlock-4">
//                 Description : <p>{product.description}</p>
//               </div>

//               <button onClick={submitReviewToggle} className="submitReview">
//                 Submit Review
//               </button>
//             </div>
//           </div>

//           <h3 className="reviewsHeading">REVIEWS</h3>

//           <Dialog
//             aria-labelledby="simple-dialog-title"
//             open={open}
//             onClose={submitReviewToggle}
//           >
//             <DialogTitle>Submit Review</DialogTitle>
//             <DialogContent className="submitDialog">
//               <Rating
//                 onChange={(e) => setRating(e.target.value)}
//                 value={rating}
//                 size="large"
//               />

//               <textarea
//                 className="submitDialogTextArea"
//                 cols="30"
//                 rows="5"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               ></textarea>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={submitReviewToggle} color="secondary">
//                 Cancel
//               </Button>
//               <Button onClick={reviewSubmitHandler} color="primary">
//                 Submit
//               </Button>
//             </DialogActions>
//           </Dialog>

//           {product.reviews && product.reviews[0] ? (
//             <div className="reviews">
//               {product.reviews &&
//                 product.reviews.map((review) => (
//                   <ReviewCard key={review._id} review={review} />
//                 ))}
//             </div>
//           ) : (
//             <p className="noReviews">No Reviews Yet</p>
//           )}
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default ProductDetails;





// import React, { useEffect, useState, Fragment } from 'react';
// import Carousel from 'react-material-ui-carousel';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProductsDetails } from "../../Redux/productReducer.js";
// import Loader from '../layouts/Loader/Loader.jsx';
// import ReviewCard from "./ReviweCard.jsx";
// import MetaData from '../layouts/MetaData.jsx';
// import { addItemsToCart } from '../../Redux/cartReducer.js';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import Button from '@mui/material/Button';
// import Rating from '@mui/material/Rating';
// import { useParams } from 'react-router-dom';
// import "./ProductDetails.css";

// const ProductDetails = () => {
//     const dispatch = useDispatch();
//     const { id } = useParams();
//     const { product, loading } = useSelector((state) => state.products); // Ensure state.products exists
//     console.log(product)

//     const options = {
//       size: "large",
//       value: product.ratings,
//       readOnly: true,
//       precision: 0.5,
//     };

//     const [quantity, setQuantity] = useState(1);
//     const [open, setOpen] = useState(false);
//     const [rating, setRating] = useState(0);
//     const [comment, setComment] = useState("");

//     useEffect(() => {
//         dispatch(fetchProductsDetails(id));
//     }, [dispatch, id]);

//     const increaseQuantity = () => {
//         if (product.stock <= quantity) return;
//         setQuantity(quantity + 1);
//     };

//     const decreaseQuantity = () => {
//         if (quantity <= 1) return;
//         setQuantity(quantity - 1);
//     };

//     const addToCartHandler = () => {
//         dispatch(addItemsToCart(id, quantity));
//     };

//     const submitReviewToggle = () => {
//         setOpen(!open);
//     };

//     const reviewSubmitHandler = () => {
//         const myForm = new FormData();
//         myForm.set("rating", rating);
//         myForm.set("comment", comment);
//         myForm.set("productId", id);
//         dispatch(newReview(myForm));
//         setOpen(false);
//     };

//     if (loading) return <Loader />;

//     if (!product) return <p>Product not found</p>;

//     return (
//         <Fragment>
//             <MetaData title={`${product.name} -- ECOMMERCE`} />
//             <div className="ProductDetails">
//                 <div>
//                     <Carousel>
//                         {product.image && product.image.map((item, i) => (
//                             <img className="CarouselImage" key={i} src={item.url} alt={`${i} Slide`} />
//                         ))}
//                     </Carousel>
//                 </div>
//                 <div>
//                     <div className="detailsBlock-1">
//                         <h2>{product.name}</h2>
//                         <p>Product # {product._id}</p>
//                     </div>
//                     <div className="detailsBlock-2">
//                         <Rating {...options} />
//                         <span className="detailsBlock-2-span">
//                             ({product.numOfReviews} Reviews)
//                         </span>
//                     </div>
//                     <div className="detailsBlock-3">
//                         <h1>{`₹${product.price}`}</h1>
//                         <div className="detailsBlock-3-1">
//                             <div className="detailsBlock-3-1-1">
//                                 <button onClick={decreaseQuantity}>-</button>
//                                 <input readOnly type="number" value={quantity} />
//                                 <button onClick={increaseQuantity}>+</button>
//                             </div>
//                             <button
//                                 disabled={product.stock < 1}
//                                 onClick={addToCartHandler}
//                             >
//                                 Add to Cart
//                             </button>
//                         </div>
//                         <p>
//                             Status:
//                             <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
//                                 {product.Stock < 1 ? "OutOfStock" : "InStock"}
//                             </b>
//                         </p>
//                     </div>
//                     <div className="detailsBlock-4">
//                         Description: <p>{product.description}</p>
//                     </div>
//                     <button onClick={submitReviewToggle} className="submitReview">
//                         Submit Review
//                     </button>
//                 </div>
//             </div>

//             <h3 className="reviewsHeading">REVIEWS</h3>

//             <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle}>
//                 <DialogTitle>Submit Review</DialogTitle>
//                 <DialogContent className="submitDialog">
//                     <Rating onChange={(e) => setRating(e.target.value)} value={rating} size="large" />
//                     <textarea
//                         className="submitDialogTextArea"
//                         cols="30"
//                         rows="5"
//                         value={comment}
//                         onChange={(e) => setComment(e.target.value)}
//                     ></textarea>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={submitReviewToggle} color="secondary">
//                         Cancel
//                     </Button>
//                     <Button onClick={reviewSubmitHandler} color="primary">
//                         Submit
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {product.reviews && product.reviews.length > 0 ? (
//                 <div className="reviews">
//                     {product.reviews.map((review) => (
//                         <ReviewCard key={review._id} review={review} />
//                     ))}
//                 </div>
//             ) : (
//                 <p className="noReviews">No Reviews Yet</p>
//             )}
//         </Fragment>
//     );
// };

// export default ProductDetails;



import React, { useEffect, useState, Fragment } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsDetails } from "../../Redux/productReducer.js";
import { newReview } from '../../Redux/productReducer.js';
import Loader from '../layouts/Loader/Loader.jsx';
import ReviewCard from "./ReviweCard.jsx";
import MetaData from '../layouts/MetaData.jsx';
import { addItemsToCart } from '../../Redux/cartReducer.js';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { useParams } from 'react-router-dom';
import "./ProductDetails.css";

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    
    // Make sure to access state correctly
    const { product, loading } = useSelector((state) => state.products.product || { product: null, loading: true });
    //const  { success, error: reviewError } = useSelector((state)=>state.Products.review);

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    useEffect(() => {
        dispatch(fetchProductsDetails(id));
    }, [dispatch, id]);

    const increaseQuantity = () => {
        if (product && product.stock <= quantity) return;
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity <= 1) return;
        setQuantity(quantity - 1);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
    };

    const submitReviewToggle = () => {
        setOpen(!open);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);
        dispatch(newReview(myForm));
        setOpen(false);
    };

    if (loading) return <Loader />;

    if (!product) return <p>Product not found</p>;

    const options = {
        size: "large",
        value: product.rating, // Fixed to match schema
        readOnly: true,
        precision: 0.5,
    };

    return (
        <Fragment>
            <MetaData title={`${product.name} -- ECOMMERCE`} />
            <div className="ProductDetails">
                <div>
                    <Carousel>
                        {product.image && product.image.map((item, i) => (
                            <img className="CarouselImage" key={i} src={item.url} alt={`${i} Slide`} />
                        ))}
                    </Carousel>
                </div>
                <div>
                    <div className="detailsBlock-1">
                        <h2>{product.name}</h2>
                        <p>Product # {product._id}</p>
                    </div>
                    <div className="detailsBlock-2">
                        <Rating {...options} />
                        <span className="detailsBlock-2-span">
                            ({product.numOfReviews} Reviews)
                        </span>
                    </div>
                    <div className="detailsBlock-3">
                        <h1>{`₹${product.price}`}</h1>
                        <div className="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                                <button onClick={decreaseQuantity}>-</button>
                                <input readOnly type="number" value={quantity} />
                                <button onClick={increaseQuantity}>+</button>
                            </div>
                            <button
                                disabled={product.stock < 1}
                                onClick={addToCartHandler}
                            >
                                Add to Cart
                            </button>
                        </div>
                        <p>
                            Status:
                            <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                {product.stock < 1 ? "OutOfStock" : "InStock"}
                            </b>
                        </p>
                    </div>
                    <div className="detailsBlock-4">
                        Description: <p>{product.description}</p>
                    </div>
                    <button onClick={submitReviewToggle} className="submitReview">
                        Submit Review
                    </button>
                </div>
            </div>

            <h3 className="reviewsHeading">REVIEWS</h3>

            <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle}>
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submitDialog">
                    <Rating onChange={(e) => setRating(e.target.value)} value={rating} size="large" />
                    <textarea
                        className="submitDialogTextArea"
                        cols="30"
                        rows="5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </DialogContent>
                <DialogActions>
                    <Button onClick={submitReviewToggle} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={reviewSubmitHandler} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

            {product.reviews && product.reviews.length > 0 ? (
                <div className="reviews">
                    {product.reviews.map((review) => (
                        <ReviewCard key={review._id} review={review} />
                    ))}
                </div>
            ) : (
                <p className="noReviews">No Reviews Yet</p>
            )}
        </Fragment>
    );
};

export default ProductDetails;





