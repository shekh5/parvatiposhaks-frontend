import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/hero-banner.jpg')` }}
      >
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-16 flex items-center h-full">
        <div className="max-w-xl animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-6 drop-shadow-lg">
            Embrace Your <span className="text-brand-gold">Heritage</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 font-light drop-shadow-md">
            Discover our exclusive collection of vibrant, hand-crafted traditional attire that celebrates the joy of festivities.
          </p>
          <div className="flex space-x-4">
            <Link to="/products" className="btn-primary">
              Shop Now
            </Link>
            <Link to="/products?category=Festive" className="btn-outline border-white text-white hover:bg-white hover:text-brand-blue">
              New Arrivals
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
