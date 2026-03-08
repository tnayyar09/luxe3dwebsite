import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Bed, Bath, Square, ChevronLeft, ChevronRight, Filter, ArrowRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

export const projectsData = [
  {
    id: 1,
    title: "The Azure Estate",
    location: "Beverly Hills, CA",
    price: "$25,000,000",
    priceValue: 25000000,
    category: "Residential",
    status: "Ready to Move",
    image: "https://picsum.photos/seed/luxury1/800/600",
    beds: 6,
    baths: 8,
    sqft: "12,000",
    tags: ["Luxury", "Smart Homes", "Pool"]
  },
  {
    id: 2,
    title: "Skyline Penthouse",
    location: "New York, NY",
    price: "$18,500,000",
    priceValue: 18500000,
    category: "Penthouse",
    status: "Under Construction",
    image: "https://picsum.photos/seed/luxury2/800/600",
    beds: 4,
    baths: 5,
    sqft: "6,500",
    tags: ["Luxury", "City View", "Smart Homes"]
  },
  {
    id: 3,
    title: "Oceanview Villa",
    location: "Miami, FL",
    price: "$12,000,000",
    priceValue: 12000000,
    category: "Residential",
    status: "Ready to Move",
    image: "https://picsum.photos/seed/luxury3/800/600",
    beds: 5,
    baths: 6,
    sqft: "8,000",
    tags: ["Waterfront", "Luxury", "Eco-Friendly"]
  },
  {
    id: 4,
    title: "Tech Hub Office",
    location: "San Francisco, CA",
    price: "$45,000,000",
    priceValue: 45000000,
    category: "Commercial",
    status: "Ready to Move",
    image: "https://picsum.photos/seed/office1/800/600",
    beds: 0,
    baths: 10,
    sqft: "25,000",
    tags: ["Smart Homes", "Eco-Friendly"]
  },
  {
    id: 5,
    title: "Alpine Retreat",
    location: "Aspen, CO",
    price: "$15,000,000",
    priceValue: 15000000,
    category: "Residential",
    status: "Ready to Move",
    image: "https://picsum.photos/seed/snow1/800/600",
    beds: 5,
    baths: 7,
    sqft: "9,500",
    tags: ["Luxury", "Eco-Friendly", "Golf View"]
  },
  {
    id: 6,
    title: "Downtown Loft",
    location: "Chicago, IL",
    price: "$4,500,000",
    priceValue: 4500000,
    category: "Penthouse",
    status: "Ready to Move",
    image: "https://picsum.photos/seed/loft1/800/600",
    beds: 3,
    baths: 3,
    sqft: "3,200",
    tags: ["City View", "Smart Homes"]
  },
  {
    id: 7,
    title: "Lakeside Manor",
    location: "Austin, TX",
    price: "$8,200,000",
    priceValue: 8200000,
    category: "Residential",
    status: "Under Construction",
    image: "https://picsum.photos/seed/lake1/800/600",
    beds: 5,
    baths: 6,
    sqft: "6,000",
    tags: ["Waterfront", "Eco-Friendly"]
  },
  {
    id: 8,
    title: "Desert Oasis",
    location: "Scottsdale, AZ",
    price: "$6,500,000",
    priceValue: 6500000,
    category: "Residential",
    status: "Ready to Move",
    image: "https://picsum.photos/seed/desert1/800/600",
    beds: 4,
    baths: 5,
    sqft: "5,500",
    tags: ["Golf View", "Luxury"]
  },
  {
    id: 9,
    title: "Harbor Point",
    location: "Boston, MA",
    price: "$3,800,000",
    priceValue: 3800000,
    category: "Apartment",
    status: "New Launch",
    image: "https://picsum.photos/seed/harbor1/800/600",
    beds: 2,
    baths: 2,
    sqft: "1,800",
    tags: ["Waterfront", "Affordable"]
  },
  {
    id: 10,
    title: "Green Valley Estate",
    location: "Napa, CA",
    price: "$14,000,000",
    priceValue: 14000000,
    category: "Residential",
    status: "Ready to Move",
    image: "https://picsum.photos/seed/valley1/800/600",
    beds: 6,
    baths: 7,
    sqft: "10,000",
    tags: ["Eco-Friendly", "Luxury", "Golf View"]
  },
  {
    id: 11,
    title: "Metro Tower",
    location: "Seattle, WA",
    price: "$2,500,000",
    priceValue: 2500000,
    category: "Apartment",
    status: "New Launch",
    image: "https://picsum.photos/seed/metro1/800/600",
    beds: 2,
    baths: 2,
    sqft: "1,500",
    tags: ["Smart Homes", "Affordable"]
  },
  {
    id: 12,
    title: "Sunset Boulevard",
    location: "Los Angeles, CA",
    price: "$9,000,000",
    priceValue: 9000000,
    category: "Commercial",
    status: "Under Construction",
    image: "https://picsum.photos/seed/sunset1/800/600",
    beds: 0,
    baths: 4,
    sqft: "8,000",
    tags: ["City View", "Luxury"]
  }
];

