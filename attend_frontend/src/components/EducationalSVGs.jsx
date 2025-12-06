import React from 'react';

const EducationalSVGs = () => {
  return (
    <div className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
      {/* Books */}
      <svg 
        viewBox="0 0 100 100" 
        className="absolute top-2 left-2 w-8 h-8"
        fill="none" 
        stroke="currentColor" 
        strokeWidth="0.5"
      >
        <path d="M10 5 L40 5 L45 10 L45 40 L40 45 L10 45 L5 40 L5 10 Z" fill="white" />
        <path d="M15 10 L35 10 L38 13 L38 37 L35 40 L15 40 L12 37 L12 13 Z" />
        <line x1="15" y1="15" x2="35" y2="15" />
        <line x1="15" y1="20" x2="35" y2="20" />
        <line x1="15" y1="25" x2="35" y2="25" />
        <line x1="15" y1="30" x2="35" y2="30" />
        <line x1="15" y1="35" x2="35" y2="35" />
      </svg>
      
      {/* Graduation Cap */}
      <svg 
        viewBox="0 0 50 50" 
        className="absolute top-1 right-2 w-6 h-6"
        fill="currentColor"
      >
        <path d="M5 20 L25 5 L45 20 L25 35 Z" fill="white" />
        <rect x="20" y="35" width="10" height="10" fill="white" />
        <circle cx="25" cy="10" r="2" fill="#3b82f6" />
      </svg>
      
      {/* Pencil */}
      <svg 
        viewBox="0 0 40 40" 
        className="absolute bottom-2 left-4 w-5 h-5"
        fill="currentColor"
      >
        <path d="M0 15 L20 0 L30 10 L10 25 Z" fill="white" />
        <path d="M10 25 L30 10 L35 15 L15 30 Z" fill="#3b82f6" />
        <path d="M0 15 L5 10 L20 0" fill="none" stroke="#3b82f6" strokeWidth="1" />
      </svg>
      
      {/* Calculator */}
      <svg 
        viewBox="0 0 40 40" 
        className="absolute bottom-1 right-4 w-6 h-6"
        fill="currentColor"
      >
        <rect x="0" y="0" width="35" height="40" rx="3" fill="white" />
        <rect x="3" y="3" width="29" height="8" fill="#93c5fd" />
        <rect x="5" y="15" width="7" height="7" fill="#dbeafe" />
        <rect x="14" y="15" width="7" height="7" fill="#dbeafe" />
        <rect x="23" y="15" width="7" height="7" fill="#dbeafe" />
        <rect x="5" y="24" width="7" height="7" fill="#dbeafe" />
        <rect x="14" y="24" width="7" height="7" fill="#dbeafe" />
        <rect x="23" y="24" width="7" height="7" fill="#dbeafe" />
        <rect x="5" y="33" width="16" height="7" fill="#3b82f6" />
        <rect x="23" y="33" width="7" height="7" fill="#dbeafe" />
      </svg>
    </div>
  );
};

export default EducationalSVGs;