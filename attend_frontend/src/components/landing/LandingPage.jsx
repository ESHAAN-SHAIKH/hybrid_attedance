import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, ClipboardList, School, UserCheck, FileText, AlertTriangle, Award, TrendingUp, BarChart3, GraduationCap, Shield } from 'lucide-react';

// Import images
import heroImg from '../../assets/images/Gemini_Generated_Image_16f3sj16f3sj16f3.png';
import aboutImg from '../../assets/images/Gemini_Generated_Image_7z63tu7z63tu7z63.png';
import init1 from '../../assets/images/Gemini_Generated_Image_g2fof4g2fof4g2fo.png';
import init2 from '../../assets/images/Gemini_Generated_Image_rgkwz9rgkwz9rgkw.png';
import init3 from '../../assets/images/Gemini_Generated_Image_ug45ezug45ezug45.png';
import feat1 from '../../assets/images/Gemini_Generated_Image_v27mynv27mynv27m.png';
import feat2 from '../../assets/images/Gemini_Generated_Image_16f3sj16f3sj16f3.png';
import feat3 from '../../assets/images/Gemini_Generated_Image_7z63tu7z63tu7z63.png';

const translations = {
    english: {
        welcome: "Welcome to the Future of Education",
        subtitle: "Revolutionizing School Management",
        getStarted: "Get Started",
        login: "Login",
        signup: "Sign Up",
        selectLanguage: "Select Language",
        aboutHeading: "About AttendSmart",
        aboutText: "AttendSmart is a comprehensive government school management platform designed to streamline administrative tasks, enhance communication between teachers, students, and parents, and ensure school safety.",
        teacher: "Teacher Portal",
        student: "Student Portal",
        admin: "School Admin Portal",
        government: "Government Portal",
        statistics: "Key Statistics",
        schoolsEnrolled: "Schools Enrolled",
        activeStudents: "Active Students",
        teachers: "Teachers",
        successRate: "Success Rate",
        digitalIndia: "Digital India Education",
        digitalIndiaDesc: "Empowering schools with modern digital classrooms, interactive learning tools, and seamless integration of national e-education initiatives to enhance teaching effectiveness and student engagement.",
        midDayMeal: "Mid-Day Meal Program",
        midDayMealDesc: "A smart meal-planning system that calculates the exact number of present students and helps prepare the right quantity of food, ensuring zero wastage and efficient meal distribution.",
        safeSchools: "CCTV Attendance Taking",
        safeSchoolsDesc: "AI-powered CCTV system that automatically detects students and marks their attendance in real time, ensuring accuracy without manual intervention.",
        attendance: "Attendance Management",
        attendanceDesc: "A simple and reliable system that records daily attendance digitally and keeps organized logs for teachers and school administration — without tracking or monitoring student movement.",
        homework: "Homework for Students",
        homeworkDesc: "A digital homework panel where teachers can assign daily tasks, and students can easily view their homework in one place.",
        fireAlarm: "Fire Alarm System",
        fireAlarmDesc: "An integrated fire detection and alert system that instantly notifies school staff during emergencies to ensure safety and quick evacuation.",
        teacherDesc: "Manage classes, track student progress, assign homework, mark attendance, and communicate with parents seamlessly.",
        studentDesc: "Access homework assignments, view attendance records, check schedules, and communicate with teachers.",
        adminDesc: "Oversee school operations, manage staff, generate reports, and ensure smooth administrative processes.",
        governmentDesc: "Monitor school performance, access analytics, implement policies, and ensure compliance across institutions.",
    }
};

