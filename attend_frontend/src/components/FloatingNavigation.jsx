import React from 'react';
import { motion } from 'framer-motion';
import { Home, BookOpen, UserCheck, FileText, Bell, Settings, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FloatingNavigation = ({ activeTab, setActiveTab, onLogout }) => {
  const { t } = useTranslation();
  
  const navItems = [
    { id: 'home', icon: Home, label: t('navigation.dashboard_home') },
    { id: 'classes', icon: BookOpen, label: t('navigation.classes') },
    { id: 'attendance', icon: UserCheck, label: t('navigation.attendance') },
    { id: 'reports', icon: FileText, label: t('navigation.reports') },
    { id: 'alerts', icon: Bell, label: t('navigation.alerts') },
    { id: 'settings', icon: Settings, label: t('navigation.settings') },
  ];

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="flex items-center bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-2 space-x-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ 
                y: -10,
                scale: 1.1,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className={`text-xs mt-1 ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
              
              {item.id === 'alerts' && (
                <motion.span 
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  3
                </motion.span>
              )}
              
              {isActive && (
                <motion.div 
                  className="absolute -bottom-2 w-2 h-2 bg-blue-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
        
        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          whileHover={{ 
            y: -10,
            scale: 1.1,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
          whileTap={{ scale: 0.9 }}
          onClick={onLogout}
          className="flex flex-col items-center justify-center p-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-xs mt-1">{t('dashboard.logout')}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FloatingNavigation;