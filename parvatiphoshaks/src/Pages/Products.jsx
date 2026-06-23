import { PageTitle } from '../components/PageTitle.jsx';
import { Navbar } from '../components/Navbar.jsx';
import { Footer } from '../components/Footer.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct, removeErrors } from '../features/products/productSlice.js';
import { Product } from '../components/Product.jsx';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { NoProducts } from '../components/NoProducts.jsx';
import { Pagination } from '../components/Pagination.jsx';

function Products() {
  const { loading, error, products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword');
  const category = searchParams.get('category');
  const pageFromUrl = parseInt(searchParams.get('page'), 10) || 1;
  
  const [currentPage, SetCurrentPage] = useState(pageFromUrl);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // General e-commerce categories as requested by user
  const categories = [
    'laptop', 'mobile', 'tv', 'headphones', 'camera', 'accessories', 
    'watches', 'clothing', 'footwear', 'books', 'furniture', 'home decor', 
    'kitchen appliances', 'sports equipment', 'outdoor gear', 'toys', 
    'gaming consoles', 'health and beauty products', 'automotive accessories', 'pet supplies'
  ];

  useEffect(() => {
    dispatch(getProduct({ keyword, page: currentPage, category }));
  }, [dispatch, keyword, currentPage, category]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: 'top-center' });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      SetCurrentPage(page);
      const newSearchParams = new URLSearchParams(location.search);
      if (page === 1) {
        newSearchParams.delete('page');
      } else {
        newSearchParams.set('page', page);
      }
      navigate(`?${newSearchParams.toString()}`);
      window.scrollTo(0, 0);
    }
  };

  const handleCategoryClick = (cat) => {
    const newSearchParams = new URLSearchParams(location.search);
    if (cat === category) {
      newSearchParams.delete('category'); // Toggle off if clicked again
    } else {
      newSearchParams.set('category', cat);
    }
    newSearchParams.delete('page');
    navigate(`?${newSearchParams.toString()}`);
    setIsMobileFiltersOpen(false);
  };

  return (
    <div className="bg-brand-light min-h-screen flex flex-col font-sans">
      <PageTitle title={keyword ? `Search: ${keyword}` : `All Products`} />
      <Navbar />

      <main className="flex-grow container mx-auto px-4 lg:px-8 py-10">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-brand-blue">
              {keyword ? `Search Results for "${keyword}"` : category ? `Category: ${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Products'}
            </h1>
            <p className="text-gray-500 mt-2">Explore our extensive collection of high-quality products.</p>
          </div>
          <button 
            className="md:hidden flex items-center space-x-2 text-brand-blue border border-brand-blue px-4 py-2 rounded-lg"
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span>Filters</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className={`md:w-1/4 lg:w-1/5 ${isMobileFiltersOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
              <h3 className="text-lg font-serif font-semibold text-brand-blue mb-4 border-b border-gray-100 pb-2">Categories</h3>
              <ul className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <li 
                  className={`cursor-pointer transition-colors px-3 py-2 rounded-lg ${!category ? 'bg-brand-blue/10 text-brand-blue font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => {
                     const newSearchParams = new URLSearchParams(location.search);
                     newSearchParams.delete('category');
                     newSearchParams.delete('page');
                     navigate(`?${newSearchParams.toString()}`);
                  }}
                >
                  All Categories
                </li>
                {categories.map((cat) => (
                  <li 
                    key={cat} 
                    className={`cursor-pointer transition-colors px-3 py-2 rounded-lg capitalize ${category === cat ? 'bg-brand-blue text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => handleCategoryClick(cat)}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <section className="md:w-3/4 lg:w-4/5">
            {loading ? (
              <div className="flex justify-center items-center h-64"><Loader /></div>
            ) : products && products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                  {products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </div>
                <div className="flex justify-center border-t border-gray-200 pt-8">
                  <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
                </div>
              </>
            ) : (
              <NoProducts keyword={keyword} />
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Products;
