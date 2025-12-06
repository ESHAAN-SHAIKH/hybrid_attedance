import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, User, Lock, School, Mail, Key, ArrowRight, BookOpen, GraduationCap, Users } from 'lucide-react';
import AttendSmartLogo from './AttendSmartLogo';
import ThemeToggle from './ThemeToggle';
// Import Google OAuth components
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [name, setName] = useState('');

  // Google OAuth login handler
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        // Get user info from Google
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );

        console.log('Google user info:', userInfo.data);
        // Login through auth context
        // Note: This might need adjustment if backend supports Google Login
        // For now, we'll assume the context handles it or we need a backend endpoint
        // login(userInfo.data, userType); 
        setError('Google login not fully integrated with backend yet');
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError('Failed to authenticate with Google');
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      setError('Google login failed');
      setIsLoading(false);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isSignUp) {
        if (!name || !email || !password) {
          setError('Please fill in all fields');
          setIsLoading(false);
          return;
        }

        const result = await register({
          name,
          email,
          password,
          role: userType
        });

        if (!result.success) {
          setError(result.error);
        }
      } else {
        if (!email || !password) {
          setError('Please enter both email and password');
          setIsLoading(false);
          return;
        }

        const result = await login(email, password, userType);
        if (!result.success) {
          setError(result.error);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Testimonials data
  const testimonials = [
    {
      text: "Join thousands of educators and students using our platform to streamline attendance tracking",
      users: "10k+",
      id: 1
    },
    {
      text: "Trusted by schools and institutions worldwide for reliable attendance management",
      users: "5k+",
      id: 2
    },
    {
      text: "Experience seamless attendance tracking with our intuitive platform",
      users: "15k+",
      id: 3
    }
  ];

  // Educational SVG components
  const EducationIllustration = () => (
    <svg
      viewBox="0 0 200 200"
      className="absolute inset-0 w-full h-full opacity-10"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Books */}
      <g transform="translate(30, 30)">
        <path d="M10 0 L50 0 L55 5 L55 40 L50 45 L10 45 L5 40 L5 5 Z" fill="white" />
        <path d="M15 5 L45 5 L48 8 L48 37 L45 40 L15 40 L12 37 L12 8 Z" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
        <line x1="15" y1="10" x2="45" y2="10" stroke="#3b82f6" strokeWidth="0.5" />
        <line x1="15" y1="15" x2="45" y2="15" stroke="#3b82f6" strokeWidth="0.5" />
        <line x1="15" y1="20" x2="45" y2="20" stroke="#3b82f6" strokeWidth="0.5" />
        <line x1="15" y1="25" x2="45" y2="25" stroke="#3b82f6" strokeWidth="0.5" />
        <line x1="15" y1="30" x2="45" y2="30" stroke="#3b82f6" strokeWidth="0.5" />
        <line x1="15" y1="35" x2="45" y2="35" stroke="#3b82f6" strokeWidth="0.5" />
      </g>

      {/* Graduation Cap */}
      <g transform="translate(120, 20)">
        <path d="M0 15 L25 0 L50 15 L25 30 Z" fill="white" />
        <rect x="20" y="30" width="10" height="15" fill="white" />
        <circle cx="25" cy="5" r="2" fill="#3b82f6" />
      </g>

      {/* Pencil */}
      <g transform="translate(40, 100)">
        <path d="M0 10 L20 0 L30 10 L10 20 Z" fill="white" />
        <path d="M10 20 L30 10 L35 15 L15 25 Z" fill="#3b82f6" />
        <path d="M0 10 L5 5 L20 0" fill="none" stroke="#3b82f6" strokeWidth="1" />
      </g>

      {/* Notebook */}
      <g transform="translate(100, 90)">
        <rect x="0" y="0" width="40" height="50" rx="2" fill="white" />
        <rect x="5" y="5" width="30" height="5" fill="#dbeafe" />
        <rect x="5" y="15" width="30" height="3" fill="#dbeafe" />
        <rect x="5" y="22" width="30" height="3" fill="#dbeafe" />
        <rect x="5" y="29" width="30" height="3" fill="#dbeafe" />
        <rect x="5" y="36" width="30" height="3" fill="#dbeafe" />
        <rect x="5" y="43" width="30" height="3" fill="#dbeafe" />
        <rect x="0" y="0" width="5" height="50" fill="#3b82f6" />
      </g>

      {/* Calculator */}
      <g transform="translate(60, 150)">
        <rect x="0" y="0" width="35" height="45" rx="3" fill="white" />
        <rect x="3" y="3" width="29" height="8" fill="#93c5fd" />
        <rect x="5" y="15" width="7" height="7" fill="#dbeafe" />
        <rect x="14" y="15" width="7" height="7" fill="#dbeafe" />
        <rect x="23" y="15" width="7" height="7" fill="#dbeafe" />
        <rect x="5" y="24" width="7" height="7" fill="#dbeafe" />
        <rect x="14" y="24" width="7" height="7" fill="#dbeafe" />
        <rect x="23" y="24" width="7" height="7" fill="#dbeafe" />
        <rect x="5" y="33" width="16" height="7" fill="#3b82f6" />
        <rect x="23" y="33" width="7" height="7" fill="#dbeafe" />
      </g>

      {/* Ruler */}
      <g transform="translate(130, 120)">
        <rect x="0" y="0" width="40" height="5" rx="1" fill="white" />
        <line x1="0" y1="2.5" x2="40" y2="2.5" stroke="#3b82f6" strokeWidth="0.5" />
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={i}
            x1={5 + i * 4}
            y1="0"
            x2={5 + i * 4}
            y2={i % 2 === 0 ? "5" : "3"}
            stroke="#3b82f6"
            strokeWidth="0.5"
          />
        ))}
      </g>

      {/* Pen */}
      <g transform="translate(20, 160)">
        <path d="M0 15 L5 0 L15 0 L20 15 L10 20 Z" fill="white" />
        <path d="M5 0 L10 5 L15 0" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
        <rect x="8" y="5" width="2" height="10" fill="#3b82f6" />
      </g>

      {/* Backpack */}
      <g transform="translate(140, 160)">
        <path d="M10 5 L30 5 L35 15 L35 40 L5 40 L5 15 Z" fill="white" />
        <rect x="15" y="0" width="10" height="10" rx="2" fill="white" />
        <rect x="12" y="15" width="16" height="20" fill="#dbeafe" />
        <circle cx="15" cy="25" r="2" fill="#3b82f6" />
        <circle cx="25" cy="25" r="2" fill="#3b82f6" />
        <circle cx="20" cy="32" r="2" fill="#3b82f6" />
      </g>

      {/* Globe */}
      <g transform="translate(150, 40)">
        <circle cx="15" cy="15" r="15" fill="white" />
        <ellipse cx="15" cy="15" rx="15" ry="5" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
        <ellipse cx="15" cy="15" rx="5" ry="15" fill="none" stroke="#3b82f6" strokeWidth="0.5" transform="rotate(45 15 15)" />
        <ellipse cx="15" cy="15" rx="5" ry="15" fill="none" stroke="#3b82f6" strokeWidth="0.5" transform="rotate(-45 15 15)" />
        <circle cx="15" cy="15" r="3" fill="#93c5fd" />
      </g>

      {/* Atom */}
      <g transform="translate(10, 50)">
        <circle cx="10" cy="10" r="2" fill="#3b82f6" />
        <ellipse cx="10" cy="10" rx="15" ry="5" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
        <ellipse cx="10" cy="10" rx="15" ry="5" fill="none" stroke="#3b82f6" strokeWidth="0.5" transform="rotate(60 10 10)" />
        <ellipse cx="10" cy="10" rx="15" ry="5" fill="none" stroke="#3b82f6" strokeWidth="0.5" transform="rotate(-60 10 10)" />
        <circle cx="22" cy="5" r="1.5" fill="#93c5fd" />
        <circle cx="17" cy="17" r="1.5" fill="#93c5fd" />
        <circle cx="-2" cy="15" r="1.5" fill="#93c5fd" />
      </g>

      {/* Palette */}
      <g transform="translate(80, 160)">
        <path d="M0 10 Q 10 0 20 10 Q 30 0 40 10 L 40 25 Q 30 35 20 25 Q 10 35 0 25 Z" fill="white" />
        <circle cx="10" cy="15" r="4" fill="#93c5fd" />
        <circle cx="20" cy="18" r="4" fill="#dbeafe" />
        <circle cx="30" cy="15" r="4" fill="#3b82f6" />
        <rect x="15" y="25" width="10" height="8" rx="2" fill="white" />
        <rect x="18" y="22" width="4" height="6" fill="#3b82f6" />
      </g>
    </svg>
  );

  // Handle testimonial navigation
  const nextTestimonial = () => {
    setTestimonialIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row" style={{ minHeight: '400px' }}>
        {/* Left Side - Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-4 items-center justify-center relative overflow-hidden">
          <EducationIllustration />

          <div className="relative z-10 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-0"
            >
              <div className="w-10 h-10 mx-auto mb-1">
                <AttendSmartLogo size="xs" className="drop-shadow-sm" />
              </div>
              <h1 className="text-xl font-bold mb-0">AttendSmart</h1>
              <p className="text-blue-100 text-sm">Smart Attendance System</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div
                className="bg-white/20 backdrop-blur-sm rounded-lg p-3 max-w-xs mx-auto border border-white/30 shadow-xl cursor-pointer"
                onClick={nextTestimonial}
              >
                <div className="flex items-center justify-center mb-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-indigo-400 border-2 border-white flex items-center justify-center">
                      <School className="w-3 h-3 text-white" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-purple-400 border-2 border-white flex items-center justify-center">
                      <GraduationCap className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <span className="ml-2 text-xs font-semibold text-white">{testimonials[testimonialIndex].users}</span>
                </div>
                <p className="text-[9px] text-center text-white font-medium">
                  {testimonials[testimonialIndex].text}
                </p>
                <div className="flex justify-center mt-2 space-x-1">
                  {testimonials.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full ${index === testimonialIndex ? 'bg-white' : 'bg-white/60'}`}
                    ></div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4"
            >
              <div className="flex justify-center space-x-0.5">
                <div className="w-0.5 h-0.5 bg-white rounded-full opacity-40"></div>
                <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                <div className="w-0.5 h-0.5 bg-white rounded-full opacity-40"></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-4 md:p-6 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <div className="md:hidden">
              <AttendSmartLogo size="xs" />
            </div>
            <ThemeToggle />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-1">
              <h2 className="text-xs font-bold text-gray-900 mb-0">
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </h2>
              <p className="text-gray-600 text-[7px]">
                {isSignUp ? 'Sign up to get started' : 'Sign in to your account'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 p-2 rounded-lg text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </motion.div>
              )}

              <div>
                <label className="block text-[9px] font-medium text-gray-700 mb-1">
                  Login As
                </label>
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { id: 'student', label: 'Student', icon: User },
                    { id: 'teacher', label: 'Teacher', icon: School },
                    { id: 'admin', label: 'Admin', icon: Key },
                    { id: 'government', label: 'Government', icon: Mail }
                  ].map((type, index) => {
                    const IconComponent = type.icon;
                    return (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={type.id}
                        type="button"
                        onClick={() => setUserType(type.id)}
                        className={`py-1 px-1 rounded-md text-[8px] border transition-all flex flex-col items-center justify-center shadow-sm ${userType === type.id
                          ? 'bg-blue-500 text-white border-transparent'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                          }`}
                      >
                        <IconComponent className="w-3 h-3 mb-0.5" />
                        {type.label}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-[9px] font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type={userType === 'student' ? "text" : "email"}
                    autoComplete={userType === 'student' ? "username" : "email"}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[9px] transition-all duration-300 hover:bg-gray-100 shadow-sm"
                    placeholder={userType === 'student' ? "Enter your email or roll number" : "Enter your email"}
                  />
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <Mail className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label htmlFor="name" className="block text-[9px] font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required={isSignUp}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[9px] transition-all duration-300 hover:bg-gray-100 shadow-sm"
                      placeholder="Enter your full name"
                    />
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                      <User className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-[9px] font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-8 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[9px] transition-all duration-300 hover:bg-gray-100 shadow-sm"
                    placeholder="Enter your password"
                  />
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <Lock className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-1 block text-[8px] text-gray-700">
                    Remember me
                  </label>
                </div>

                {!isSignUp && (
                  <div className="text-[8px]">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                      Forgot password?
                    </a>
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2 px-3 border border-transparent rounded-md shadow-md text-[9px] font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLoading ? (isSignUp ? 'Creating...' : 'Signing in...') : (isSignUp ? 'Sign up' : 'Sign in')}
                {!isLoading && <ArrowRight className="ml-1 h-3 w-3" />}
              </motion.button>
            </form>

            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-[8px]">
                  <span className="px-1.5 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="inline-flex justify-center items-center py-2 px-4 border border-gray-200 rounded-md shadow-sm bg-white text-[8px] font-medium text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
                  </svg>
                  <span className="ml-2">Sign in with Google</span>
                </motion.button>
              </div>
            </div>

            <div className="mt-5 text-center">
              <p className="text-[8px] text-gray-600">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    // Clear name when switching modes
                    if (isSignUp) {
                      setName('');
                    }
                  }}
                  className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
                >
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;