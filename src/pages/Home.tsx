import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, Shield, Award, Send, Phone, Mail, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProjectGrid from '../components/ProjectGrid';
import { About3D, Team3D, Contact3D, Hero3D, Features3D, Projects3D, Testimonials3D } from '../components/ThreeElements';

const slides = [
  {
    title: "Elevate Your Lifestyle",
    subtitle: "Discover a curated collection of the world's most exclusive properties. Where architectural mastery meets unparalleled luxury.",
    cta: "View Properties",
    link: "/projects",
    highlight: "Lifestyle"
  },
  {
    title: "Urban Sophistication",
    subtitle: "Experience the pulse of the city from the comfort of your private sanctuary. Iconic skylines, redefined.",
    cta: "Explore Penthouses",
    link: "/projects?filter=Penthouse",
    highlight: "Sophistication"
  },
  {
    title: "Timeless Elegance",
    subtitle: "Invest in a legacy. Our portfolio features properties that stand the test of time and trends.",
    cta: "Our Legacy",
    link: "/about",
    highlight: "Elegance"
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -60 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative overflow-hidden">
      
      {/* Hero Section with Slider */}
      <section className="relative h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <Hero3D />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/20 to-neutral-950 z-0" />
        
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 w-full px-4 md:px-0 z-20 pointer-events-none">
             <button 
                onClick={prevSlide} 
                className="pointer-events-auto p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all backdrop-blur-md text-white/70 hover:text-white"
             >
                <ChevronLeft className="w-8 h-8" />
             </button>
             <button 
                onClick={nextSlide} 
                className="pointer-events-auto p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all backdrop-blur-md text-white/70 hover:text-white"
             >
                <ChevronRight className="w-8 h-8" />
             </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              className="text-center max-w-4xl mx-auto"
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.h1 
                variants={fadeInUp}
                className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-12 tracking-tight drop-shadow-2xl leading-tight"
              >
                {slides[currentSlide].title.split(slides[currentSlide].highlight)[0]}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500">
                  {slides[currentSlide].highlight}
                </span>
                {slides[currentSlide].title.split(slides[currentSlide].highlight)[1]}
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-xl md:text-2xl text-neutral-100 mb-10 max-w-2xl mx-auto font-light drop-shadow-lg h-[3em]"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  to={slides[currentSlide].link} 
                  className="px-8 py-4 bg-yellow-500 text-neutral-900 font-bold rounded-full hover:bg-yellow-400 transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-yellow-500/20"
                >
                  {slides[currentSlide].cta} <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  to="/contact" 
                  className="px-8 py-4 bg-black/30 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-all backdrop-blur-md"
                >
                  Contact Agent
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          
          {/* Slide Indicators */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-yellow-500 w-8' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Brief Section with 3D */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Redefining Luxury Real Estate</h2>
              <p className="text-neutral-400 text-lg mb-6 leading-relaxed">
                At LuxeEstate, we believe that a home is more than just a place to live—it's a statement of your achievements and a sanctuary for your future. With over two decades of experience in the ultra-luxury market, we connect discerning buyers with the world's most prestigious properties.
              </p>
              <Link to="/about" className="text-yellow-500 hover:text-yellow-400 font-medium flex items-center gap-2">
                Learn more about our legacy <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <div className="relative h-[400px] w-full bg-neutral-900/30 rounded-3xl border border-white/5 overflow-hidden">
               <About3D />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative z-10">
        <Features3D />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Star, title: "Exclusive Listings", desc: "Access to off-market properties available only to our private clientele." },
              { icon: Shield, title: "Secure Transactions", desc: "Bank-grade security and privacy for all your high-value asset transfers." },
              { icon: Award, title: "Award Winning", desc: "Recognized globally for excellence in luxury real estate services." }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-8 rounded-2xl bg-neutral-900/80 backdrop-blur-md border border-white/5 hover:border-yellow-500/30 transition-colors group"
              >
                <div className="w-14 h-14 bg-neutral-800/50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-500/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-yellow-500" />
                </div>
                <h3 className="text-2xl font-serif text-white mb-4">{feature.title}</h3>
                <p className="text-neutral-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Listing with Filters */}
      <section className="py-32 relative z-10">
        <Projects3D />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Featured Masterpieces</h2>
            <p className="text-neutral-400 max-w-md mx-auto">Handpicked properties that define the pinnacle of modern living.</p>
          </div>
          <ProjectGrid />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative z-10">
        <Testimonials3D />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-16 text-center">Client Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "James Wilson", role: "Tech Entrepreneur", text: "LuxeEstate found me a penthouse that wasn't even on the market. Their network is unmatched." },
              { name: "Sarah Jenkins", role: "Art Collector", text: "The attention to detail and understanding of architectural value made working with them a pleasure." },
              { name: "Michael Chen", role: "Investor", text: "Professional, discreet, and efficient. They handled my portfolio acquisition seamlessly." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-neutral-900/60 backdrop-blur-sm p-8 rounded-2xl border border-white/5 relative"
              >
                <div className="absolute -top-4 -left-4 text-6xl text-yellow-500/20 font-serif">"</div>
                <p className="text-neutral-300 mb-6 relative z-10 italic">{item.text}</p>
                <div>
                  <h4 className="text-white font-bold">{item.name}</h4>
                  <p className="text-yellow-500 text-sm">{item.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with 3D Background */}
      <section className="py-32 relative z-10 overflow-hidden">
        <Team3D />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-16 text-center">Meet Our Experts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group relative overflow-hidden rounded-xl bg-neutral-900 border border-white/5">
                <img 
                  src={`https://picsum.photos/seed/person${item}/400/500`} 
                  alt="Team Member" 
                  className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="p-4 text-center">
                  <h3 className="text-white font-serif text-lg">Agent Name {item}</h3>
                  <p className="text-yellow-500 text-sm">Senior Partner</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section with 3D */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral-900/80 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden relative">
            <Contact3D />
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 flex flex-col justify-center relative z-10">
                <h2 className="text-4xl font-serif text-white mb-6">Let's Discuss Your Vision</h2>
                <p className="text-neutral-400 mb-8">
                  Whether you're looking to buy, sell, or invest, our team is ready to provide you with exceptional service.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 text-neutral-300">
                    <Phone className="w-5 h-5 text-yellow-500" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-4 text-neutral-300">
                    <Mail className="w-5 h-5 text-yellow-500" />
                    <span>info@luxeestate.com</span>
                  </div>
                  <div className="flex items-center space-x-4 text-neutral-300">
                    <MapPin className="w-5 h-5 text-yellow-500" />
                    <span>Beverly Hills, CA 90210</span>
                  </div>
                </div>
              </div>
              
              <div className="p-12 bg-neutral-950/50 relative z-10">
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-2">Name</label>
                      <input type="text" className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-2">Phone</label>
                      <input type="tel" className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500" placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Email</label>
                    <input type="email" className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Message</label>
                    <textarea rows={4} className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500" placeholder="I'm interested in..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-yellow-500 text-neutral-900 font-bold py-4 rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2">
                    Send Message <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



