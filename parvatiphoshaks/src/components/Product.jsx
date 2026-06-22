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
      toast.error('Item is out of stock', { position: 'top-center', autoClose: 3000 });
      return;
    }

    dispatch(addToCart({
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.Image?.[0]?.url || 'placeholder.jpg',
      stock: product.Stock,
      quantity: 1,
    }));
    toast.success('Item added to cart', { position: 'top-center', autoClose: 3000 });
  };

  return (
    <Link to={`/product/${product._id}`} className="group relative block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative h-80 overflow-hidden bg-gray-50">
        <img
          src={product.Image?.[0]?.url || 'placeholder.jpg'}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        {product.Stock < 1 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Out of Stock</div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-serif text-brand-blue font-semibold mb-2 line-clamp-1 group-hover:text-brand-pink transition-colors">{product.name}</h3>
        <div className="flex items-center mb-3">
          <Rating value={product.ratings} disable={true} />
          <span className="text-xs text-gray-500 ml-2">({product.noOfreviews || product.numOfReviews || 0} reviews)</span>
        </div>
        
        <div className="flex items-center justify-between mt-4 border-t border-gray-100 pt-4">
          <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
          <button 
            onClick={addToCartHandler}
            className="bg-brand-blue hover:bg-brand-pink text-white w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-300 transform active:scale-95 shadow-md"
            aria-label="Add to cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}
