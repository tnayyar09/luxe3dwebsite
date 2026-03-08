import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, Home, Building2, Users, Phone } from 'lucide-react';
import { useState } from 'react';
import BackgroundScene from './BackgroundScene';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Projects', path: '/projects', icon: Building2 },
    { name: 'About Us', path: '/about', icon: Users },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  return (
    <div className="min-h-screen flex flex-col text-white overflow-x-hidden relative">
      <BackgroundScene />
      
      <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <Building2 className="text-neutral-900" />
              </div>
              <span className="text-2xl font-serif font-bold tracking-wider text-yellow-500">LUXE<span className="text-white">ESTATE</span></span>
            </Link>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                      location.pathname === item.path
                        ? 'text-yellow-500'
                        : 'text-neutral-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 focus:outline-none"
              >
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-neutral-900 border-b border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.path
                      ? 'text-yellow-500 bg-neutral-800'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-700'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      <main className="flex-grow pt-20 relative z-10">
        {children}
      </main>

      <footer className="bg-neutral-900/90 backdrop-blur-md border-t border-white/10 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                  <Building2 className="text-neutral-900 w-5 h-5" />
                </div>
                <span className="text-xl font-serif font-bold tracking-wider text-yellow-500">LUXE<span className="text-white">ESTATE</span></span>
              </div>
              <p className="text-neutral-400 max-w-md">
                Redefining luxury living with architectural masterpieces designed for the modern elite. Experience the future of real estate.
              </p>
            </div>
            <div>
              <h3 className="text-white font-serif text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-neutral-400 hover:text-yellow-500 transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-serif text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-neutral-400">
                <li>123 Luxury Lane</li>
                <li>Beverly Hills, CA 90210</li>
                <li>+1 (555) 123-4567</li>
                <li>info@luxeestate.com</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-neutral-500 text-sm">
            © {new Date().getFullYear()} LuxeEstate. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

