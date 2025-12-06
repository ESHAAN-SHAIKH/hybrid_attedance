 import React from 'react';
import { MoreVertical } from 'lucide-react';

const EnhancedClassroomCard = ({ 
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

  // Create detailed SVG illustrations for stationery items with more realistic designs
  const getRealisticStationeryIllustrations = () => {
    // Realistic book with pages and spine
    const RealisticBookIcon = () => (
      <svg className="w-20 h-20 text-white opacity-25" viewBox="0 0 100 100">
        {/* Book cover */}
        <path d="M25 20 Q25 15 30 15 L65 15 Q70 15 70 20 L70 80 Q70 85 65 85 L30 85 Q25 85 25 80 Z" fill="currentColor" />
        {/* Book pages */}
        <path d="M30 20 L60 20 Q65 20 65 25 L65 75 Q65 80 60 80 L30 80 Q25 80 25 75 L25 25 Q25 20 30 20 Z" fill="white" opacity="0.8" />
        {/* Page edges */}
        <line x1="35" y1="25" x2="55" y2="25" stroke="currentColor" strokeWidth="0.5" />
        <line x1="35" y1="30" x2="55" y2="30" stroke="currentColor" strokeWidth="0.5" />
        <line x1="35" y1="35" x2="55" y2="35" stroke="currentColor" strokeWidth="0.5" />
        <line x1="35" y1="40" x2="55" y2="40" stroke="currentColor" strokeWidth="0.5" />
        <line x1="35" y1="45" x2="55" y2="45" stroke="currentColor" strokeWidth="0.5" />
        <line x1="35" y1="50" x2="55" y2="50" stroke="currentColor" strokeWidth="0.5" />
        <line x1="35" y1="55" x2="55" y2="55" stroke="currentColor" strokeWidth="0.5" />
        <line x1="35" y1="60" x2="55" y2="60" stroke="currentColor" strokeWidth="0.5" />
        <line x1="35" y1="65" x2="55" y2="65" stroke="currentColor" strokeWidth="0.5" />
        <line x1="35" y1="70" x2="55" y2="70" stroke="currentColor" strokeWidth="0.5" />
        <line x1="35" y1="75" x2="55" y2="75" stroke="currentColor" strokeWidth="0.5" />
        {/* Spine details */}
        <line x1="30" y1="25" x2="30" y2="75" stroke="currentColor" strokeWidth="1" />
        <circle cx="30" cy="35" r="1.5" fill="currentColor" />
        <circle cx="30" cy="50" r="1.5" fill="currentColor" />
        <circle cx="30" cy="65" r="1.5" fill="currentColor" />
      </svg>
    );
    
    // Realistic pen with nib and clip
    const RealisticPenIcon = () => (
      <svg className="w-20 h-20 text-white opacity-25" viewBox="0 0 100 100">
        {/* Pen body */}
        <rect x="45" y="20" width="10" height="50" rx="5" fill="currentColor" />
        {/* Pen tip/nib */}
        <polygon points="45,70 55,70 50,75" fill="currentColor" />
        <rect x="47" y="75" width="6" height="8" rx="2" fill="currentColor" />
        {/* Pen clip */}
        <path d="M57 25 Q60 25 60 30 L60 50 Q60 55 57 55 L57 25 Z" fill="currentColor" />
        {/* Pen cap */}
        <rect x="43" y="15" width="14" height="8" rx="3" fill="currentColor" />
        <circle cx="50" cy="17" r="1.5" fill="white" />
        {/* Pen button */}
        <circle cx="50" cy="25" r="2" fill="white" />
      </svg>
    );
    
    // Realistic mechanical pencil with details (more prominent)
    const RealisticPencilIcon = () => (
      <svg className="w-24 h-24 text-white opacity-30" viewBox="0 0 100 100">
        {/* Pencil body with gradient effect */}
        <defs>
          <linearGradient id="pencilBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <rect x="38" y="15" width="24" height="55" rx="4" fill="url(#pencilBody)" />
        
        {/* Metallic band */}
        <rect x="38" y="25" width="24" height="3" fill="#c0c0c0" />
        <rect x="38" y="30" width="24" height="1" fill="#a0a0a0" />
        
        {/* Grip section with detailed texture */}
        <rect x="38" y="35" width="24" height="8" fill="#e0e0e0" />
        {/* Grip patterns */}
        <circle cx="42" cy="37" r="1" fill="#a0a0a0" />
        <circle cx="46" cy="39" r="1" fill="#a0a0a0" />
        <circle cx="50" cy="37" r="1" fill="#a0a0a0" />
        <circle cx="54" cy="39" r="1" fill="#a0a0a0" />
        <circle cx="58" cy="37" r="1" fill="#a0a0a0" />
        <circle cx="62" cy="39" r="1" fill="#a0a0a0" />
        
        {/* Pencil tip with detailed graphite */}
        <polygon points="38,70 62,70 50,85" fill="#505050" />
        <polygon points="42,70 58,70 50,80" fill="#303030" />
        <rect x="45" y="70" width="10" height="3" fill="#101010" />
        
        {/* Eraser with metallic band */}
        <rect x="38" y="12" width="24" height="3" fill="#ff6b6b" />
        <rect x="38" y="15" width="24" height="2" fill="#ff5252" />
        <rect x="40" y="12" width="20" height="5" rx="1" fill="#ffb3b3" />
        
        {/* Brand name with better visibility */}
        <text x="50" y="55" fill="white" fontSize="4" fontFamily="Arial" textAnchor="middle" fontWeight="bold">PRECISION</text>
        <text x="50" y="60" fill="white" fontSize="3" fontFamily="Arial" textAnchor="middle">MECHANICAL</text>
        
        {/* Clip detail */}
        <rect x="63" y="20" width="2" height="15" rx="1" fill="#c0c0c0" />
        <circle cx="64" cy="20" r="1.5" fill="#a0a0a0" />
      </svg>
    );
    
    // Realistic scale/balance with pans
    const RealisticScaleIcon = () => (
      <svg className="w-20 h-20 text-white opacity-25" viewBox="0 0 100 100">
        {/* Scale base */}
        <rect x="30" y="70" width="40" height="8" rx="3" fill="currentColor" />
        {/* Scale column */}
        <rect x="47" y="30" width="6" height="40" fill="currentColor" />
        {/* Scale arm */}
        <rect x="35" y="30" width="30" height="3" rx="1" fill="currentColor" />
        {/* Left pan */}
        <ellipse cx="40" cy="45" rx="8" ry="3" fill="currentColor" />
        <path d="M32 45 Q32 50 40 50 L48 50 Q56 50 56 45" fill="none" stroke="currentColor" strokeWidth="1.5" />
        {/* Right pan */}
        <ellipse cx="60" cy="45" rx="8" ry="3" fill="currentColor" />
        <path d="M52 45 Q52 50 60 50 L68 50 Q76 50 76 45" fill="none" stroke="currentColor" strokeWidth="1.5" />
        {/* Support stands */}
        <line x1="40" y1="50" x2="40" y2="60" stroke="currentColor" strokeWidth="1" />
        <line x1="60" y1="50" x2="60" y2="60" stroke="currentColor" strokeWidth="1" />
        {/* Weights */}
        <circle cx="40" cy="55" r="2" fill="white" />
        <circle cx="60" cy="55" r="2" fill="white" />
      </svg>
    );
    
    // Realistic digital scale with display
    const RealisticDigitalScaleIcon = () => (
      <svg className="w-20 h-20 text-white opacity-25" viewBox="0 0 100 100">
        {/* Scale base */}
        <rect x="25" y="65" width="50" height="15" rx="3" fill="currentColor" />
        {/* Display screen */}
        <rect x="35" y="55" width="30" height="10" rx="2" fill="white" />
        <text x="50" y="62" fill="currentColor" fontSize="4" fontFamily="Arial" textAnchor="middle">0.00g</text>
        {/* Platform */}
        <rect x="30" y="50" width="40" height="5" rx="1" fill="currentColor" />
        {/* Support legs */}
        <rect x="35" y="70" width="3" height="10" fill="currentColor" />
        <rect x="62" y="70" width="3" height="10" fill="currentColor" />
        {/* Unit indicator */}
        <text x="65" y="60" fill="white" fontSize="2" fontFamily="Arial">g</text>
      </svg>
    );
    
    // Realistic calculator with display
    const RealisticCalculatorIcon = () => (
      <svg className="w-20 h-20 text-white opacity-25" viewBox="0 0 100 100">
        {/* Calculator body */}
        <rect x="25" y="20" width="50" height="60" rx="5" fill="currentColor" />
        {/* Display screen */}
        <rect x="30" y="25" width="40" height="15" rx="2" fill="white" opacity="0.9" />
        <rect x="32" y="27" width="36" height="3" rx="1" fill="currentColor" opacity="0.7" />
        <rect x="32" y="32" width="25" height="3" rx="1" fill="currentColor" opacity="0.7" />
        {/* Buttons */}
        <rect x="30" y="45" width="8" height="8" rx="2" fill="white" opacity="0.8" />
        <rect x="42" y="45" width="8" height="8" rx="2" fill="white" opacity="0.8" />
        <rect x="54" y="45" width="8" height="8" rx="2" fill="white" opacity="0.8" />
        <rect x="66" y="45" width="8" height="8" rx="2" fill="white" opacity="0.8" />
        
        <rect x="30" y="57" width="8" height="8" rx="2" fill="white" opacity="0.8" />
        <rect x="42" y="57" width="8" height="8" rx="2" fill="white" opacity="0.8" />
        <rect x="54" y="57" width="8" height="8" rx="2" fill="white" opacity="0.8" />
        <rect x="66" y="57" width="8" height="8" rx="2" fill="white" opacity="0.8" />
        
        <rect x="30" y="69" width="18" height="8" rx="2" fill="white" opacity="0.8" />
        <rect x="52" y="69" width="8" height="8" rx="2" fill="white" opacity="0.8" />
        <rect x="64" y="69" width="8" height="8" rx="2" fill="white" opacity="0.8" />
      </svg>
    );
    
    // Realistic notebook with spiral binding
    const RealisticNotebookIcon = () => (
      <svg className="w-20 h-20 text-white opacity-25" viewBox="0 0 100 100">
        {/* Notebook cover */}
        <path d="M25 20 Q25 15 30 15 L70 15 Q75 15 75 20 L75 80 Q75 85 70 85 L30 85 Q25 85 25 80 Z" fill="currentColor" />
        {/* Spiral binding */}
        <circle cx="25" cy="25" r="1.5" fill="white" />
        <circle cx="25" cy="35" r="1.5" fill="white" />
        <circle cx="25" cy="45" r="1.5" fill="white" />
        <circle cx="25" cy="55" r="1.5" fill="white" />
        <circle cx="25" cy="65" r="1.5" fill="white" />
        <circle cx="25" cy="75" r="1.5" fill="white" />
        {/* Pages */}
        <path d="M30 20 L65 20 Q70 20 70 25 L70 80 Q70 85 65 85 L30 85 Q30 85 30 80 L30 25 Q30 20 30 20 Z" fill="white" opacity="0.9" />
        {/* Page lines */}
        <line x1="35" y1="25" x2="65" y2="25" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
        <line x1="35" y1="30" x2="65" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
        <line x1="35" y1="35" x2="65" y2="35" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
        <line x1="35" y1="40" x2="65" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
        <line x1="35" y1="45" x2="65" y2="45" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
        <line x1="35" y1="50" x2="65" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
        <line x1="35" y1="55" x2="65" y2="55" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
        <line x1="35" y1="60" x2="65" y2="60" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
        <line x1="35" y1="65" x2="65" y2="65" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
        <line x1="35" y1="70" x2="65" y2="70" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
        <line x1="35" y1="75" x2="65" y2="75" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
        <line x1="35" y1="80" x2="65" y2="80" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
      </svg>
    );
    
    // Realistic ruler with detailed markings
    const RealisticRulerIcon = () => (
      <svg className="w-20 h-20 text-white opacity-25" viewBox="0 0 100 100">
        {/* Ruler body */}
        <rect x="20" y="40" width="60" height="20" rx="2" fill="currentColor" />
        {/* Measurement markings */}
        <line x1="25" y1="40" x2="25" y2="45" stroke="white" strokeWidth="0.5" />
        <line x1="30" y1="40" x2="30" y2="43" stroke="white" strokeWidth="0.5" />
        <line x1="35" y1="40" x2="35" y2="45" stroke="white" strokeWidth="0.5" />
        <line x1="40" y1="40" x2="40" y2="43" stroke="white" strokeWidth="0.5" />
        <line x1="45" y1="40" x2="45" y2="45" stroke="white" strokeWidth="0.5" />
        <line x1="50" y1="40" x2="50" y2="43" stroke="white" strokeWidth="0.5" />
        <line x1="55" y1="40" x2="55" y2="45" stroke="white" strokeWidth="0.5" />
        <line x1="60" y1="40" x2="60" y2="43" stroke="white" strokeWidth="0.5" />
        <line x1="65" y1="40" x2="65" y2="45" stroke="white" strokeWidth="0.5" />
        <line x1="70" y1="40" x2="70" y2="43" stroke="white" strokeWidth="0.5" />
        <line x1="75" y1="40" x2="75" y2="45" stroke="white" strokeWidth="0.5" />
        {/* Longer markings for inches/cm */}
        <line x1="25" y1="55" x2="25" y2="60" stroke="white" strokeWidth="1" />
        <line x1="40" y1="55" x2="40" y2="60" stroke="white" strokeWidth="1" />
        <line x1="55" y1="55" x2="55" y2="60" stroke="white" strokeWidth="1" />
        <line x1="70" y1="55" x2="70" y2="60" stroke="white" strokeWidth="1" />
        {/* Numbers */}
        <text x="24" y="54" fill="white" fontSize="3" fontFamily="Arial">0</text>
        <text x="38" y="54" fill="white" fontSize="3" fontFamily="Arial">1</text>
        <text x="53" y="54" fill="white" fontSize="3" fontFamily="Arial">2</text>
        <text x="68" y="54" fill="white" fontSize="3" fontFamily="Arial">3</text>
      </svg>
    );
    
    // Realistic backpack with straps
    const RealisticBackpackIcon = () => (
      <svg className="w-20 h-20 text-white opacity-25" viewBox="0 0 100 100">
        {/* Backpack body */}
        <path d="M30 25 Q30 20 35 20 L65 20 Q70 20 70 25 L70 70 Q70 75 65 75 L35 75 Q30 75 30 70 Z" fill="currentColor" />
        {/* Front pocket */}
        <rect x="40" y="35" width="20" height="15" rx="2" fill="white" opacity="0.3" />
        <circle cx="50" cy="40" r="1" fill="currentColor" />
        {/* Straps */}
        <rect x="32" y="25" width="3" height="30" rx="1" fill="currentColor" />
        <rect x="65" y="25" width="3" height="30" rx="1" fill="currentColor" />
        {/* Strap connectors */}
        <rect x="30" y="25" width="7" height="3" rx="1" fill="currentColor" />
        <rect x="63" y="25" width="7" height="3" rx="1" fill="currentColor" />
        {/* Zipper pull */}
        <circle cx="50" cy="55" r="1.5" fill="white" />
        <line x1="50" y1="55" x2="50" y2="60" stroke="white" strokeWidth="1" />
      </svg>
    );

    return {
      book: <RealisticBookIcon />,
      pen: <RealisticPenIcon />,
      pencil: <RealisticPencilIcon />,
      scale: <RealisticScaleIcon />,
      digitalScale: <RealisticDigitalScaleIcon />,
      calculator: <RealisticCalculatorIcon />,
      notebook: <RealisticNotebookIcon />,
      ruler: <RealisticRulerIcon />,
      backpack: <RealisticBackpackIcon />
    };
  };

  // Get subject-specific illustrations with more realistic designs
  const getSubjectIllustrations = () => {
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes('math')) {
      return {
        topLeft: getRealisticStationeryIllustrations().calculator,
        topRight: getRealisticStationeryIllustrations().ruler,
        bottomLeft: getRealisticStationeryIllustrations().pencil,
        center: getRealisticStationeryIllustrations().scale
      };
    }
    
    if (lowerTitle.includes('science')) {
      return {
        topLeft: getRealisticStationeryIllustrations().scale,
        topRight: getRealisticStationeryIllustrations().digitalScale
      };
    }
    
    if (lowerTitle.includes('english')) {
      return {
        topLeft: getRealisticStationeryIllustrations().book,
        topRight: getRealisticStationeryIllustrations().pen
      };
    }
    
    if (lowerTitle.includes('history') || lowerTitle.includes('social')) {
      return {
        topLeft: getRealisticStationeryIllustrations().book,
        topRight: getRealisticStationeryIllustrations().notebook
      };
    }
    
    if (lowerTitle.includes('art')) {
      return {
        topLeft: getRealisticStationeryIllustrations().pencil,
        topRight: getRealisticStationeryIllustrations().ruler
      };
    }
    
    if (lowerTitle.includes('music')) {
      return {
        topLeft: getRealisticStationeryIllustrations().notebook,
        topRight: getRealisticStationeryIllustrations().pen
      };
    }
    
    if (lowerTitle.includes('pe') || lowerTitle.includes('sport') || lowerTitle.includes('physical')) {
      return {
        topLeft: getRealisticStationeryIllustrations().backpack,
        topRight: getRealisticStationeryIllustrations().notebook
      };
    }
    
    // Default illustrations
    return {
      topLeft: getRealisticStationeryIllustrations().notebook,
      topRight: getRealisticStationeryIllustrations().pencil
    };
  };

  const subjectIllustrations = getSubjectIllustrations();

  // Get a random stationery item to display prominently
  const getStationeryItem = () => {
    // Create geometric SVG components for stationery items
    const BookIcon = () => (
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 2h12c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm0 2v16h12V4H4zm2 2h8v2H6V6zm0 4h8v2H6v-2zm0 4h6v2H6v-2z"/>
      </svg>
    );
    
    const ScaleIcon = () => (
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h10v2H7zm0 3h7v2H7z"/>
      </svg>
    );
    
    const PenIcon = () => (
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z"/>
      </svg>
    );
    
    const RulerIcon = () => (
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3v18h18v-2H5V3H3zm16 16H7V5h12v14zm-4-4h2v2h-2v-2zm-4 0h2v2h-2v-2zm-4 0h2v2H7v-2zm8-4h2v2h-2V7zm-4 0h2v2h-2V7zm-4 0h2v2H7V7z"/>
      </svg>
    );
    
    const items = [
      { icon: BookIcon, color: 'text-blue-300' },
      { icon: ScaleIcon, color: 'text-green-300' },
      { icon: PenIcon, color: 'text-purple-300' },
      { icon: RulerIcon, color: 'text-amber-300' }
    ];
    
    return items[Math.floor(Math.random() * items.length)];
  };

  const stationeryItem = getStationeryItem();
  const StationeryIcon = stationeryItem.icon;

  return (
    <div 
      className="relative rounded-2xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg min-w-[175px] md:min-w-[195px] group"
      onClick={onClick}
    >
      {/* Gradient background with study item illustrations */}
      <div className={`bg-gradient-to-br ${themeClasses[theme]} h-16 relative overflow-hidden`}>
        {/* Top-left illustrated background graphic */}
        <div className="absolute top-0 left-0 opacity-25 transform -translate-x-1/4 -translate-y-1/4 transition-all duration-500 group-hover:opacity-30 group-hover:scale-105">
          {subjectIllustrations.topLeft}
        </div>
        
        {/* Top-right illustrated background graphic */}
        <div className="absolute top-0 right-0 opacity-25 transform translate-x-1/4 -translate-y-1/4 transition-all duration-500 group-hover:opacity-30 group-hover:scale-105">
          {subjectIllustrations.topRight}
        </div>
        
        {/* Bottom-left illustrated background graphic (pencil) */}
        <div className="absolute bottom-0 left-0 opacity-25 transform -translate-x-1/4 translate-y-1/4 transition-all duration-500 group-hover:opacity-30 group-hover:scale-105">
          {subjectIllustrations.bottomLeft}
        </div>
        
        {/* Center illustrated background graphic (scale) */}
        <div className="absolute top-1/2 left-1/2 opacity-20 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:opacity-25 group-hover:scale-105">
          {subjectIllustrations.center}
        </div>
        
        {/* Bottom-right decorative element */}
        <div className="absolute bottom-0 right-0 opacity-20 group-hover:opacity-25 transition-opacity duration-300 transform group-hover:scale-105 transition-transform duration-300">
          {getRealisticStationeryIllustrations().book}
        </div>
        
        {/* Top left decorative element */}
        <div className="absolute top-2 left-2 opacity-20">
          <div className="w-8 h-8 rounded-full bg-white"></div>
        </div>
        
        {/* Additional scattered decorative elements */}
        <div className="absolute top-1/3 left-1/3 w-2.5 h-2.5 rounded-full bg-white/15"></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 rotate-12 bg-white/10"></div>
        <div className="absolute top-1/4 right-1/3 w-2 h-2 rounded-full bg-white/20"></div>
        <div className="absolute bottom-1/3 left-1/4 w-3.5 h-3.5 rotate-6 bg-white/10"></div>
        
        {/* Prominent stationery item display */}
        <div className="absolute top-3 left-3 z-10">
          <div className={`p-1.5 rounded-lg bg-white/20 backdrop-blur-sm ${stationeryItem.color}`}>
            <StationeryIcon className="w-4 h-4 text-white" />
          </div>
        </div>
        
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
        <h3 className="text-xs font-bold text-gray-900 mb-1 line-clamp-1">{title}</h3>
        <p className="text-gray-600 text-[10px] mb-2 line-clamp-1">{subtitle}</p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
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

export default EnhancedClassroomCard;