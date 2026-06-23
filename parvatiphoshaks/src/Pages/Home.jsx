import { Footer } from '../components/Footer.jsx';
import { Navbar } from '../components/Navbar.jsx';
import { Hero } from '../components/Hero.jsx';
import { FeaturedCategories } from '../components/FeaturedCategories.jsx';
import { TrustBanner } from '../components/TrustBanner.jsx';
import { Product } from '../components/Product.jsx';
import { PageTitle } from '../components/PageTitle.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProduct, removeErrors } from '../features/products/productSlice.js';
import Loader from '../components/Loader.jsx';
import { toast } from 'react-toastify';

export function Home() {
  const { products, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct({ keyword: '' }));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: 'top-center' });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  return loading ? (
    <Loader />
  ) : (
    <div className="bg-brand-light min-h-screen flex flex-col font-sans">
      <PageTitle title="Home | Parvati Phoshaks" />
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <FeaturedCategories />
        
        <section className="py-20 bg-brand-light">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif text-brand-blue font-bold tracking-wide">Trending Collection</h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products && products.map((product, index) => (
                <Product product={product} key={index} />
              ))}
            </div>
          </div>
        </section>
        {/* Newsletter Section */}
        <section className="py-20 bg-brand-pink text-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-4xl font-serif font-bold tracking-wide mb-4">Join Our Heritage</h2>
            <p className="text-white/90 max-w-xl mx-auto mb-8 font-light text-lg">
              Subscribe to our newsletter to receive exclusive offers, new arrival alerts, and style inspiration directly to your inbox.
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 justify-center" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required
                className="flex-grow bg-white text-gray-800 px-6 py-3 rounded-full focus:outline-none focus:ring-4 focus:ring-brand-gold/50 transition-all"
              />
              <button type="submit" className="bg-brand-gold hover:bg-yellow-500 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-md">
                Subscribe
              </button>
            </form>
          </div>
        </section>

        <TrustBanner />
      </main>
      
      <Footer />
    </div>
  );
}