const LandingPage = () => {
    const navigate = useNavigate();
    const [language, setLanguage] = useState('english');
    const [modalContent, setModalContent] = useState(null);
    const [isAnimating, setIsAnimating] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const t = translations[language];

    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 2);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const dashboardsLanding = [
        { id: 'teacher', icon: Users, title: t.teacher, desc: t.teacherDesc },
        { id: 'student', icon: BookOpen, title: t.student, desc: t.studentDesc },
        { id: 'admin', icon: School, title: t.admin, desc: t.adminDesc },
        { id: 'government', icon: ClipboardList, title: t.government, desc: t.governmentDesc }
    ];

    const openModal = (content) => {
        setModalContent(content);
    };

    const closeModal = () => {
        setModalContent(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" style={{ background: 'linear-gradient(to bottom right, #E3F2FD, #ffffff)' }}>
            {/* Header */}
            <header className="shadow-sm" style={{ backgroundColor: '#0E61E7' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <School className="w-8 h-8 text-white" />
                        <span className="text-2xl font-bold text-white">AttendSmart</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="px-4 py-2 border-2 rounded-lg bg-white font-semibold hover:shadow-md transition-all focus:outline-none focus:ring-2"
                            style={{ color: '#0E61E7', borderColor: '#0E61E7', fontSize: '14px', fontWeight: '600' }}
                        >
                            <option value="english">English</option>
                            <option value="punjabi">ਪੰਜਾਬੀ</option>
                            <option value="hindi">हिन्दी</option>
                        </select>
                        <button
                            onClick={() => navigate('/login')}
                            className="px-4 py-2 text-white hover:opacity-80 transition-colors"
                        >
                            {t.login}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    <div className={`space-y-6 ${isAnimating ? 'animate-fadeInUp' : ''}`}>
                        <h1 className="text-5xl font-bold leading-tight" style={{ color: '#0E61E7' }}>
                            {t.welcome}
                        </h1>
                        <p className="text-2xl text-gray-600">
                            {t.subtitle}
                        </p>
                        <button
                            onClick={() => navigate('/register')}
                            className="px-8 py-4 text-white text-lg rounded-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
                            style={{ backgroundColor: '#0E61E7' }}
                        >
                            Register Your School
                        </button>
                    </div>

                    <div className={`${isAnimating ? 'animate-fadeInRight' : ''}`}>
                        <div className="rounded-2xl shadow-2xl overflow-hidden min-h-[500px] relative group">
                            <img
                                src={heroImg}
                                alt="Government School Management"
                                className="w-full h-full object-cover"
                                style={{ minHeight: '500px' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h3 className="text-3xl font-bold mb-2">Government School Management</h3>
                                <p className="text-lg">Transforming Education in India</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Section */}
                <div className={`mb-16 ${isAnimating ? 'animate-fadeInUp' : ''}`}>
                    <h2 className="text-4xl font-bold text-center mb-4" style={{ color: '#0E61E7' }}>{t.statistics}</h2>
                    <p className="text-center text-gray-600 mb-12 text-lg">Real impact across rural India</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 animate-fadeInUp" style={{ borderColor: '#36B37E', animationDelay: '0.1s' }}>
                            <School className="w-12 h-12 mx-auto mb-3" style={{ color: '#36B37E' }} />
                            <p className="text-4xl font-bold" style={{ color: '#0E61E7' }}>0</p>
                            <p className="text-gray-600 mt-2 font-medium">{t.schoolsEnrolled}</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 animate-fadeInUp" style={{ borderColor: '#FFA726', animationDelay: '0.2s' }}>
                            <GraduationCap className="w-12 h-12 mx-auto mb-3" style={{ color: '#FFA726' }} />
                            <p className="text-4xl font-bold" style={{ color: '#0E61E7' }}>0</p>
                            <p className="text-gray-600 mt-2 font-medium">{t.activeStudents}</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 animate-fadeInUp" style={{ borderColor: '#7E57C2', animationDelay: '0.3s' }}>
                            <Users className="w-12 h-12 mx-auto mb-3" style={{ color: '#7E57C2' }} />
                            <p className="text-4xl font-bold" style={{ color: '#0E61E7' }}>0</p>
                            <p className="text-gray-600 mt-2 font-medium">{t.teachers}</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 animate-fadeInUp" style={{ borderColor: '#4CAF50', animationDelay: '0.4s' }}>
                            <TrendingUp className="w-12 h-12 mx-auto mb-3" style={{ color: '#4CAF50' }} />
                            <p className="text-4xl font-bold" style={{ color: '#0E61E7' }}>0%</p>
                            <p className="text-gray-600 mt-2 font-medium">{t.successRate}</p>
                        </div>
                    </div>
                </div>

                {/* Key Features Section */}
                <div className={`mb-16 ${isAnimating ? 'animate-fadeInUp' : ''}`}>
                    <h2 className="text-4xl font-bold text-center mb-4" style={{ color: '#0E61E7' }}>Key Features</h2>
                    <p className="text-center text-gray-600 mb-12 text-lg">Comprehensive tools for school management</p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: BarChart3, title: t.digitalIndia, desc: t.digitalIndiaDesc, color: '#0E61E7', bgColor: '#E3F2FD', img: init2 },
                            { icon: Award, title: t.midDayMeal, desc: t.midDayMealDesc, color: '#36B37E', bgColor: '#E8F5E9', img: init1 },
                            { icon: Shield, title: t.safeSchools, desc: t.safeSchoolsDesc, color: '#FFA726', bgColor: '#FFF3E0', img: init3 },
                            { icon: UserCheck, title: t.attendance, desc: t.attendanceDesc, color: '#0E61E7', bgColor: '#E3F2FD', img: feat1 },
                            { icon: FileText, title: t.homework, desc: t.homeworkDesc, color: '#FFA726', bgColor: '#FFF3E0', img: feat2 },
                            { icon: AlertTriangle, title: t.fireAlarm, desc: t.fireAlarmDesc, color: '#7E57C2', bgColor: '#F3E5F5', img: feat3 }
                        ].map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <img
                                        src={feature.img}
                                        alt={feature.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: feature.bgColor }}>
                                                <Icon className="w-6 h-6" style={{ color: feature.color }} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold mb-2" style={{ color: '#0E61E7' }}>{feature.title}</h3>
                                                <p className="text-gray-600 text-sm">{feature.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Portals Section */}
                <div className={`mb-16 ${isAnimating ? 'animate-fadeInUp' : ''}`}>
                    <h2 className="text-4xl font-bold text-center mb-4" style={{ color: '#0E61E7' }}>Portals</h2>
                    <p className="text-center text-gray-600 mb-12 text-lg">Dedicated access for different user roles</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {dashboardsLanding.map((dashboard, index) => {
                            const Icon = dashboard.icon;
                            const colors = ['#36B37E', '#FFA726', '#7E57C2', '#0E61E7'];
                            const bgColor = colors[index % colors.length];
                            return (
                                <div
                                    key={dashboard.id}
                                    className={`rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105 ${isAnimating ? 'animate-fadeInUp' : ''}`}
                                    style={{ animationDelay: `${index * 0.1}s`, backgroundColor: bgColor }}
                                    onClick={() => openModal(dashboard)}
                                >
                                    <Icon className="w-12 h-12 text-white mb-4 mx-auto" />
                                    <h3 className="text-xl font-semibold text-white text-center">
                                        {dashboard.title}
                                    </h3>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>

            {/* Modal */}
            {modalContent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-fadeInUp" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center mb-6">
                            {modalContent.icon && React.createElement(modalContent.icon, { className: "w-12 h-12 mr-4", style: { color: '#0E61E7' } })}
                            <h3 className="text-2xl font-bold" style={{ color: '#0E61E7' }}>{modalContent.title}</h3>
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                            {modalContent.desc}
                        </p>
                        <button
                            onClick={closeModal}
                            className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-colors w-full"
                            style={{ backgroundColor: '#0E61E7' }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out;
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.3s ease-out;
        }
      `}</style>
        </div>
    );
};

export default LandingPage;
