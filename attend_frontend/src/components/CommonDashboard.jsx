import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, UserCheck, BookOpen, Monitor, ArrowLeft, School, Building, User, LogOut } from 'lucide-react';
import TeacherDashboard from './teacher/TeacherDashboard';
import NewStudentDashboard from './teacher/NewStudentDashboard';
import UltraModernHeader from './UltraModernHeader';

const CommonDashboard = ({ onLogout, userType }) => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('home');

  // Avatar helper functions
  const getAvatarInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (name) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-amber-500',
      'bg-rose-500',
      'bg-indigo-500',
      'bg-teal-500',
      'bg-cyan-500'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const renderDashboard = () => {
    switch (currentView) {
      case 'teacher':
        return <TeacherDashboard onLogout={onLogout} />;
      case 'student':
        return <SimplifiedStudentDashboard onLogout={onLogout} />;
      case 'admin':
        return (
          <div className="flex min-h-screen max-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Ultra Modern Header */}
            <div className="flex-shrink-0 w-full">
              <UltraModernHeader 
                dashboardTitle="School Admin Dashboard"
                userType="Admin"
                userName="Admin User"
                userRole="School Administrator"
                onLogout={onLogout}
              />
            </div>
            
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-8">
              <div className="max-w-4xl w-full mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    School Admin Dashboard
                  </h2>
                  <p className="text-sm text-slate-600 max-w-2xl mx-auto">
                    Manage school-wide attendance, generate comprehensive reports, and oversee academic performance
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                      <School className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">School Administration</h3>
                    <p className="text-slate-600 text-sm mb-4 max-w-2xl">
                      This dashboard will allow you to manage multiple classes, teachers, and students. 
                      You'll be able to generate school-wide reports, monitor attendance trends, and 
                      oversee academic performance across all departments.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-3xl">
                      <div className="bg-slate-50 rounded-xl p-4 border border-blue-300/50">
                        <h4 className="font-bold text-slate-800 mb-1">Attendance Overview</h4>
                        <p className="text-xs text-slate-600">Monitor attendance across all classes</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 border border-green-300/50">
                        <h4 className="font-bold text-slate-800 mb-1">Performance Reports</h4>
                        <p className="text-xs text-slate-600">Generate comprehensive academic reports</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 border border-amber-300/50">
                        <h4 className="font-bold text-slate-800 mb-1">Staff Management</h4>
                        <p className="text-xs text-slate-600">Manage teachers and administrative staff</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'government':
        return (
          <div className="flex min-h-screen max-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Ultra Modern Header */}
            <div className="flex-shrink-0 w-full">
              <UltraModernHeader 
                dashboardTitle="Government Official Dashboard"
                userType="Government"
                userName="Government Official"
                userRole="Education Oversight"
                onLogout={onLogout}
              />
            </div>
            
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-8">
              <div className="max-w-4xl w-full mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Government Official Dashboard
                  </h2>
                  <p className="text-sm text-slate-600 max-w-2xl mx-auto">
                    Monitor educational statistics, attendance trends, and policy implementation across districts
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                      <Building className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Government Oversight</h3>
                    <p className="text-slate-600 text-sm mb-4 max-w-2xl">
                      This dashboard will provide you with district-wide educational insights, 
                      attendance analytics, and policy effectiveness metrics. 
                      Monitor implementation progress and make data-driven decisions.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-3xl">
                      <div className="bg-slate-50 rounded-xl p-4 border border-blue-300/50">
                        <h4 className="font-bold text-slate-800 mb-1">District Analytics</h4>
                        <p className="text-xs text-slate-600">View attendance and performance data</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 border border-purple-300/50">
                        <h4 className="font-bold text-slate-800 mb-1">Policy Impact</h4>
                        <p className="text-xs text-slate-600">Measure effectiveness of initiatives</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 border border-amber-300/50">
                        <h4 className="font-bold text-slate-800 mb-1">Resource Allocation</h4>
                        <p className="text-xs text-slate-600">Track funding and resource distribution</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex min-h-screen max-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Ultra Modern Header */}
            <div className="flex-shrink-0 w-full">
              <UltraModernHeader 
                dashboardTitle="Smart Attendance System"
                userType="User"
                userName="Dashboard User"
                userRole="System User"
                onLogout={onLogout}
                showMenuButton={true}
                isMenuOpen={currentView !== 'home'}
                onMenuToggle={() => setCurrentView('home')}
              />
            </div>
            
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-8">
              <div className="max-w-6xl w-full mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Welcome to Smart Attendance System
                  </h2>
                  <p className="text-sm text-slate-600 max-w-2xl mx-auto">
                    Select a dashboard to manage attendance and track academic performance
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Teacher Dashboard Card */}
                  <div 
                    className="bg-white rounded-2xl p-4 shadow-md border border-slate-100 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    onClick={() => navigate('/teacher')}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-3">
                        <UserCheck className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-2">Teacher Dashboard</h3>
                      <p className="text-slate-600 text-xs mb-3">
                        Manage student attendance, generate reports, and monitor classroom performance
                      </p>
                      <div className="flex items-center gap-1 text-blue-600 font-medium text-sm">
                        <span>Access Dashboard</span>
                        <Monitor className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* Student Dashboard Card */}
                  <div 
                    className="bg-white rounded-2xl p-4 shadow-md border border-slate-100 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    onClick={() => navigate('/student')}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-3">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-2">Student Dashboard</h3>
                      <p className="text-slate-600 text-xs mb-3">
                        Track your attendance, view grades, and monitor your academic progress
                      </p>
                      <div className="flex items-center gap-1 text-green-600 font-medium text-sm">
                        <span>Access Dashboard</span>
                        <Monitor className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* School Admin Dashboard Card */}
                  <div 
                    className="bg-white rounded-2xl p-4 shadow-md border border-slate-100 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    onClick={() => navigate('/admin')}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-3">
                        <School className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-2">School Admin</h3>
                      <p className="text-slate-600 text-xs mb-3">
                        Oversee school-wide operations, manage staff, and generate comprehensive reports
                      </p>
                      <div className="flex items-center gap-1 text-indigo-600 font-medium text-sm">
                        <span>Access Dashboard</span>
                        <Monitor className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* Government Official Dashboard Card */}
                  <div 
                    className="bg-white rounded-2xl p-4 shadow-md border border-slate-100 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    onClick={() => navigate('/government')}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-3">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-2">Government Official</h3>
                      <p className="text-slate-600 text-xs mb-3">
                        Monitor district-wide education metrics, policy impact, and resource allocation
                      </p>
                      <div className="flex items-center gap-1 text-emerald-600 font-medium text-sm">
                        <span>Access Dashboard</span>
                        <Monitor className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2 text-xs text-slate-600">
                    <BookOpen className="w-3 h-3" />
                    <span>Select a dashboard to begin managing attendance and academic performance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen max-h-screen w-full overflow-hidden">
      {currentView !== 'home' && (
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-lg hover:from-slate-600 hover:to-slate-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 border border-slate-400/50 hover:border-slate-300/80 backdrop-blur-sm hover:backdrop-blur-md text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
      )}
      {renderDashboard()}
    </div>
  );
};

export default CommonDashboard;