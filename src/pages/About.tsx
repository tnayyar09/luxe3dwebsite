import { motion } from 'motion/react';
import { CheckCircle, Users, Globe, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-8">
              Crafting <br />
              <span className="text-yellow-500">Legacies</span>
            </h1>
            <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
              Founded in 1995, LuxeEstate has established itself as the premier destination for luxury real estate. We don't just sell properties; we curate lifestyles for the world's most discerning individuals.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-4xl font-bold text-white mb-2">25+</h4>
                <p className="text-sm text-neutral-500 uppercase tracking-wider">Years of Excellence</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-white mb-2">$10B+</h4>
                <p className="text-sm text-neutral-500 uppercase tracking-wider">Property Sold</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full" />
            <img 
              src="https://picsum.photos/seed/architecture/800/1000" 
              alt="Modern Architecture" 
              className="relative z-10 rounded-3xl shadow-2xl border border-white/10"
            />
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Our Core Values</h2>
            <p className="text-neutral-400">The principles that guide our every interaction.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Client Centric", desc: "Your needs are our sole priority. We provide personalized service that goes beyond expectations." },
              { icon: Globe, title: "Global Reach", desc: "With offices in 15 countries, we connect buyers and sellers across the globe." },
              { icon: Award, title: "Excellence", desc: "We hold ourselves to the highest standards of integrity, professionalism, and quality." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-neutral-900 p-8 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-colors"
              >
                <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-6 text-yellow-500">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif text-white mb-4">{item.title}</h3>
                <p className="text-neutral-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-12 text-center">Meet The Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group relative overflow-hidden rounded-xl">
                <img 
                  src={`https://picsum.photos/seed/person${item}/400/500`} 
                  alt="Team Member" 
                  className="w-full h-96 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <h3 className="text-white font-serif text-xl">John Doe {item}</h3>
                  <p className="text-yellow-500 text-sm">Senior Broker</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
