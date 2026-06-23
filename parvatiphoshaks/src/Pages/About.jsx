import { Navbar } from '../components/Navbar.jsx';
import { Footer } from '../components/Footer.jsx';
import { PageTitle } from '../components/PageTitle.jsx';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="bg-brand-light min-h-screen flex flex-col font-sans">
      <PageTitle title="About Us | Parvati Phoshaks" />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1583391733975-39d2c6c06a37?q=80&w=1200&auto=format&fit=crop')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 to-brand-blue/60"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-6 text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-serif text-white font-bold mb-4 drop-shadow-lg tracking-wide">Our Story</h1>
            <div className="w-24 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-brand-light">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1610189013589-3221b650059e?q=80&w=800&auto=format&fit=crop" 
                  alt="Traditional Craftsmanship" 
                  className="rounded-xl shadow-2xl w-full h-[600px] object-cover"
                />
              </div>
              
              <div className="lg:w-1/2 space-y-6">
                <h2 className="text-sm font-bold tracking-widest text-brand-pink uppercase">Heritage & Elegance</h2>
                <h3 className="text-4xl font-serif text-brand-blue font-bold leading-snug">
                  Preserving the legacy of traditional Indian attire.
                </h3>
                <p className="text-gray-700 font-light text-lg leading-relaxed">
                  Founded with a passion for preserving India's rich textile heritage, Parvati Phoshaks has been at the forefront of crafting exquisite ethnic wear for over two decades. We believe that every thread tells a story of culture, tradition, and timeless beauty.
                </p>
                <p className="text-gray-700 font-light text-lg leading-relaxed">
                  Our journey began in the vibrant streets of Rajasthan, working directly with local artisans who have honed their craft for generations. From intricately hand-woven sarees to majestic lehengas and comfortable kurtis, every piece in our collection is a testament to authentic Indian craftsmanship.
                </p>
                <p className="text-gray-700 font-light text-lg leading-relaxed mb-8">
                  We don't just sell clothes; we curate experiences that make you feel royalty on your special days. Embrace the festivities and celebrate your roots with Parvati Phoshaks.
                </p>
                
                <div className="pt-6 border-t border-gray-200">
                  <Link to="/products" className="btn-primary inline-block">
                    Explore Our Collection
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-brand-blue text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold tracking-wide mb-4 text-brand-gold">Our Core Values</h2>
              <p className="text-brand-light/80 max-w-2xl mx-auto font-light text-lg">The pillars that define the Parvati Phoshaks experience.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm border border-white/20 text-center transform hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-serif font-bold text-brand-blue">1</span>
                </div>
                <h4 className="text-2xl font-serif font-semibold mb-4 tracking-wide">Authenticity</h4>
                <p className="text-brand-light/80 font-light">We source genuine fabrics directly from the weaving clusters of India, ensuring 100% authenticity in every weave.</p>
              </div>
              
              <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm border border-white/20 text-center transform hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-serif font-bold text-brand-blue">2</span>
                </div>
                <h4 className="text-2xl font-serif font-semibold mb-4 tracking-wide">Quality Craftsmanship</h4>
                <p className="text-brand-light/80 font-light">Every garment undergoes rigorous quality checks to ensure flawless embroidery, durable stitching, and perfect fits.</p>
              </div>
              
              <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm border border-white/20 text-center transform hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-serif font-bold text-brand-blue">3</span>
                </div>
                <h4 className="text-2xl font-serif font-semibold mb-4 tracking-wide">Customer Delight</h4>
                <p className="text-brand-light/80 font-light">From premium packaging to dedicated support, we ensure your shopping experience is as luxurious as our attire.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
