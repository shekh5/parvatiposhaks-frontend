import { Link } from 'react-router-dom';

const categories = [
  { title: 'Sarees', image: 'https://images.unsplash.com/photo-1610189013589-3221b650059e?q=80&w=800&auto=format&fit=crop', link: '/products?category=Sarees' },
  { title: 'Lehengas', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop', link: '/products?category=Lehengas' },
  { title: 'Kurti Sets', image: 'https://images.unsplash.com/photo-1583391733975-39d2c6c06a37?q=80&w=800&auto=format&fit=crop', link: '/products?category=Kurti' },
];

export const FeaturedCategories = () => {
  return (
    <div className="py-16 bg-brand-light">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl md:text-4xl text-center mb-10 text-brand-blue font-bold tracking-wide">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <Link to={cat.link} key={idx} className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 block">
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-black/20 to-transparent flex items-end justify-center pb-8">
                <h3 className="text-white text-3xl font-serif font-semibold tracking-wider drop-shadow-md">{cat.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