const ITEMS_PER_PAGE = 6;

interface ProjectGridProps {
  featured?: boolean;
}

export default function ProjectGrid({ featured = false }: ProjectGridProps) {
  const [searchParams] = useSearchParams();
  
  const [filters, setFilters] = useState({
    location: "All Locations",
    type: "All Types",
    budget: "Any Budget",
    status: "All Status",
    bhk: "All BHK",
    tags: [] as string[]
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Initialize filters from URL params
  useEffect(() => {
    const typeParam = searchParams.get('type') || searchParams.get('filter');
    if (typeParam) {
      setFilters(prev => {
        if (prev.type !== typeParam) {
          return { ...prev, type: typeParam };
        }
        return prev;
      });
    }
  }, [searchParams]);

  // Extract unique values for dropdowns
  const locations = ["All Locations", ...new Set(projectsData.map(p => p.location))];
  const types = ["All Types", ...new Set(projectsData.map(p => p.category))];
  const statuses = ["All Status", ...new Set(projectsData.map(p => p.status))];
  const bhkOptions = ["All BHK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"];
  const budgetOptions = [
    "Any Budget",
    "Under $5M",
    "$5M - $10M",
    "$10M - $20M",
    "Above $20M"
  ];
  const availableTags = [
    "Luxury",
    "Affordable",
    "Waterfront",
    "Golf View",
    "Smart Homes",
    "Eco-Friendly"
  ];

  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      // Location Filter
      if (filters.location !== "All Locations" && project.location !== filters.location) return false;
      
      // Type Filter
      if (filters.type !== "All Types" && project.category !== filters.type) return false;
      
      // Status Filter
      if (filters.status !== "All Status" && project.status !== filters.status) return false;
      
      // BHK Filter
      if (filters.bhk !== "All BHK") {
        const beds = project.beds;
        if (filters.bhk === "5+ BHK" && beds < 5) return false;
        if (filters.bhk !== "5+ BHK" && `${beds} BHK` !== filters.bhk) return false;
      }

      // Budget Filter
      if (filters.budget !== "Any Budget") {
        const price = project.priceValue;
        if (filters.budget === "Under $5M" && price >= 5000000) return false;
        if (filters.budget === "$5M - $10M" && (price < 5000000 || price > 10000000)) return false;
        if (filters.budget === "$10M - $20M" && (price < 10000000 || price > 20000000)) return false;
        if (filters.budget === "Above $20M" && price <= 20000000) return false;
      }

      // Tag Filter (AND logic: project must have ALL selected tags)
      if (filters.tags.length > 0) {
        const hasAllTags = filters.tags.every(tag => project.tags.includes(tag));
        if (!hasAllTags) return false;
      }

      return true;
    });
  }, [filters]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const displayProjects = featured 
    ? filteredProjects.slice(0, 3) 
    : filteredProjects.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const toggleTag = (tag: string) => {
    setFilters(prev => {
      const newTags = prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags: newTags };
    });
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      location: "All Locations",
      type: "All Types",
      budget: "Any Budget",
      status: "All Status",
      bhk: "All BHK",
      tags: []
    });
    setCurrentPage(1);
  };

  const hasActiveFilters = filters.location !== "All Locations" || 
                           filters.type !== "All Types" || 
                           filters.budget !== "Any Budget" || 
                           filters.status !== "All Status" || 
                           filters.bhk !== "All BHK" || 
                           filters.tags.length > 0;

  return (
    <div className="w-full">
      {/* Advanced Filter Bar - Only show if not featured */}
      {!featured && (
        <div className="bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            
            {/* Location */}
            <div className="relative">
              <select 
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 appearance-none cursor-pointer"
              >
                {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
              <MapPin className="absolute right-3 top-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>

            {/* Property Type */}
            <div className="relative">
              <select 
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 appearance-none cursor-pointer"
              >
                {types.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              <Filter className="absolute right-3 top-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>

            {/* Budget */}
            <div className="relative">
              <select 
                value={filters.budget}
                onChange={(e) => handleFilterChange('budget', e.target.value)}
                className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 appearance-none cursor-pointer"
              >
                {budgetOptions.map(budget => <option key={budget} value={budget}>{budget}</option>)}
              </select>
              <Filter className="absolute right-3 top-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>

            {/* Status */}
            <div className="relative">
              <select 
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 appearance-none cursor-pointer"
              >
                {statuses.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
              <Filter className="absolute right-3 top-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>

            {/* BHK */}
            <div className="relative">
              <select 
                value={filters.bhk}
                onChange={(e) => handleFilterChange('bhk', e.target.value)}
                className="w-full bg-neutral-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 appearance-none cursor-pointer"
              >
                {bhkOptions.map(bhk => <option key={bhk} value={bhk}>{bhk}</option>)}
              </select>
              <Bed className="absolute right-3 top-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>
          </div>

          {/* Tag Filters & Clear Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 pt-6 border-t border-white/5 gap-4">
            <div className="flex flex-wrap gap-3">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                    filters.tags.includes(tag)
                      ? 'bg-yellow-500 text-neutral-900 border-yellow-500'
                      : 'bg-neutral-800 text-neutral-400 border-white/5 hover:bg-neutral-700 hover:border-white/20'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            
            {hasActiveFilters && (
              <button 
                onClick={clearFilters}
                className="text-sm text-red-400 hover:text-red-300 font-medium flex items-center gap-1 whitespace-nowrap"
              >
                 Clear Filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {displayProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group bg-neutral-900 rounded-2xl overflow-hidden border border-white/5 hover:border-yellow-500/30 transition-colors"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-neutral-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-yellow-500 border border-white/10">
                  {project.category}
                </div>
                <div className="absolute bottom-4 left-4 bg-neutral-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                  {project.status}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-serif text-white mb-1">{project.title}</h3>
                    <div className="flex items-center text-neutral-400 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {project.location}
                    </div>
                  </div>
                  <span className="text-yellow-500 font-bold text-lg">{project.price}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 py-4 border-t border-white/5">
                  <div className="flex flex-col items-center text-center">
                    <Bed className="w-5 h-5 text-neutral-500 mb-1" />
                    <span className="text-xs text-neutral-400">{project.beds} Beds</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Bath className="w-5 h-5 text-neutral-500 mb-1" />
                    <span className="text-xs text-neutral-400">{project.baths} Baths</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Square className="w-5 h-5 text-neutral-500 mb-1" />
                    <span className="text-xs text-neutral-400">{project.sqft} sqft</span>
                  </div>
                </div>
                
                <button className="w-full mt-4 py-3 bg-white/5 hover:bg-yellow-500 hover:text-neutral-900 text-white rounded-xl transition-colors font-medium text-sm">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Pagination Controls - Only show if not featured */}
      {!featured && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-16">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-3 rounded-full bg-neutral-900 border border-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full font-medium transition-all ${
                  currentPage === page
                    ? 'bg-yellow-500 text-neutral-900'
                    : 'bg-neutral-900 text-neutral-400 border border-white/10 hover:bg-neutral-800'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-3 rounded-full bg-neutral-900 border border-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-800 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* View All Button - Only show if featured */}
      {featured && (
        <div className="flex justify-center mt-12">
          <Link 
            to="/projects" 
            className="px-8 py-4 bg-neutral-900 border border-white/10 text-white font-medium rounded-full hover:bg-yellow-500 hover:text-neutral-900 transition-all flex items-center gap-2"
          >
            View All Properties <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      )}
      
      {!featured && filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-neutral-400 text-lg">No properties match your filters.</p>
          <button 
            onClick={clearFilters}
            className="mt-4 text-yellow-500 hover:text-yellow-400 underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
