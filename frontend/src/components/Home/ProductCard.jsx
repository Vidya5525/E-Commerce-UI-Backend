import React from "react";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';

const ProductCard = ({ product }) => {

  // Define options for Rating component
  const options = {
    value: product.ratings || 0, // Default to 0 if no ratings
    readOnly: true,
    precision: 0.5,
  };

  // Check if images array exists and has at least one image
  const imageUrl = product.image && product.image.length > 0
    ? product.image[0].url
    : './logo.png'; // Fallback URL if no image available

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={imageUrl} alt={product.name || 'Product Image'} />
      <p>{product.name || 'Product Name'}</p>
      <div>
        <Rating {...options} />
        <span className="productCardSpan">
          ({product.numOfReviews || 0} Reviews)
        </span>
      </div>
      <span>{`₹${product.price || 'N/A'}`}</span>
    </Link>
  );
};







//   const options = {
//     value: product.ratings,
//     readOnly: true,
//     precision: 0.5,
//   };
//   return (
//     <Link className="productCard" to={`/product/${product._id}`}>
//       <img src={product.images[0].url} alt={product.name} />
//       <p>{product.name}</p>
//       <div>
//         <Rating {...options} />{" "}
//         <span className="productCardSpan">
//           {" "}
//           ({product.numOfReviews} Reviews)
//         </span>
//       </div>
//       <span>{`₹${product.price}`}</span>
//     </Link>
//   );
// };

export default ProductCard;