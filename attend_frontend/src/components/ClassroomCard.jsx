import React from 'react';
import { MoreVertical } from 'lucide-react';

const ClassroomCard = ({ 
  title, 
  subtitle, 
  teacher, 
  theme = 'blue',
  onMenuClick,
  onClick 
}) => {
  // Define gradient classes for different themes
  const themeClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    teal: 'from-teal-500 to-teal-600',
    purple: 'from-purple-500 to-purple-600',
    indigo: 'from-indigo-500 to-indigo-600',
    cyan: 'from-cyan-500 to-cyan-600',
    amber: 'from-amber-500 to-amber-600',
    rose: 'from-rose-500 to-rose-600'
  };

  // SVG Illustrations for study items in card headers (new version)
  const getHeaderIllustration = () => {
    // Backpack illustration
    const BackpackIcon = () => (
      <svg className="w-16 h-16 text-white opacity-10" viewBox="0 0 100 100">
        <path d="M30 30 L70 30 L75 40 L75 70 L25 70 L25 40 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="40" y="30" width="20" height="5" rx="2" fill="currentColor" />
        <circle cx="35" cy="50" r="3" fill="currentColor" />
        <circle cx="65" cy="50" r="3" fill="currentColor" />
        <line x1="45" y1="40" x2="45" y2="45" stroke="currentColor" strokeWidth="1" />
        <line x1="55" y1="40" x2="55" y2="45" stroke="currentColor" strokeWidth="1" />
      </svg>
    );

    // Globe illustration
    const GlobeIcon = () => (
      <svg className="w-16 h-16 text-white opacity-10" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M20 50 Q50 30 80 50" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M20 50 Q50 70 80 50" fill="none" stroke="currentColor" strokeWidth="1" />
        <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="1" />
        <ellipse cx="50" cy="50" rx="30" ry="10" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    );

    // Microscope illustration
    const MicroscopeIcon = () => (
      <svg className="w-16 h-16 text-white opacity-10" viewBox="0 0 100 100">
        <line x1="40" y1="30" x2="40" y2="70" stroke="currentColor" strokeWidth="2" />
        <line x1="40" y1="40" x2="60" y2="40" stroke="currentColor" strokeWidth="2" />
        <circle cx="65" cy="35" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="60" y1="40" x2="70" y2="50" stroke="currentColor" strokeWidth="2" />
        <line x1="35" y1="70" x2="45" y2="70" stroke="currentColor" strokeWidth="2" />
        <line x1="37" y1="70" x2="37" y2="75" stroke="currentColor" strokeWidth="1" />
        <line x1="43" y1="70" x2="43" y2="75" stroke="currentColor" strokeWidth="1" />
      </svg>
    );

    // Palette illustration
    const PaletteIcon = () => (
      <svg className="w-16 h-16 text-white opacity-10" viewBox="0 0 100 100">
        <path d="M30 40 Q50 20 70 40 Q70 60 50 60 Q30 60 30 40 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="40" cy="45" r="4" fill="currentColor" />
        <circle cx="50" cy="40" r="4" fill="currentColor" />
        <circle cx="60" cy="45" r="4" fill="currentColor" />
        <circle cx="50" cy="50" r="4" fill="currentColor" />
        <rect x="45" y="55" width="10" height="15" rx="2" fill="currentColor" />
      </svg>
    );

    // Compass illustration
    const CompassIcon = () => (
      <svg className="w-16 h-16 text-white opacity-10" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="1" />
        <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="1" />
        <polygon points="50,30 55,50 50,70 45,50" fill="currentColor" />
        <circle cx="50" cy="50" r="3" fill="currentColor" />
      </svg>
    );

    // Graduation cap illustration
    const GraduationCapIcon = () => (
      <svg className="w-16 h-16 text-white opacity-10" viewBox="0 0 100 100">
        <path d="M30 40 L70 40 L60 50 L40 50 Z" fill="currentColor" />
        <rect x="40" y="50" width="20" height="20" fill="currentColor" />
        <line x1="50" y1="30" x2="50" y2="40" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="25" r="5" fill="currentColor" />
      </svg>
    );

    // Books illustration
    const BooksIcon = () => (
      <svg className="w-16 h-16 text-white opacity-10" viewBox="0 0 100 100">
        <rect x="30" y="30" width="30" height="40" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="35" y="35" width="20" height="30" rx="1" fill="currentColor" />
        <rect x="40" y="40" width="15" height="25" rx="1" fill="none" stroke="currentColor" strokeWidth="1" />
        <line x1="35" y1="45" x2="50" y2="45" stroke="currentColor" strokeWidth="1" />
        <line x1="35" y1="50" x2="50" y2="50" stroke="currentColor" strokeWidth="1" />
        <line x1="35" y1="55" x2="50" y2="55" stroke="currentColor" strokeWidth="1" />
        <line x1="40" y1="40" x2="40" y2="65" stroke="currentColor" strokeWidth="1" />
      </svg>
    );

    // Scale/Balance illustration
    const ScaleIcon = () => (
      <svg className="w-16 h-16 text-white opacity-10" viewBox="0 0 100 100">
        <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="2" />
        <line x1="30" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="2" />
        <circle cx="30" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="70" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="25" y1="25" x2="35" y2="35" stroke="currentColor" strokeWidth="1" />
        <line x1="65" y1="25" x2="75" y2="35" stroke="currentColor" strokeWidth="1" />
      </svg>
    );

    // Pen/Pencil illustration
    const PenIcon = () => (
      <svg className="w-16 h-16 text-white opacity-10" viewBox="0 0 100 100">
        <polygon points="30,70 40,60 60,80 50,90" fill="currentColor" />
        <rect x="40" y="50" width="10" height="20" fill="none" stroke="currentColor" strokeWidth="2" />
        <polygon points="40,50 45,40 50,50" fill="currentColor" />
        <circle cx="45" cy="45" r="3" fill="currentColor" />
      </svg>
    );

    // Ruler illustration
    const RulerIcon = () => (
      <svg className="w-16 h-16 text-white opacity-10" viewBox="0 0 100 100">
        <rect x="30" y="40" width="40" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="35" y1="40" x2="35" y2="60" stroke="currentColor" strokeWidth="1" />
        <line x1="40" y1="40" x2="40" y2="60" stroke="currentColor" strokeWidth="1" />
        <line x1="45" y1="40" x2="45" y2="60" stroke="currentColor" strokeWidth="1" />
        <line x1="50" y1="40" x2="50" y2="60" stroke="currentColor" strokeWidth="1" />
        <line x1="55" y1="40" x2="55" y2="60" stroke="currentColor" strokeWidth="1" />
        <line x1="60" y1="40" x2="60" y2="60" stroke="currentColor" strokeWidth="1" />
        <line x1="65" y1="40" x2="65" y2="60" stroke="currentColor" strokeWidth="1" />
      </svg>
    );

    // Randomly select one of the illustrations
    const illustrations = [
      <BackpackIcon key="backpack" />,
      <GlobeIcon key="globe" />,
      <MicroscopeIcon key="microscope" />,
      <PaletteIcon key="palette" />,
      <CompassIcon key="compass" />,
      <GraduationCapIcon key="graduation" />,
      <BooksIcon key="books" />,
      <ScaleIcon key="scale" />,
      <PenIcon key="pen" />,
      <RulerIcon key="ruler" />
    ];

    return illustrations[Math.floor(Math.random() * illustrations.length)];
  };

  // SVG Illustrations for different subjects
  const getSubjectIllustration = () => {
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes('math')) {
      return (
        <svg className="w-12 h-12 text-white opacity-20" viewBox="0 0 100 100">
          <circle cx="30" cy="30" r="8" fill="currentColor" />
          <circle cx="70" cy="30" r="8" fill="currentColor" />
          <circle cx="50" cy="70" r="8" fill="currentColor" />
          <line x1="30" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="2" />
          <line x1="70" y1="30" x2="50" y2="70" stroke="currentColor" strokeWidth="2" />
          <line x1="50" y1="70" x2="30" y2="30" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    }
    
    if (lowerTitle.includes('science')) {
      return (
        <svg className="w-12 h-12 text-white opacity-20" viewBox="0 0 100 100">
          <circle cx="50" cy="40" r="20" fill="none" stroke="currentColor" strokeWidth="3" />
          <line x1="50" y1="20" x2="50" y2="10" stroke="currentColor" strokeWidth="2" />
          <line x1="70" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="40" x2="30" y2="40" stroke="currentColor" strokeWidth="2" />
          <line x1="50" y1="60" x2="50" y2="80" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="85" r="5" fill="currentColor" />
        </svg>
      );
    }
    
    if (lowerTitle.includes('english')) {
      return (
        <svg className="w-12 h-12 text-white opacity-20" viewBox="0 0 100 100">
          <path d="M20 20 L80 20 L80 80 L20 80 Z" fill="none" stroke="currentColor" strokeWidth="3" />
          <line x1="30" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="2" />
          <line x1="30" y1="40" x2="70" y2="40" stroke="currentColor" strokeWidth="2" />
          <line x1="30" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="2" />
          <line x1="30" y1="60" x2="50" y2="60" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    }
    
    if (lowerTitle.includes('history') || lowerTitle.includes('social')) {
      return (
        <svg className="w-12 h-12 text-white opacity-20" viewBox="0 0 100 100">
          <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="3" />
          <line x1="25" y1="35" x2="75" y2="35" stroke="currentColor" strokeWidth="2" />
          <line x1="25" y1="45" x2="75" y2="45" stroke="currentColor" strokeWidth="2" />
          <line x1="25" y1="55" x2="75" y2="55" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="70" r="8" fill="currentColor" />
        </svg>
      );
    }
    
    if (lowerTitle.includes('art')) {
      return (
        <svg className="w-12 h-12 text-white opacity-20" viewBox="0 0 100 100">
          <circle cx="50" cy="40" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M35 60 Q50 80 65 60" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="40" y1="50" x2="60" y2="50" stroke="currentColor" strokeWidth="1" />
          <line x1="50" y1="40" x2="50" y2="60" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    }
    
    if (lowerTitle.includes('music')) {
      return (
        <svg className="w-12 h-12 text-white opacity-20" viewBox="0 0 100 100">
          <path d="M30 20 L30 70 L70 70 L70 50" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="30" cy="70" r="5" fill="currentColor" />
          <circle cx="70" cy="50" r="5" fill="currentColor" />
          <line x1="30" y1="20" x2="50" y2="10" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    }
    
    if (lowerTitle.includes('pe') || lowerTitle.includes('sport') || lowerTitle.includes('physical')) {
      return (
        <svg className="w-12 h-12 text-white opacity-20" viewBox="0 0 100 100">
          <circle cx="50" cy="35" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M40 45 L30 70 L40 70 L50 55 L60 70 L70 70 L60 45" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    }
    
    // Default book illustration
    return (
      <svg className="w-12 h-12 text-white opacity-20" viewBox="0 0 100 100">
        <path d="M25 20 L75 20 L75 80 L25 80 Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M25 20 L35 10 L85 10 L85 70 L75 80" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
    );
  };

  return (
    <div 
      className="relative rounded-2xl shadow overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md min-w-[180px] md:min-w-[200px] group"
      onClick={onClick}
    >
      {/* Gradient background with study item illustrations */}
      <div className={`bg-gradient-to-br ${themeClasses[theme]} h-16 relative overflow-hidden`}>
        {/* Study item illustrations in the background */}
        <div className="absolute top-0 right-0 opacity-10 blur-[1px] transform translate-x-1/4 -translate-y-1/4 transition-all duration-500 group-hover:opacity-20 group-hover:translate-x-1/6 group-hover:-translate-y-1/6">
          {getHeaderIllustration()}
        </div>
        
        {/* Decorative SVG elements */}
        <div className="absolute bottom-0 right-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300 transform group-hover:scale-105 transition-transform duration-300">
          {getSubjectIllustration()}
        </div>
        
        {/* Top left decorative element */}
        <div className="absolute top-2 left-2 opacity-20">
          <div className="w-8 h-8 rounded-full bg-white"></div>
        </div>
        
        {/* Additional scattered decorative elements */}
        <div className="absolute top-1/3 left-1/4 w-3 h-3 rounded-full bg-white/10"></div>
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 rounded-full bg-white/15"></div>
        <div className="absolute top-1/4 right-1/4 w-2.5 h-2.5 rotate-45 bg-white/10"></div>
        
        {/* Menu button */}
        <button 
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors z-10"
          onClick={(e) => {
            e.stopPropagation();
            onMenuClick && onMenuClick();
          }}
          aria-label="Class options"
        >
          <MoreVertical className="w-4 h-4 text-white" />
        </button>
      </div>
      
      {/* Card content */}
      <div className="bg-white p-2">
        <h3 className="text-xs font-bold text-gray-900 mb-1.5 line-clamp-1">{title}</h3>
        <p className="text-gray-600 text-xs mb-3.5 line-clamp-1">{subtitle}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1.5 rounded-full">
            {teacher}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">Class</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassroomCard;