import { Phone, Email, LinkedIn, GitHub, YouTube, Instagram } from '@mui/icons-material';

export function Footer() {
  return (
    <footer className="bg-brand-blue text-white pt-16 pb-8 border-t-[6px] border-brand-pink mt-auto">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* About Section */}
          <div>
            <h3 className="text-3xl font-serif text-brand-gold mb-6 font-semibold">Parvati Phoshaks</h3>
            <p className="text-gray-300 font-light leading-relaxed">
              We are a premium provider of authentic Indian traditional ethnic wear, bringing the rich cultural heritage of festivities to your wardrobe. Quality, elegance, and tradition woven into every thread.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-serif text-brand-gold mb-6 font-semibold">Contact Us</h3>
            <div className="space-y-4 text-gray-300 font-light">
              <p className="flex items-center">
                <Phone fontSize="small" className="mr-3 text-brand-pink" />
                +91 6378162057
              </p>
              <p className="flex items-center">
                <Email fontSize="small" className="mr-3 text-brand-pink" />
                info@parvatiphoshaks.com
              </p>
            </div>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="text-xl font-serif text-brand-gold mb-6 font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/parvatiposhaks/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-pink hover:text-white transition-colors duration-300">
                <Instagram fontSize="small" />
              </a>
              <a href="https://www.linkedin.com/in/bhawani-singh-shekhawat7773/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-pink hover:text-white transition-colors duration-300">
                <LinkedIn fontSize="small" />
              </a>
              <a href="https://github.com/shekh5" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-pink hover:text-white transition-colors duration-300">
                <GitHub fontSize="small" />
              </a>
              <a href="https://www.youtube.com/channel/UCZVl6q42I5u75v94J8K5zQw" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-pink hover:text-white transition-colors duration-300">
                <YouTube fontSize="small" />
              </a>
            </div>
          </div>
          
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-400 font-light text-sm">
          <p>&copy; {new Date().getFullYear()} Parvati Phoshaks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
