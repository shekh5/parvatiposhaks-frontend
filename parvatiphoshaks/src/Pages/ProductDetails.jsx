import { PageTitle } from '../components/PageTitle.jsx';
import { Navbar } from '../components/Navbar.jsx';
import { Footer } from '../components/Footer.jsx';
import { Rating } from '../components/Rating.jsx';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, removeErrors } from '../features/products/productSlice.js';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader.jsx';
import { addToCart } from '../features/cart/cartSlice.js';
import { Add, Remove, ShoppingCart } from '@mui/icons-material';

function ProductDetails() {
  const [, setuserRating] = useState(0);
  const toastShown = useRef(false);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector((state) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
    return () => {
      dispatch(removeErrors());
      toastShown.current = false;
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (error && !toastShown.current) {
      toastShown.current = true;
      const errorMessage = typeof error === 'string' ? error : error?.message || 'An error occurred';
      toast.error(errorMessage, { position: 'top-center' });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  const handleRatingChange = (newRating) => setuserRating(newRating);

  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);
  const increaseQuantity = () => {
    if (product && product.Stock > quantity) setQuantity(quantity + 1);
  };

  const addToCartHandler = () => {
    if (!product || product.Stock < 1) {
      toast.error('Item is out of stock', { position: 'top-center' });
      return;
    }

    dispatch(addToCart({
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.Image?.[0]?.url || 'placeholder.jpg',
      stock: product.Stock,
      quantity,
    }));
    toast.success('Item added to cart', { position: 'top-center' });
  };

  if (loading) return <><Navbar /><Loader /><Footer /></>;

  if (error || !product) {
    return (
      <div className="flex flex-col min-h-screen">
        <PageTitle title={'Product Details'} />
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <h2 className="text-2xl text-red-500 font-serif">
            {typeof error === 'string' ? error : error?.message || 'Error fetching product details.'}
          </h2>
        </div>
        <Footer />
      </div>
    );
  }

  // Fallback for missing images
  const images = product.Image && product.Image.length > 0 ? product.Image : [{ url: 'placeholder.jpg' }];

  return (
    <div className="flex flex-col min-h-screen bg-brand-light font-sans">
      <PageTitle title={product?.name || 'Product Details'} />
      <Navbar />

      <main className="flex-grow container mx-auto px-4 lg:px-8 py-12">
        {/* Top Section: Image Gallery & Product Info */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 mb-12 flex flex-col lg:flex-row gap-12">
          
          {/* Image Gallery */}
          <div className="lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[500px] custom-scrollbar scrollbar-hide">
              {images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  className={`flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-brand-pink shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img.url} alt={`${product.name} thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            {/* Main Image */}
            <div className="flex-grow rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center h-[400px] md:h-[500px]">
              <img 
                src={images[activeImage].url} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-serif text-brand-blue font-bold mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-brand-light px-3 py-1 rounded-full">
                <Rating value={product.ratings} disable={true} />
              </div>
              <span className="text-gray-500 text-sm">
                ({product.noOfreviews} {product.noOfreviews === 1 ? 'Review' : 'Reviews'})
              </span>
            </div>

            <p className="text-4xl font-bold text-gray-900 mb-6">₹{product.price}</p>
            
            <div className="mb-8">
              <h3 className="text-sm uppercase tracking-wider text-gray-400 font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm uppercase tracking-wider text-gray-400 font-semibold">Status:</span>
              <div className={`px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 ${product.Stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                <span className={`w-2 h-2 rounded-full ${product.Stock > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                {product.Stock > 0 ? `In Stock (${product.Stock})` : 'Out of Stock'}
              </div>
            </div>

            {product.Stock > 0 && (
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                {/* Quantity */}
                <div className="flex items-center border border-gray-200 rounded-full bg-white h-14 w-36">
                  <button onClick={decreaseQuantity} className="w-1/3 flex justify-center items-center text-gray-500 hover:text-brand-pink transition-colors h-full"><Remove fontSize="small"/></button>
                  <span className="w-1/3 text-center font-bold text-lg">{quantity}</span>
                  <button onClick={increaseQuantity} className="w-1/3 flex justify-center items-center text-gray-500 hover:text-brand-pink transition-colors h-full"><Add fontSize="small"/></button>
                </div>

                {/* Add to Cart */}
                <button 
                  onClick={addToCartHandler}
                  className="flex-grow btn-primary flex justify-center items-center gap-2 h-14 text-lg"
                >
                  <ShoppingCart />
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Write a review */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sticky top-28">
              <h3 className="text-2xl font-serif text-brand-blue font-bold mb-6">Write a Review</h3>
              <form className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Rating</label>
                  <div className="bg-brand-light inline-flex px-4 py-2 rounded-full">
                    <Rating value={0} disabled={false} onRatingChange={handleRatingChange} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Your Review</label>
                  <textarea 
                    placeholder="Tell us what you loved about this product..." 
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 text-gray-700 min-h-[120px] resize-none"
                  ></textarea>
                </div>
                <button type="button" className="w-full bg-brand-blue hover:bg-brand-pink text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-md">
                  Submit Review
                </button>
              </form>
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-serif text-brand-blue font-bold mb-8">Customer Reviews</h3>
            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map((review, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue font-serif font-bold text-xl">
                          {review.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{review.name}</h4>
                          <Rating value={review.rating} disabled={true} />
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">Verified Buyer</span>
                    </div>
                    <p className="text-gray-600 italic leading-relaxed">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
                <div className="w-20 h-20 bg-brand-blue/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🌟</span>
                </div>
                <p className="text-xl font-serif text-brand-blue font-semibold mb-2">No Reviews Yet</p>
                <p className="text-gray-500">Be the first to review this elegant product and help others make a decision!</p>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProductDetails;
