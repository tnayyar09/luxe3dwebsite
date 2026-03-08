import { motion } from 'motion/react';
import ProjectGrid from '../components/ProjectGrid';
import { Hero3D } from '../components/ThreeElements';

export default function Projects() {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero/Header Section */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <Hero3D />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/50 via-neutral-950/50 to-neutral-950 z-0" />
        
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-2xl"
          >
            Our Portfolio
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl text-neutral-200 max-w-2xl mx-auto font-light drop-shadow-lg"
          >
            Explore our exclusive collection of premium properties tailored to your lifestyle.
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <ProjectGrid />
      </div>
    </div>
  );
}

