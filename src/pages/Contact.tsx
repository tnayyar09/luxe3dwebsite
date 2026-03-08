import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Get in Touch</h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Ready to find your dream property? Our team of experts is here to guide you through every step of the journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-serif text-white mb-8">Contact Information</h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center border border-white/10 shrink-0">
                  <Phone className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Phone</h3>
                  <p className="text-neutral-400">+1 (555) 123-4567</p>
                  <p className="text-neutral-500 text-sm">Mon-Fri 9am-6pm EST</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center border border-white/10 shrink-0">
                  <Mail className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Email</h3>
                  <p className="text-neutral-400">info@luxeestate.com</p>
                  <p className="text-neutral-500 text-sm">24/7 Support</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center border border-white/10 shrink-0">
                  <MapPin className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Headquarters</h3>
                  <p className="text-neutral-400">123 Luxury Lane, Suite 100</p>
                  <p className="text-neutral-400">Beverly Hills, CA 90210</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-neutral-900 rounded-2xl border border-white/5">
              <h3 className="text-white font-serif mb-4">Global Presence</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-neutral-400">
                <span>• New York</span>
                <span>• London</span>
                <span>• Dubai</span>
                <span>• Paris</span>
                <span>• Tokyo</span>
                <span>• Singapore</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-neutral-900/50 backdrop-blur-md p-8 rounded-3xl border border-white/10"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">First Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Interest</label>
                <select className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors">
                  <option>Buying a Property</option>
                  <option>Selling a Property</option>
                  <option>Investment Inquiry</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-yellow-500 text-neutral-900 font-bold py-4 rounded-xl hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
