﻿﻿﻿﻿﻿﻿﻿import React, { useState, useEffect, useRef, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, User, Bell, ChevronDown, Menu, X, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UltraModernHeader = ({ 
  dashboardTitle, 
  userType, 
  userName, 
  userRole, 
  onLogout,
  onAlertsClick,
  onMenuToggle,
  isMenuOpen,
  showMenuButton = false
}) => {
  const { t, i18n } = useTranslation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [particles, setParticles] = useState([]);
  const headerRef = useRef(null);
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  }));

  // Force re-render when language changes
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  
  // Add effect to handle language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      // Force re-render when language changes
      forceUpdate();
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  // Initialize particles
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.5 + 0.1
      });
    }
    setParticles(newParticles);
  }, []);

  // Sample classes for dropdown
  const classes = ['Class 11-B', 'Class 12-C', 'All Classes'];

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const getAvatarColor = (name) => {
    const colors = [
      'from-blue-500 to-indigo-600',
      'from-purple-500 to-pink-600',
      'from-amber-500 to-orange-600',
      'from-emerald-500 to-teal-600',
      'from-rose-500 to-red-600',
      'from-cyan-500 to-blue-600'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getAvatarInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Animate particles
  useEffect(() => {
    if (particles.length === 0) return;
    
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          y: particle.y <= -10 ? 110 : particle.y - particle.speed,
          x: particle.x + Math.sin(particle.y * 0.05) * 0.3
        }))
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, [particles]);

  return (
    <div className="relative" ref={headerRef}>
      {/* Glassmorphism Header with enhanced effects */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-lg shadow-blue-500/5 rounded-b-xl relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(239, 246, 255, 0.9) 0%, rgba(224, 231, 255, 0.7) 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          animate={{
            background: [
              'radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(99, 102, 241, 0.3) 0%, transparent 20%)',
              'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 20%), radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.3) 0%, transparent 20%)',
              'radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(99, 102, 241, 0.3) 0%, transparent 20%)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5"></div>
        
        {/* Floating particles */}
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-blue-400"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: particle.id * 0.1
            }}
          />
        ))}
        <div className="px-5 py-3.5">
          <div className="flex flex-row items-center justify-between gap-3.5">
            {/* Left side - Dashboard title and search */}
            <div className="flex items-center gap-3.5 flex-1">
              {/* Menu button for mobile */}
              {showMenuButton && (
                <button 
                  onClick={onMenuToggle}
                  className="lg:hidden p-1.5 rounded-lg bg-white/50 backdrop-blur-sm border border-white/30 text-gray-700 hover:bg-white/70 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  {isMenuOpen ? <X className="w-6.5 h-6.5" /> : <Menu className="w-6.5 h-6.5" />}
                </button>
              )}
              
              {/* Dashboard title with enhanced gradient animation */}
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[15px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent relative"
              >
                {dashboardTitle}
              </motion.h1>
              

            </div>
            
            {/* Right side - Date, class dropdown, notifications, profile */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3.5"
            >
              {/* Date display with enhanced animation */}
              <motion.div 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="hidden lg:flex items-center gap-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md px-1.5 py-1 border border-white/40 shadow-sm hover:shadow transition-all duration-300 cursor-pointer group"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    filter: ["none", "drop-shadow(0 0 4px rgba(99, 102, 241, 0.5))", "none"]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Calendar className="w-4.5 h-4.5 text-white" />
                </motion.div>
                <span className="text-[12px] font-medium text-white">{currentDate}</span>
              </motion.div>
              
              {/* Class input */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                <motion.input
                  type="text"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  whileFocus={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 border border-white/40 rounded-md px-1.5 py-1 text-[12px] font-medium text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm hover:shadow transition-all duration-300 appearance-none"
                  placeholder="Enter class name"
                />
              </motion.div>
              

              
              {/* Notifications */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 border border-white/40 shadow-sm hover:shadow transition-all duration-300 cursor-pointer"
                onClick={onAlertsClick}
              >
                <Bell className="w-5 h-5 text-white" />
                <motion.div
                  className="absolute inset-0 rounded-xl bg-amber-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
              

            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UltraModernHeader;
