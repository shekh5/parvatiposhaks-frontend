import { Navbar } from '../components/Navbar.jsx';
import { Footer } from '../components/Footer.jsx';
import { PageTitle } from '../components/PageTitle.jsx';
import { MailOutline, Phone, LocationOn } from '@mui/icons-material';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    alert("Thank you for your message! We will get back to you soon.");
  };

  return (
    <div className="bg-brand-light min-h-screen flex flex-col font-sans">
      <PageTitle title="Contact Us | Parvati Phoshaks" />
      <Navbar />
      
      <main className="flex-grow">
        {/* Contact Header */}
        <section className="bg-brand-blue py-20">
          <div className="container mx-auto px-4 lg:px-8 text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl text-white font-serif font-bold tracking-wide mb-4">Get in Touch</h1>
            <p className="text-brand-light/90 max-w-2xl mx-auto text-lg font-light">
              We'd love to hear from you. Whether you have a question about our traditional collections, pricing, or anything else, our team is ready to answer all your questions.
            </p>
          </div>
        </section>

        {/* Contact Form & Details */}
        <section className="py-16 -mt-10">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-2xl shadow-xl overflow-hidden glass-panel relative z-10">
              
              {/* Contact Information */}
              <div className="lg:w-1/3 bg-brand-blue p-10 text-white flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-serif mb-6 text-brand-gold">Contact Info</h3>
                  <p className="text-brand-light/80 mb-10 font-light">
                    Fill up the form and our team will get back to you within 24 hours.
                  </p>
                  
                  <div className="space-y-8">
                    <div className="flex items-start space-x-4">
                      <Phone className="text-brand-gold mt-1" />
                      <div>
                        <h4 className="font-semibold text-lg">Phone</h4>
                        <p className="text-brand-light/80">+91 63781 62057</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <MailOutline className="text-brand-gold mt-1" />
                      <div>
                        <h4 className="font-semibold text-lg">Email</h4>
                        <p className="text-brand-light/80">support@parvatiphoshaks.com</p>
                        <p className="text-brand-light/80">info@parvatiphoshaks.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <LocationOn className="text-brand-gold mt-1" />
                      <div>
                        <h4 className="font-semibold text-lg">Address</h4>
                        <p className="text-brand-light/80"></p>
                        <p className="text-brand-light/80">Jhotwara, Jaipur</p>
                        <p className="text-brand-light/80">Rajasthan, India 302001</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:w-2/3 p-10 lg:p-16">
                <h3 className="text-3xl font-serif text-brand-blue mb-8 font-bold tracking-wide">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 text-gray-800 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 text-gray-800 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="subject">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 text-gray-800 transition-colors"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="message">Message</label>
                    <textarea 
                      id="message" 
                      rows="5"
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 text-gray-800 transition-colors resize-none"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-primary w-full md:w-auto px-10">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
