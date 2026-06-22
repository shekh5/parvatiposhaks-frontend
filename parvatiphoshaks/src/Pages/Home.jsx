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

        <TrustBanner />
      </main>
      
      <Footer />
    </div>
  );
}
