import '../componentStyles/Product.css';
import { Link } from 'react-router-dom';
import { Rating } from './Rating';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice.js';
import { toast } from 'react-toastify';

export function Product({ product }) {
  const dispatch = useDispatch();

  const addToCartHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.Stock < 1) {
      toast.error('Item is out of stock', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.Image?.[0]?.url || 'placeholder.jpg',
        stock: product.Stock,
        quantity: 1,
      })
    );
    toast.success('Item added to cart', {
      position: 'top-center',
      autoClose: 3000,
    });
  };

  return (
    <>
      <Link to={`product/${product._id}`} className="product_id">
        <div className="product-card">
          <img
            src={product.Image?.[0]?.url || 'placeholder.jpg'}
            alt={product.name}
            className="product-image-card"
          />
          <div className="product-details">
            <h3 className="product-title">{product.name}</h3>
            <p className="home-price">
              <strong>Price</strong> {product.price}
            </p>
            <div className="rating-container">
              <Rating value={product.ratings} disable={true} />
            </div>
            <span className="productCardSpan">
              {product.noOfreviews}
              {product.numoFreviews === 1 ? ' Review' : ' Reviews'}
            </span>
            <button className="add-to-cart" onClick={addToCartHandler}>
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </>
  );
}
