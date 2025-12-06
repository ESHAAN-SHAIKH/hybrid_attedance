import React, { useState, useEffect } from 'react';
import { Home, FileText, Award, AlertCircle, Settings, User, LogOut, Users, CheckCircle, Clock, TrendingUp, X, BookOpen, Calculator, FlaskConical, PenTool, Globe, Music, Palette, Edit, RefreshCw, UserCheck, Calendar, Bot } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import UltraModernHeader from '../UltraModernHeader';
import ParticleBackground from '../ParticleBackground';
import RoleChatbot from '../chatbot/RoleChatbot';

const SimplifiedStudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Set active tab based on current route
  const getActiveTabFromRoute = () => {
    const path = location.pathname;
    if (path.includes('/classes')) return 'classes';
    if (path.includes('/attendance')) return 'attendance';
    if (path.includes('/assignments')) return 'assignments';
    if (path.includes('/grades')) return 'grades';
    if (path.includes('/notices')) return 'notices';
    if (path.includes('/chatbot')) return 'chatbot';
    if (path.includes('/settings')) return 'settings';
    return 'home';
  };

  const [activeTab, setActiveTab] = useState(getActiveTabFromRoute());

  // Update active tab when route changes
  useEffect(() => {
    setActiveTab(getActiveTabFromRoute());
  }, [location]);

  // Handle tab navigation
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/student/${tab}`);
  };

  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [studentAvatar, setStudentAvatar] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=ffffff&radius=50');

  // Date range filter state for attendance
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Settings state
  const [settings, setSettings] = useState({
    privacy: {
      profileVisibility: 'friends',
      activityStatus: true
    },
    appearance: {
      theme: 'light',
      language: 'en'
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true
    }
  });

  // Sample data for classes - in a real app, this would come from an API or context
  const classData = [
    { id: 1, name: 'Mathematics', teacher: 'Mr. Johnson', period: '2nd', students: 32, room: '204', subject: 'Mathematics' },
    { id: 2, name: 'Science', teacher: 'Dr. Smith', period: '3rd', students: 30, room: '301', subject: 'Science' },
    { id: 3, name: 'English', teacher: 'Ms. Williams', period: '1st', students: 31, room: '105', subject: 'English' },
    { id: 4, name: 'History', teacher: 'Mr. Brown', period: '4th', students: 29, room: '208', subject: 'History' },
    { id: 5, name: 'Geography', teacher: 'Mrs. Davis', period: '5th', students: 30, room: '305', subject: 'Geography' },
    { id: 6, name: 'Art', teacher: 'Ms. Taylor', period: '6th', students: 28, room: 'Art Hall', subject: 'Art' }
  ];

  // Helper function to get class count
  const getClassCount = () => {
    return classData.length;
  };

  // Helper function to get subject list
  const getSubjectList = () => {
    const subjects = classData.map(cls => cls.subject);
    return subjects.join(', ');
  };

  // Helper functions for attendance data
  const getOverallAttendance = () => {
    return studentData.attendancePercentage;
  };

  const getPerfectStreak = () => {
    // Calculate perfect streak based on present days
    return studentData.presentDays - studentData.absentDays - studentData.lateDays;
  };

  const getLateEntries = () => {
    return studentData.lateDays;
  };

  // Function to filter attendance records by date range
  const filterAttendanceRecords = (records) => {
    if (!startDate || !endDate) return records;

    return records.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= new Date(startDate) && recordDate <= new Date(endDate);
    });
  };

  // Function to handle date range filter application
  const applyDateFilter = () => {
    // The filter is applied automatically through the filterAttendanceRecords function
    console.log('Date filter applied:', startDate, endDate);
  };

  // Function to reset date filter
  const resetDateFilter = () => {
    setStartDate('');
    setEndDate('');
  };

  // Fetch student data from API
  useEffect(() => {
    const fetchStudentData = async () => {
      if (user && user.id) {
        try {
          // 1. Fetch Profile and Attendance Data concurrently
          const [profileRes, attendanceRes, noticesRes] = await Promise.all([
            api.get(`/students/${user.id}`), // Assuming user.id is student_id (Roll No) or we fetch by _id if needed. controller typically finds by student_id or _id logic.
            api.get(`/attendance/student/${user.id}`),
            api.get('/notices')
          ]);

          let studentInfo = {};
          if (profileRes.data.success) {
            studentInfo = profileRes.data.data;
          }

          if (attendanceRes.data.success) {
            const records = attendanceRes.data.data;

            // Calculate stats
            const totalRecords = records.length;
            const present = records.filter(as => as.method).length; // Check what constitutes 'present' - if record exists, they are present usually, unless marked 'absent' explicitly. The system records 'RFID'/'FACE' -> present.
            // Wait, absent days are usually NOT recorded in `Attendance` table which only logs punches.
            // So we need to calculate absent days based on School Days vs Present Days.
            // For simplicity in this iteration, we assume 100 school days or derive from logs.
            // Better: 'Absent' is derived.
            // Let's use records directly for list.

            // Transform records for display
            const formattedRecords = records.map(record => ({
              date: new Date(record.timestamp).toISOString().split('T')[0],
              day: new Date(record.timestamp).toLocaleDateString('en-US', { weekday: 'long' }),
              status: 'present', // If in DB, it's present
              time: new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              remarks: record.method === 'FACE' ? 'Face Auth' : 'RFID Auth'
            }));

            // Filter notices for students
            const studentNotices = noticesRes.data.data.filter(n => n.audience === 'Student' || n.audience === 'All');

            setStudentData(prev => ({
              ...prev,
              name: studentInfo.name || prev.name,
              class: studentInfo.class || prev.class,
              rollNumber: studentInfo.student_id || prev.rollNumber,
              // Simple calculation: Since we only have present records, assume 100% for now if records exist
              attendancePercentage: records.length > 0 ? 100 : 0,
              presentDays: records.length,
              // Update other fields
            }));

            setAttendanceRecords(formattedRecords);
            setNotices(studentNotices);
          }

        } catch (error) {
          console.error('Failed to fetch student data:', error);
        }
      }
    };

    fetchStudentData();
  }, [user]);

  // State for attendance records and notices
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [notices, setNotices] = useState([]);

  // Sample data
  const initialStudentData = {
    name: "Sarah Johnson",
    class: "Class 10-A",
    rollNumber: "24",
    attendancePercentage: 92,
    presentDays: 42,
    absentDays: 3,
    lateDays: 1,
    currentGrade: "A-",
    gpa: "3.8"
  };

  const [studentData, setStudentData] = useState(initialStudentData);
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    class: "Class 10-A",
    rollNumber: "24"
  });

  const assignments = [
    { id: 1, subject: "Mathematics", title: "Chapter 5 Exercises", due: "2024-04-17", dueDisplay: "Apr 17, 2024", status: "pending", priority: "high" },
    { id: 2, subject: "Science", title: "Lab Report - Photosynthesis", due: "2024-04-18", dueDisplay: "Apr 18, 2024", status: "pending", priority: "medium" },
    { id: 3, subject: "English", title: "Essay on Shakespeare", due: "2024-04-20", dueDisplay: "Apr 20, 2024", status: "submitted", priority: "low" },
    { id: 4, subject: "Geography", title: "World Climate Patterns", due: "2024-04-22", dueDisplay: "Apr 22, 2024", status: "pending", priority: "medium" },
    { id: 5, subject: "Music", title: "Instrument Research Paper", due: "2024-04-25", dueDisplay: "Apr 25, 2024", status: "pending", priority: "low" },
    { id: 6, subject: "Art", title: "Abstract Painting Project", due: "2024-04-28", dueDisplay: "Apr 28, 2024", status: "submitted", priority: "high" }
  ];

  const summaryStats = [
    { label: 'Attendance', value: `${studentData.attendancePercentage}%`, icon: CheckCircle, color: 'from-blue-600 to-indigo-500', change: '+2.1%' },
    { label: 'Current Grade', value: studentData.currentGrade, icon: Award, color: 'from-indigo-500 to-purple-600', change: '+0.3' },
    { label: 'Behavior', value: 'Good', icon: UserCheck, color: 'from-indigo-500 to-blue-600', change: '+1' },
    { label: 'Assignments', value: assignments.filter(a => a.status === 'pending').length, icon: FileText, color: 'from-indigo-600 to-indigo-500', change: '-1' },
  ];

  // Sample avatars
  const sampleAvatars = [
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=ffffff&radius=50`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Emma&backgroundColor=ffffff&radius=50`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=John&backgroundColor=ffffff&radius=50`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Mia&backgroundColor=ffffff&radius=50`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=ffffff&radius=50`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=ffffff&radius=50`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Michael&backgroundColor=ffffff&radius=50`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia&backgroundColor=ffffff&radius=50`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=James&backgroundColor=ffffff&radius=50`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia&backgroundColor=ffffff&radius=50`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=William&backgroundColor=ffffff&radius=50`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Ava&backgroundColor=ffffff&radius=50`
  ];

  // Handle settings changes
  const handlePrivacyChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [setting]: value
      }
    }));
  };

  const handleAppearanceChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [setting]: value
      }
    }));
  };

  const handleSecurityChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [setting]: !prev.security[setting]
      }
    }));
  };

  // Reset settings to default
  const resetSettings = () => {
    setSettings({
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      privacy: {
        profileVisibility: 'friends',
        activityStatus: true
      },
      appearance: {
        theme: 'light',
        language: 'en'
      },
      security: {
        twoFactorAuth: false,
        loginAlerts: true
      }
    });
    alert('Settings have been reset to default values!');
  };

  return (
    <div className="flex min-h-screen h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
      <ParticleBackground />
      {/* Sidebar - Reduced size by 1 unit */}
      <div className="w-52 bg-white shadow-lg flex flex-col h-full">
        <div className="p-2.5 border-b border-gray-100">
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <img
                src={studentAvatar}
                alt="Student Avatar"
                className="w-7 h-7 rounded-md object-cover shadow-md cursor-pointer"
                onClick={() => setShowAvatarModal(true)}
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent truncate block">
                  {studentData.name}
                </span>
              </div>
              <p className="text-[10px] text-gray-500 truncate">{studentData.class}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-2 pt-0 space-y-0.5 overflow-y-auto">
          {[
            { id: 'home', icon: Home, label: 'Dashboard Home' },
            { id: 'classes', icon: BookOpen, label: 'My Classes' },
            { id: 'attendance', icon: UserCheck, label: 'Attendance' },
            { id: 'assignments', icon: FileText, label: 'Assignments' },
            { id: 'grades', icon: Award, label: 'Grades' },
            { id: 'notices', icon: AlertCircle, label: 'Important Notices' },
            { id: 'chatbot', icon: Bot, label: 'Chatbot' },
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md transition-all ${activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
            >
              <tab.icon className="w-3 h-3" />
              <span className="font-medium text-[11px]">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-gray-100 space-y-1">
          <button
            onClick={() => setShowAvatarModal(true)}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all"
          >
            <User className="w-3 h-3" />
            <span className="font-medium text-[11px]">Change Avatar</span>
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut className="w-3 h-3" />
            <span className="font-medium text-[11px]">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto overscroll-contain flex flex-col h-full">
        {/* Ultra Modern Header - Matching teacher dashboard exactly */}
        <div className="flex-shrink-0">
          <UltraModernHeader
            dashboardTitle="Student Dashboard"
            userType="Student"
            userName={studentData.name}
            userRole={`${studentData.class} • Roll #${studentData.rollNumber}`}
            onLogout={logout}
          />
        </div>

        {/* Dashboard Content */}
        <div className="p-5 flex-grow overflow-y-auto">
          {/* Home Tab */}
          {activeTab === 'home' && (
            <div>
              {/* Welcome Banner - Matching teacher dashboard style with image avatar */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-5 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden -mt-5">
                {/* Geometric background elements */}
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute top-3 right-3 w-6 h-6 bg-white/10 rotate-45"></div>
                <div className="absolute bottom-3 left-3 w-5 h-5 bg-white/20 rounded-full"></div>

                <div className="relative z-10 flex items-center gap-2.5">
                  <div className="relative">
                    <img
                      src={studentAvatar}
                      alt="Student Avatar"
                      className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-white/30 cursor-pointer"
                      onClick={() => setShowAvatarModal(true)}
                    />
                  </div>
                  <div>
                    <h2 className="text-[13px] font-bold text-white mb-1">
                      Welcome back, {studentData.name.split(' ')[1]}! 👋
                    </h2>
                    <p className="text-blue-100 text-[11px] mb-1">
                      {studentData.class} • Roll #{studentData.rollNumber}
                    </p>
                    <p className="text-blue-100 text-[11px]">
                      Behavior: Good • Attendance: {studentData.attendancePercentage}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Summary Stats - Enhanced with interactive elements and better design */}
              <div className="flex gap-3 mb-5 flex-wrap">
                {summaryStats.map((stat, index) => (
                  <div key={index} className={`flex-grow bg-gradient-to-br ${stat.color} rounded-lg p-3 shadow-sm border border-white/30 backdrop-blur-sm text-white relative overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-md`}>
                    {/* Geometric design elements */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                    <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-white/10 rounded-full"></div>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-white/10 rotate-45"></div>
                    <div className="flex items-center justify-between relative z-10">
                      <div>
                        <p className="text-blue-100 text-[11px] flex items-center gap-1">
                          <stat.icon className="w-3 h-3" />
                          {stat.label}
                        </p>
                        <p className="text-xl font-bold mt-1">{stat.value}</p>
                        <p className="text-blue-100 text-[9px] mt-1 flex items-center gap-1">
                          <TrendingUp className="w-2.5 h-2.5" />
                          {stat.change} from last week
                        </p>
                      </div>
                      <div className="bg-white/20 rounded-full p-2 backdrop-blur-sm">
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Assignments Table - With new colors and geometric designs */}
              <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden relative mt-5">
                {/* Geometric background elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-500"></div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-indigo-500/10 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500/10 rounded-full"></div>
                <div className="absolute top-6 right-6 w-6 h-6 bg-indigo-500/20 rotate-45"></div>

                <div className="overflow-x-auto relative z-10">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <tr>
                        <th scope="col" className="px-3 py-2 text-left text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">Assignment</th>
                        <th scope="col" className="px-3 py-2 text-left text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">Subject</th>
                        <th scope="col" className="px-3 py-2 text-left text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">Due Date</th>
                        <th scope="col" className="px-3 py-2 text-left text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">Priority</th>
                        <th scope="col" className="px-3 py-2 text-left text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {assignments.map((assignment) => {
                        // Map subjects to icons
                        const subjectIcons = {
                          'Mathematics': Calculator,
                          'Science': FlaskConical,
                          'English': PenTool,
                          'Geography': Globe,
                          'Music': Music,
                          'Art': Palette
                        };

                        const SubjectIcon = subjectIcons[assignment.subject] || BookOpen;

                        // Map assignment types to icons
                        const assignmentTypeIcons = {
                          'Exercises': FileText,
                          'Report': FileText,
                          'Essay': PenTool,
                          'Paper': FileText,
                          'Project': Palette,
                          'Patterns': Globe
                        };

                        // Extract assignment type from title for icon mapping
                        const assignmentType = assignment.title.split(' - ')[0] || assignment.title.split(' ')[0];
                        const AssignmentIcon = assignmentTypeIcons[assignmentType] || FileText;

                        return (
                          <tr key={assignment.id} className="hover:bg-indigo-50/50 transition-all duration-200">
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <div className="flex items-center">
                                <AssignmentIcon className="w-3 h-3 text-indigo-500 mr-2" />
                                <div className="text-[10px] font-medium text-gray-900">{assignment.title}</div>
                              </div>
                            </td>
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <div className="flex items-center">
                                <SubjectIcon className="w-3 h-3 text-indigo-500 mr-2" />
                                <div className="text-[10px] text-gray-800">{assignment.subject}</div>
                              </div>
                            </td>
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 text-indigo-500 mr-2" />
                                <div className="text-[10px] text-gray-800">{assignment.dueDisplay}</div>
                              </div>
                            </td>
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <span className={`px-1.5 py-0.5 text-[8px] font-semibold rounded-full inline-flex items-center ${assignment.priority === 'high' ? 'bg-red-100 text-red-800 border border-red-200' : assignment.priority === 'medium' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-green-100 text-green-800 border border-green-200'}`}>
                                <div className={`w-1 h-1 rounded-full mr-1 ${assignment.priority === 'high' ? 'bg-red-500' : assignment.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'}`}></div>
                                {assignment.priority.charAt(0).toUpperCase() + assignment.priority.slice(1)}
                              </span>
                            </td>
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <span className={`px-1.5 py-0.5 text-[8px] font-semibold rounded-full inline-flex items-center ${assignment.status === 'submitted' ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' : assignment.status === 'graded' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-amber-100 text-amber-800 border border-amber-200'}`}>
                                {assignment.status === 'submitted' ? (
                                  <CheckCircle className="w-2.5 h-2.5 mr-1" />
                                ) : assignment.status === 'graded' ? (
                                  <Award className="w-2.5 h-2.5 mr-1" />
                                ) : (
                                  <Clock className="w-2.5 h-2.5 mr-1" />
                                )}
                                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'assignments' && (
            <div>
              {/* Banner for Assignments Section */}
              <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 rounded-lg p-4 mb-5 shadow-md backdrop-blur-sm border border-white/20 relative overflow-hidden -mt-5">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 rotate-45"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-bold text-white mb-1">My Assignments</h2>
                    <p className="text-blue-100 text-xs mb-2">Manage your tasks and track progress</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{assignments.length} Total</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{assignments.filter(a => a.status === 'submitted' || a.status === 'graded').length} Completed</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-amber-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{assignments.filter(a => a.status === 'pending').length} Pending</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 rounded-lg p-2">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Assignment Status Cards in Single Row - Updated colors and geometric designs */}
              <div className="flex gap-5 mb-7">
                <div className="flex-1 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-md p-4 shadow-sm border border-blue-200/30 backdrop-blur-sm text-white relative overflow-hidden">
                  {/* Geometric design elements */}
                  <div className="absolute -top-5 -right-5 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-5 -left-5 w-14 h-14 bg-white/10 rounded-full"></div>
                  <div className="absolute top-3.5 right-3.5 w-5.5 h-5.5 bg-white/20 rotate-45"></div>

                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-blue-100 text-[11px]">Total Assignments</p>
                      <p className="text-xl font-bold mt-2.5">{assignments.length}</p>
                    </div>
                    <FileText className="w-7 h-7 text-blue-200" />
                  </div>
                </div>

                <div className="flex-1 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md p-4 shadow-sm border border-indigo-200/30 backdrop-blur-sm text-white relative overflow-hidden">
                  {/* Geometric design elements */}
                  <div className="absolute -top-5 -right-5 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-5 -left-5 w-14 h-14 bg-white/10 rounded-full"></div>
                  <div className="absolute top-3.5 right-3.5 w-5.5 h-5.5 bg-white/20 rotate-45"></div>

                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-indigo-100 text-[11px]">Completed</p>
                      <p className="text-xl font-bold mt-2.5">{assignments.filter(a => a.status === 'submitted' || a.status === 'graded').length}</p>
                    </div>
                    <CheckCircle className="w-7 h-7 text-indigo-200" />
                  </div>
                </div>

                <div className="flex-1 bg-gradient-to-br from-violet-600 to-purple-500 rounded-md p-4 shadow-sm border border-violet-200/30 backdrop-blur-sm text-white relative overflow-hidden">
                  {/* Geometric design elements */}
                  <div className="absolute -top-5 -right-5 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-5 -left-5 w-14 h-14 bg-white/10 rounded-full"></div>
                  <div className="absolute top-3.5 right-3.5 w-5.5 h-5.5 bg-white/20 rotate-45"></div>

                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-violet-100 text-[11px]">Pending</p>
                      <p className="text-xl font-bold mt-2.5">{assignments.filter(a => a.status === 'pending').length}</p>
                    </div>
                    <Clock className="w-7 h-7 text-violet-200" />
                  </div>
                </div>

                <div className="flex-1 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-md p-4 shadow-sm border border-indigo-200/30 backdrop-blur-sm text-white relative overflow-hidden">
                  {/* Geometric design elements */}
                  <div className="absolute -top-5 -right-5 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-5 -left-5 w-14 h-14 bg-white/10 rounded-full"></div>
                  <div className="absolute top-3.5 right-3.5 w-5.5 h-5.5 bg-white/20 rotate-45"></div>

                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-indigo-100 text-[11px]">High Priority</p>
                      <p className="text-xl font-bold mt-2.5">{assignments.filter(a => a.priority === 'high').length}</p>
                    </div>
                    <AlertCircle className="w-7 h-7 text-indigo-200" />
                  </div>
                </div>
              </div>

              {/* Assignments Table - With new colors and geometric designs */}
              <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden relative">
                {/* Geometric background elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-500"></div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-indigo-500/10 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500/10 rounded-full"></div>
                <div className="absolute top-6 right-6 w-6 h-6 bg-indigo-500/20 rotate-45"></div>

                <div className="overflow-x-auto relative z-10">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <tr>
                        <th scope="col" className="px-3 py-2 text-left text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">Assignment</th>
                        <th scope="col" className="px-3 py-2 text-left text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">Subject</th>
                        <th scope="col" className="px-3 py-2 text-left text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">Due Date</th>
                        <th scope="col" className="px-3 py-2 text-left text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">Priority</th>
                        <th scope="col" className="px-3 py-2 text-left text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {assignments.map((assignment) => {
                        // Map subjects to icons
                        const subjectIcons = {
                          'Mathematics': Calculator,
                          'Science': FlaskConical,
                          'English': PenTool,
                          'Geography': Globe,
                          'Music': Music,
                          'Art': Palette
                        };

                        const SubjectIcon = subjectIcons[assignment.subject] || BookOpen;

                        // Map assignment types to icons
                        const assignmentTypeIcons = {
                          'Exercises': FileText,
                          'Report': FileText,
                          'Essay': PenTool,
                          'Paper': FileText,
                          'Project': Palette,
                          'Patterns': Globe
                        };

                        // Extract assignment type from title for icon mapping
                        const assignmentType = assignment.title.split(' - ')[0] || assignment.title.split(' ')[0];
                        const AssignmentIcon = assignmentTypeIcons[assignmentType] || FileText;

                        return (
                          <tr key={assignment.id} className="hover:bg-indigo-50/50 transition-all duration-200">
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <div className="flex items-center">
                                <AssignmentIcon className="w-3 h-3 text-indigo-500 mr-2" />
                                <div className="text-[10px] font-medium text-gray-900">{assignment.title}</div>
                              </div>
                            </td>
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <div className="flex items-center">
                                <SubjectIcon className="w-3 h-3 text-indigo-500 mr-2" />
                                <div className="text-[10px] text-gray-800">{assignment.subject}</div>
                              </div>
                            </td>
                            <td className="px-3 py-2.5 whitespace-nowrap text-[10px] text-gray-800">{assignment.dueDisplay}</td>
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <span className={`px-1.5 py-0.5 text-[8px] font-semibold rounded-full inline-flex items-center ${assignment.priority === 'high' ? 'bg-red-100 text-red-800 border border-red-200' : assignment.priority === 'medium' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-green-100 text-green-800 border border-green-200'}`}>
                                <div className={`w-1 h-1 rounded-full mr-1 ${assignment.priority === 'high' ? 'bg-red-500' : assignment.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'}`}></div>
                                {assignment.priority.charAt(0).toUpperCase() + assignment.priority.slice(1)}
                              </span>
                            </td>
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <span className={`px-1.5 py-0.5 text-[8px] font-semibold rounded-full inline-flex items-center ${assignment.status === 'submitted' ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' : assignment.status === 'graded' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-amber-100 text-amber-800 border border-amber-200'}`}>
                                {assignment.status === 'submitted' ? (
                                  <CheckCircle className="w-2.5 h-2.5 mr-1" />
                                ) : assignment.status === 'graded' ? (
                                  <Award className="w-2.5 h-2.5 mr-1" />
                                ) : (
                                  <Clock className="w-2.5 h-2.5 mr-1" />
                                )}
                                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div>
              {/* Banner for Attendance Section */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-5 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden -mt-5">
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute top-4 right-4 w-7 h-7 bg-white/10 rotate-45"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-bold text-white mb-1.5">Attendance Records</h2>
                    <p className="text-xs text-blue-100 mb-2">Track your attendance and punctuality</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{getOverallAttendance()}% Overall</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{getPerfectStreak()} Perfect Streak</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-amber-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{getLateEntries()} Late Entries</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 rounded-md p-2">
                      <UserCheck className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Attendance Summary Cards - Enhanced design */}
              <div className="grid grid-cols-4 gap-3 mb-7">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-500 rounded-md p-3 shadow-sm border border-blue-200/30 backdrop-blur-sm text-white relative overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-md">
                  <div className="absolute -top-5 -right-5 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-5 -left-5 w-14 h-14 bg-white/10 rounded-full"></div>
                  {/* Additional geometric elements */}
                  <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border border-white/20 rotate-45"></div>
                  <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 bg-white/10 rounded-full"></div>
                  <div className="absolute top-7 left-3.5 w-4.5 h-4.5 border border-white/15"></div>
                  <div className="absolute bottom-5.5 right-3.5 w-2.5 h-2.5 bg-white/10 rotate-45"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-[11px] text-blue-100 flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5" />
                        Overall Attendance
                      </p>
                      <p className="text-2xl font-bold mt-2">{getOverallAttendance()}%</p>
                      <p className="text-blue-100 text-[9px] mt-1">Excellent performance</p>
                    </div>
                    <div className="bg-white/20 rounded-full p-2 backdrop-blur-sm">
                      <UserCheck className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md p-4 shadow-sm border border-indigo-200/30 backdrop-blur-sm text-white relative overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-md">
                  <div className="absolute -top-5 -right-5 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-5 -left-5 w-14 h-14 bg-white/10 rounded-full"></div>
                  {/* Additional geometric elements */}
                  <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border border-white/20 rotate-45"></div>
                  <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 bg-white/10 rounded-full"></div>
                  <div className="absolute top-7 left-3.5 w-4.5 h-4.5 border border-white/15"></div>
                  <div className="absolute bottom-5.5 right-3.5 w-2.5 h-2.5 bg-white/10 rotate-45"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-[11px] text-indigo-100 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        This Month
                      </p>
                      <p className="text-2xl font-bold mt-2">95%</p>
                      <p className="text-indigo-100 text-[9px] mt-1">Consistent attendance</p>
                    </div>
                    <div className="bg-white/20 rounded-full p-2 backdrop-blur-sm">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-violet-600 to-purple-500 rounded-md p-4 shadow-sm border border-violet-200/30 backdrop-blur-sm text-white relative overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-md">
                  <div className="absolute -top-5 -right-5 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-5 -left-5 w-14 h-14 bg-white/10 rounded-full"></div>
                  {/* Additional geometric elements */}
                  <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border border-white/20 rotate-45"></div>
                  <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 bg-white/10 rounded-full"></div>
                  <div className="absolute top-7 left-3.5 w-4.5 h-4.5 border border-white/15"></div>
                  <div className="absolute bottom-5.5 right-3.5 w-2.5 h-2.5 bg-white/10 rotate-45"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-[11px] text-violet-100 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Late Entries
                      </p>
                      <p className="text-2xl font-bold mt-2">{getLateEntries()}</p>
                      <p className="text-violet-100 text-[9px] mt-1">This month</p>
                    </div>
                    <div className="bg-white/20 rounded-full p-2 backdrop-blur-sm">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md p-4 shadow-sm border border-blue-200/30 backdrop-blur-sm text-white relative overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-md">
                  <div className="absolute -top-5 -right-5 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-5 -left-5 w-14 h-14 bg-white/10 rounded-full"></div>
                  {/* Additional geometric elements */}
                  <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border border-white/20 rotate-45"></div>
                  <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 bg-white/10 rounded-full"></div>
                  <div className="absolute top-7 left-3.5 w-4.5 h-4.5 border border-white/15"></div>
                  <div className="absolute bottom-5.5 right-3.5 w-2.5 h-2.5 bg-white/10 rotate-45"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-[11px] text-blue-100 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        Perfect Streak
                      </p>
                      <p className="text-2xl font-bold mt-2">{getPerfectStreak()} days</p>
                      <p className="text-blue-100 text-[9px] mt-1">Consecutive perfect</p>
                    </div>
                    <div className="bg-white/20 rounded-full p-2 backdrop-blur-sm">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Attendance Chart - Enhanced Visualization */}
              <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4 mb-6 relative overflow-hidden">
                {/* Geometric background elements */}
                <div className="absolute top-0 right-0 w-20 h-20">
                  <div className="absolute top-2 right-2 w-3 h-3 border border-blue-500/10 rotate-45"></div>
                  <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-500/5 rounded-full"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-20 h-20">
                  <div className="absolute bottom-2 left-2 w-2 h-2 bg-blue-500/10 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-3 h-3 border border-indigo-500/10"></div>
                </div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <h3 className="font-bold text-gray-900 text-[11px]">Weekly Attendance</h3>
                  <div className="flex gap-1">
                    <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[9px] font-medium rounded-full">Last 7 Days</span>
                  </div>
                </div>
                <div className="flex items-end justify-between h-24 gap-1 mt-4">
                  {[
                    { day: 'Mon', status: 'present', date: '01' },
                    { day: 'Tue', status: 'absent', date: '02' },
                    { day: 'Wed', status: 'present', date: '03' },
                    { day: 'Thu', status: 'present', date: '04' },
                    { day: 'Fri', status: 'present', date: '05' },
                    { day: 'Sat', status: 'holiday', date: '06' },
                    { day: 'Sun', status: 'holiday', date: '07' }
                  ].map((day, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="text-[7px] text-gray-500 mb-1">{day.day}</div>
                      <div className="text-[7px] text-gray-400 mb-1">{day.date}</div>
                      <div
                        className={`w-full rounded-t flex items-center justify-center ${day.status === 'present'
                          ? 'bg-gradient-to-t from-blue-500 to-indigo-500 h-full'
                          : day.status === 'absent'
                            ? 'bg-gradient-to-t from-indigo-500 to-purple-500 h-3/4'
                            : 'bg-gradient-to-t from-purple-400 to-blue-400 h-1/2'
                          }`}
                      >
                        {day.status === 'present' ? (
                          <CheckCircle className="w-3 h-3 text-white" />
                        ) : day.status === 'absent' ? (
                          <X className="w-3 h-3 text-white" />
                        ) : (
                          <Calendar className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-3 mt-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-[8px] text-gray-600">Present</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-[8px] text-gray-600">Absent</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-[8px] text-gray-600">Holiday</span>
                  </div>
                </div>
              </div>

              {/* 6-Month Attendance Trend - Enhanced Visualization */}
              <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4 mb-6 relative overflow-hidden">
                {/* Geometric background elements */}
                <div className="absolute top-0 right-0 w-24 h-24">
                  <div className="absolute top-2 right-2 w-4 h-4 border border-indigo-500/10 rotate-45"></div>
                  <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500/5 rounded-full"></div>
                  <div className="absolute top-6 right-1 w-3 h-3 border border-blue-500/10"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-24 h-24">
                  <div className="absolute bottom-2 left-2 w-3 h-3 border border-indigo-500/10 rotate-45"></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-500/5 rounded-full"></div>
                  <div className="absolute bottom-6 left-1 w-4 h-4 border border-blue-500/10"></div>
                </div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <h3 className="font-bold text-gray-900 text-[11px]">6-Month Attendance Trend</h3>
                  <div className="flex gap-1">
                    <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-800 text-[9px] font-medium rounded-full">Jan - Jun 2024</span>
                  </div>
                </div>
                <div className="flex items-end h-32 gap-1 mt-4">
                  {[
                    { month: 'Jan', present: 28, late: 2, absent: 1, total: 31 },
                    { month: 'Feb', present: 26, late: 1, absent: 1, total: 28 },
                    { month: 'Mar', present: 29, late: 1, absent: 1, total: 31 },
                    { month: 'Apr', present: 27, late: 2, absent: 1, total: 30 },
                    { month: 'May', present: 28, late: 1, absent: 1, total: 30 },
                    { month: 'Jun', present: 29, late: 1, absent: 0, total: 30 }
                  ].map((month, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="text-[8px] text-gray-500 mb-1">{month.month}</div>
                      <div className="flex flex-col w-full rounded-md overflow-hidden border border-gray-100 shadow-sm">
                        {/* Present days - blue */}
                        <div
                          className="w-full bg-gradient-to-t from-blue-500 to-blue-400 flex items-center justify-center"
                          style={{ height: `${(month.present / month.total) * 100}%` }}
                        >
                          <span className="text-[7px] text-white font-bold">{month.present}</span>
                        </div>
                        {/* Late days - indigo */}
                        <div
                          className="w-full bg-gradient-to-t from-indigo-500 to-indigo-400 flex items-center justify-center"
                          style={{ height: `${(month.late / month.total) * 100}%` }}
                        >
                          <span className="text-[7px] text-white font-bold">{month.late}</span>
                        </div>
                        {/* Absent days - purple */}
                        <div
                          className="w-full bg-gradient-to-t from-purple-500 to-purple-400 flex items-center justify-center rounded-b"
                          style={{ height: `${(month.absent / month.total) * 100}%` }}
                        >
                          <span className="text-[7px] text-white font-bold">{month.absent}</span>
                        </div>
                      </div>
                      <div className="text-[9px] font-bold text-gray-900 mt-1">
                        {Math.round((month.present / month.total) * 100)}%
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-3 mt-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-[8px] text-gray-600">Present</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-[8px] text-gray-600">Late</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-[8px] text-gray-600">Absent</span>
                  </div>
                </div>
              </div>

              {/* Date Range Filter */}
              <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4 mb-5 relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <h3 className="font-bold text-gray-900 text-[11px]">Filter Attendance Records</h3>
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex flex-col">
                      <label className="text-[9px] text-gray-600 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[9px] text-gray-600 mb-1">End Date</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-end gap-2">
                      <button
                        onClick={applyDateFilter}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded text-[10px] hover:from-blue-600 hover:to-indigo-700 transition-all"
                      >
                        Apply Filter
                      </button>
                      <button
                        onClick={resetDateFilter}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-[10px] hover:bg-gray-200 transition-all"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attendance Details Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden relative">
                {/* Geometric background elements */}
                <div className="absolute top-0 right-0 w-32 h-32">
                  <div className="absolute top-3 right-3 w-4 h-4 border border-indigo-500/10 rotate-45"></div>
                  <div className="absolute top-5 right-5 w-2 h-2 bg-blue-500/5 rounded-full"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-32 h-32">
                  <div className="absolute bottom-3 left-3 w-3 h-3 border border-blue-500/10"></div>
                  <div className="absolute bottom-5 left-5 w-2 h-2 bg-indigo-500/5 rounded-full"></div>
                </div>
                <div className="overflow-x-auto relative z-10">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <tr>
                        <th scope="col" className="px-3 py-2 text-left text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-3 py-2 text-left text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">Day</th>
                        <th scope="col" className="px-3 py-2 text-left text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-3 py-2 text-left text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">Time</th>
                        <th scope="col" className="px-3 py-2 text-left text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-50">
                      {filterAttendanceRecords(attendanceRecords).map((record, index) => (
                        <tr key={index} className="hover:bg-indigo-50/50 transition-all duration-200">
                          <td className="px-3 py-2.5 whitespace-nowrap text-[10px] font-medium text-gray-900">{record.date}</td>
                          <td className="px-3 py-2.5 whitespace-nowrap text-[10px] text-gray-800">{record.day}</td>
                          <td className="px-3 py-2.5 whitespace-nowrap">
                            <span className={`px-1.5 py-0.5 text-[8px] font-semibold rounded-full inline-flex items-center ${record.status === 'present' ? 'bg-green-100 text-green-800 border border-green-200' : record.status === 'late' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' : record.status === 'absent' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-gray-100 text-gray-800 border border-gray-200'}`}>
                              {record.status === 'present' ? (
                                <CheckCircle className="w-2.5 h-2.5 mr-1 text-green-500" />
                              ) : record.status === 'late' ? (
                                <Clock className="w-2.5 h-2.5 mr-1 text-yellow-500" />
                              ) : record.status === 'absent' ? (
                                <X className="w-2.5 h-2.5 mr-1 text-red-500" />
                              ) : (
                                <Calendar className="w-2.5 h-2.5 mr-1 text-gray-500" />
                              )}
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap text-[10px] text-gray-800">{record.time}</td>
                          <td className="px-3 py-2.5 whitespace-nowrap text-[10px] text-gray-800">{record.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filterAttendanceRecords(attendanceRecords).length === 0 && (
                    <div className="text-center py-8 text-gray-500 text-[10px]">
                      No attendance records found for the selected date range.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'grades' && (
            <div>
              {/* Banner for Grades Section - Matched dashboard size */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-5 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden -mt-5">
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute top-4 right-4 w-7 h-7 bg-white/10 rotate-45"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-bold text-white mb-1.5">Academic Performance</h2>
                    <p className="text-xs text-blue-100 mb-2">Track your grades and academic progress</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">87.5% Average Score</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">5th Class Rank</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">4 Core Subjects</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 rounded-md p-2">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Grade Status Cards in Single Row - Matched dashboard size */}
              <div className="flex gap-5 mb-7">
                <div className="flex-1 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-md p-4 shadow-sm border border-indigo-200/30 backdrop-blur-sm text-white relative overflow-hidden">
                  <div className="absolute -top-5 -right-5 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-5 -left-5 w-14 h-14 bg-white/10 rounded-full"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-[11px] text-indigo-100">Behavior</p>
                      <p className="text-lg font-bold mt-2.5">Good</p>
                    </div>
                    <UserCheck className="w-7 h-7 text-indigo-200 relative z-10" />
                  </div>
                </div>

                <div className="flex-1 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md p-4 shadow-sm border border-indigo-200/30 backdrop-blur-sm text-white relative overflow-hidden">
                  <div className="absolute -top-5 -right-5 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-5 -left-5 w-14 h-14 bg-white/10 rounded-full"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-[11px] text-indigo-100">Average Score</p>
                      <p className="text-lg font-bold mt-2.5">87.5%</p>
                    </div>
                    <Award className="w-7 h-7 text-indigo-200 relative z-10" />
                  </div>
                </div>

                <div className="flex-1 bg-gradient-to-br from-violet-600 to-purple-500 rounded-md p-4 shadow-sm border border-violet-200/30 backdrop-blur-sm text-white relative overflow-hidden">
                  <div className="absolute -top-5 -right-5 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-5 -left-5 w-14 h-14 bg-white/10 rounded-full"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-[11px] text-violet-100">Class Rank</p>
                      <p className="text-lg font-bold mt-2.5">5th</p>
                    </div>
                    <Users className="w-7 h-7 text-violet-200 relative z-10" />
                  </div>
                </div>

                <div className="flex-1 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-md p-4 shadow-sm border border-indigo-200/30 backdrop-blur-sm text-white relative overflow-hidden">
                  <div className="absolute -top-5 -right-5 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-5 -left-5 w-14 h-14 bg-white/10 rounded-full"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-[11px] text-indigo-100">Total Subjects</p>
                      <p className="text-lg font-bold mt-2.5">4</p>
                    </div>
                    <BookOpen className="w-7 h-7 text-indigo-200 relative z-10" />
                  </div>
                </div>
              </div>

              {/* Grades Table - Matched dashboard size */}
              <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden relative">
                <div className="overflow-x-auto relative z-10">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <tr>
                        <th scope="col" className="px-3 py-2 text-left text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">Subject</th>
                        <th scope="col" className="px-3 py-2 text-left text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">Score</th>
                        <th scope="col" className="px-3 py-2 text-left text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">Grade</th>
                        <th scope="col" className="px-3 py-2 text-left text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">Performance</th>
                        <th scope="col" className="px-3 py-2 text-left text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">Teacher</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-50">
                      {[
                        { id: 1, subject: 'Mathematics', score: 92, grade: 'A', teacher: 'Mr. Johnson' },
                        { id: 2, subject: 'Science', score: 88, grade: 'A-', teacher: 'Dr. Smith' },
                        { id: 3, subject: 'English', score: 85, grade: 'B+', teacher: 'Ms. Williams' },
                        { id: 4, subject: 'History', score: 95, grade: 'A', teacher: 'Mr. Brown' },
                        { id: 5, subject: 'Geography', score: 78, grade: 'B', teacher: 'Mrs. Davis' },
                        { id: 6, subject: 'Music', score: 90, grade: 'A-', teacher: 'Mr. Wilson' },
                        { id: 7, subject: 'Art', score: 87, grade: 'B+', teacher: 'Ms. Taylor' }
                      ].map((subject) => {
                        // Map subjects to icons
                        const subjectIcons = {
                          'Mathematics': Calculator,
                          'Science': FlaskConical,
                          'English': PenTool,
                          'History': BookOpen,
                          'Geography': Globe,
                          'Music': Music,
                          'Art': Palette
                        };

                        const SubjectIcon = subjectIcons[subject.subject] || BookOpen;

                        // Determine color based on score
                        const getScoreColor = (score) => {
                          if (score >= 90) return 'bg-indigo-500';
                          if (score >= 80) return 'bg-blue-500';
                          if (score >= 70) return 'bg-green-500';
                          if (score >= 60) return 'bg-yellow-500';
                          return 'bg-red-500';
                        };

                        // Determine grade color
                        const getGradeColor = (grade) => {
                          if (grade.startsWith('A')) return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
                          if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800 border border-blue-200';
                          if (grade.startsWith('C')) return 'bg-green-100 text-green-800 border border-green-200';
                          if (grade.startsWith('D')) return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
                          return 'bg-red-100 text-red-800 border border-red-200';
                        };

                        return (
                          <tr key={subject.id} className="hover:bg-indigo-50/50 transition-all duration-200">
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <div className="flex items-center text-[10px] font-medium text-gray-900">
                                <SubjectIcon className="w-3 h-3 mr-2 text-indigo-500" />
                                {subject.subject}
                              </div>
                            </td>
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <div className="text-[10px] font-semibold text-gray-900">{subject.score}%</div>
                            </td>
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <span className={`px-2 py-1 text-[9px] font-semibold rounded-full ${getGradeColor(subject.grade)}`}>
                                {subject.grade}
                              </span>
                            </td>
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                  <div
                                    className={`h-2 rounded-full ${getScoreColor(subject.score)}`}
                                    style={{ width: `${subject.score}%` }}
                                  ></div>
                                </div>
                                <span className="text-[10px] font-medium text-gray-700">{subject.score}%</span>
                              </div>
                            </td>
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <div className="text-[10px] text-gray-800">{subject.teacher}</div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notices' && (
            <div>
              {/* Banner for Notices Section */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-5 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden -mt-5">
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute top-4 right-4 w-7 h-7 bg-white/10 rotate-45"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-bold text-white mb-1.5">Important Notices</h2>
                    <p className="text-xs text-blue-100 mb-2">Stay updated with the latest announcements and events</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">6 Active Notices</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">2 New This Week</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">Event, Meeting, Workshop</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 rounded-md p-2">
                      <AlertCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-bold text-gray-900">Notice Board</h2>
                  <p className="text-gray-600 text-[10px]">All important announcements and updates</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-3">
                  {notices.length > 0 ? (
                    notices.map((notice) => (
                      <div key={notice._id} className="bg-white rounded border border-gray-200 p-3">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-gray-900 text-[11px]">{notice.title}</h3>
                          <span className={`px-1.5 py-0.5 text-[8px] font-medium rounded-full whitespace-nowrap ${notice.priority === 'High' ? 'bg-red-100 text-red-800' :
                            notice.priority === 'Medium' ? 'bg-amber-100 text-amber-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                            {notice.priority || 'General'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-[10px] mb-2">{notice.content}</p>
                        <div className="flex items-center justify-between text-[9px] text-gray-500">
                          <span>{notice.audience}</span>
                          <span>{new Date(notice.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 text-[10px]">
                      No notices at this time.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'classes' && (
            <div>
              {/* Banner for Classes Section */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-5 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden -mt-5">
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute top-4 right-4 w-7 h-7 bg-white/10 rotate-45"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-bold text-white mb-1.5">My Classes</h2>
                    <p className="text-xs text-blue-100 mb-2">View all your enrolled classes and subjects</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{getClassCount()} Total Classes</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">All Active</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{getSubjectList()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 rounded-md p-2">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Classes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
                {/* Mathematics Class Card */}
                <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500/10 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-indigo-500/10 rounded-full"></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=math&backgroundColor=3b82f6&radius=50" alt="Teacher" className="w-6 h-6 rounded-full" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-[11px]">Mathematics</h3>
                          <p className="text-gray-600 text-[10px]">Class 10-A</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-[9px] font-medium rounded-full">Active</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[10px] text-gray-600">
                        <span className="font-medium">Teacher:</span> Mr. Johnson
                      </div>
                      <div className="text-[10px] text-gray-600">
                        <span className="font-medium">Students:</span> 32
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <button
                        onClick={() => setSelectedClass({
                          name: 'Mathematics',
                          teacher: 'Mr. Johnson',
                          period: '2nd',
                          students: 32,
                          room: '204',
                          subject: 'Mathematics'
                        })}
                        className="w-full py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[10px] font-medium rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all"
                      >
                        View Class Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Science Class Card */}
                <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-500/10 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-emerald-500/10 rounded-full"></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=science&backgroundColor=10b981&radius=50" alt="Teacher" className="w-6 h-6 rounded-full" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-[11px]">Science</h3>
                          <p className="text-gray-600 text-[10px]">Class 10-A</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-[9px] font-medium rounded-full">Active</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[10px] text-gray-600">
                        <span className="font-medium">Teacher:</span> Dr. Smith
                      </div>
                      <div className="text-[10px] text-gray-600">
                        <span className="font-medium">Students:</span> 30
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <button
                        onClick={() => setSelectedClass({
                          name: 'Science',
                          teacher: 'Dr. Smith',
                          period: '3rd',
                          students: 30,
                          room: '301',
                          subject: 'Science'
                        })}
                        className="w-full py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[10px] font-medium rounded-md hover:from-green-600 hover:to-emerald-700 transition-all"
                      >
                        View Class Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* English Class Card */}
                <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-purple-500/10 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-violet-500/10 rounded-full"></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=english&backgroundColor=8b5cf6&radius=50" alt="Teacher" className="w-6 h-6 rounded-full" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-[11px]">English</h3>
                          <p className="text-gray-600 text-[10px]">Class 10-A</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-[9px] font-medium rounded-full">Active</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[10px] text-gray-600">
                        <span className="font-medium">Teacher:</span> Ms. Williams
                      </div>
                      <div className="text-[10px] text-gray-600">
                        <span className="font-medium">Students:</span> 31
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <button
                        onClick={() => setSelectedClass({
                          name: 'English',
                          teacher: 'Ms. Williams',
                          period: '1st',
                          students: 31,
                          room: '105',
                          subject: 'English'
                        })}
                        className="w-full py-1.5 bg-gradient-to-r from-purple-500 to-violet-600 text-white text-[10px] font-medium rounded-md hover:from-purple-600 hover:to-violet-700 transition-all"
                      >
                        View Class Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* History Class Card */}
                <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-amber-500/10 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-orange-500/10 rounded-full"></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=history&backgroundColor=f59e0b&radius=50" alt="Teacher" className="w-6 h-6 rounded-full" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-[11px]">History</h3>
                          <p className="text-gray-600 text-[10px]">Class 10-A</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-[9px] font-medium rounded-full">Active</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[10px] text-gray-600">
                        <span className="font-medium">Teacher:</span> Mr. Brown
                      </div>
                      <div className="text-[10px] text-gray-600">
                        <span className="font-medium">Students:</span> 29
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <button
                        onClick={() => setSelectedClass({
                          name: 'History',
                          teacher: 'Mr. Brown',
                          period: '4th',
                          students: 29,
                          room: '208',
                          subject: 'History'
                        })}
                        className="w-full py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[10px] font-medium rounded-md hover:from-amber-600 hover:to-orange-700 transition-all"
                      >
                        View Class Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Geography Class Card */}
                <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-cyan-500/10 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-teal-500/10 rounded-full"></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center">
                          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=geography&backgroundColor=06b6d4&radius=50" alt="Teacher" className="w-6 h-6 rounded-full" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-[11px]">Geography</h3>
                          <p className="text-gray-600 text-[10px]">Class 10-A</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-[9px] font-medium rounded-full">Active</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[10px] text-gray-600">
                        <span className="font-medium">Teacher:</span> Mrs. Davis
                      </div>
                      <div className="text-[10px] text-gray-600">
                        <span className="font-medium">Students:</span> 30
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <button
                        onClick={() => setSelectedClass({
                          name: 'Geography',
                          teacher: 'Mrs. Davis',
                          period: '5th',
                          students: 30,
                          room: '305',
                          subject: 'Geography'
                        })}
                        className="w-full py-1.5 bg-gradient-to-r from-cyan-500 to-teal-600 text-white text-[10px] font-medium rounded-md hover:from-cyan-600 hover:to-teal-700 transition-all"
                      >
                        View Class Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Art Class Card */}
                <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-pink-500/10 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-rose-500/10 rounded-full"></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=art&backgroundColor=ec4899&radius=50" alt="Teacher" className="w-6 h-6 rounded-full" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-[11px]">Art</h3>
                          <p className="text-gray-600 text-[10px]">Class 10-A</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-[9px] font-medium rounded-full">Active</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[10px] text-gray-600">
                        <span className="font-medium">Teacher:</span> Ms. Taylor
                      </div>
                      <div className="text-[10px] text-gray-600">
                        <span className="font-medium">Students:</span> 28
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <button
                        onClick={() => setSelectedClass({
                          name: 'Art',
                          teacher: 'Ms. Taylor',
                          period: '6th',
                          students: 28,
                          room: 'Art Hall',
                          subject: 'Art'
                        })}
                        className="w-full py-1.5 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-[10px] font-medium rounded-md hover:from-pink-600 hover:to-rose-700 transition-all"
                      >
                        View Class Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Class Schedule Summary */}
              <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4 relative overflow-hidden">
                {/* Subtle geometric background elements in soft blue/indigo tones */}
                <div className="absolute top-0 right-0 w-24 h-24">
                  <div className="absolute top-2 right-2 w-4 h-4 border border-blue-500/10 rotate-45"></div>
                  <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-500/5 rounded-full"></div>
                  <div className="absolute top-6 right-1 w-3 h-3 border border-indigo-500/10"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-24 h-24">
                  <div className="absolute bottom-2 left-2 w-3 h-3 border border-blue-500/10 rotate-45"></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-indigo-500/5 rounded-full"></div>
                  <div className="absolute bottom-6 left-1 w-4 h-4 border border-indigo-500/10"></div>
                </div>
                <h3 className="font-bold text-gray-900 text-[11px] mb-3 relative z-10">Weekly Class Schedule</h3>
                <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-sm">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-[9px] font-semibold text-indigo-700 uppercase tracking-wider">Period</th>
                        <th className="px-3 py-2 text-left text-[9px] font-semibold text-indigo-700 uppercase tracking-wider">Monday</th>
                        <th className="px-3 py-2 text-left text-[9px] font-semibold text-indigo-700 uppercase tracking-wider">Tuesday</th>
                        <th className="px-3 py-2 text-left text-[9px] font-semibold text-indigo-700 uppercase tracking-wider">Wednesday</th>
                        <th className="px-3 py-2 text-left text-[9px] font-semibold text-indigo-700 uppercase tracking-wider">Thursday</th>
                        <th className="px-3 py-2 text-left text-[9px] font-semibold text-indigo-700 uppercase tracking-wider">Friday</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-50">
                      {[
                        { period: '1st', mon: 'English', tue: 'Mathematics', wed: 'Science', thu: 'History', fri: 'Geography' },
                        { period: '2nd', mon: 'Mathematics', tue: 'Science', wed: 'English', thu: 'Geography', fri: 'Art' },
                        { period: '3rd', mon: 'Science', tue: 'History', wed: 'Mathematics', thu: 'English', fri: 'History' },
                        { period: '4th', mon: 'History', tue: 'Geography', wed: 'Art', thu: 'Mathematics', fri: 'English' },
                        { period: '5th', mon: 'Geography', tue: 'English', wed: 'History', thu: 'Art', fri: 'Mathematics' },
                        { period: '6th', mon: 'Art', tue: 'Art', wed: 'Geography', thu: 'Science', fri: 'Science' },
                      ].map((row, index) => (
                        <tr key={index} className="hover:bg-indigo-50/50 transition-colors duration-150">
                          <td className="px-3 py-2 whitespace-nowrap text-[9px] font-semibold text-indigo-900">{row.period}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-[9px] text-gray-700">{row.mon}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-[9px] text-gray-700">{row.tue}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-[9px] text-gray-700">{row.wed}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-[9px] text-gray-700">{row.thu}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-[9px] text-gray-700">{row.fri}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Chatbot Tab */}
          {activeTab === 'chatbot' && (
            <div>
              <RoleChatbot role="student" />
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h2 className="text-[10px] font-bold text-gray-900">Account Settings</h2>
                  <p className="text-gray-600 text-[9px]">Manage your profile and account preferences</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {/* Profile Card - More compact */}
                <div className="lg:col-span-2 bg-white rounded-md shadow-sm border border-gray-100 p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="relative">
                      <img
                        src={studentAvatar}
                        alt="Student Avatar"
                        className="w-10 h-10 rounded-lg object-cover shadow-md border-2 border-indigo-100"
                      />
                      <button
                        onClick={() => setShowAvatarModal(true)}
                        className="absolute bottom-0 right-0 bg-indigo-500 text-white p-1 rounded-full hover:bg-indigo-600 transition-all shadow-md"
                      >
                        <Edit className="w-2 h-2" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-[11px] font-bold text-gray-900">{profileData.name}</h3>
                      <p className="text-gray-600 text-[10px]">{profileData.class} • Roll #{profileData.rollNumber}</p>
                      <button
                        onClick={() => setShowAvatarModal(true)}
                        className="text-indigo-600 hover:text-indigo-700 text-[10px] font-medium mt-0.5"
                      >
                        Change Avatar
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <label className="block text-[10px] font-medium text-gray-700 mb-0.5">Full Name</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-300 text-[10px]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-medium text-gray-700 mb-0.5">Email Address</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-300 text-[10px]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-medium text-gray-700 mb-0.5">Class</label>
                      <input
                        type="text"
                        value={profileData.class}
                        onChange={(e) => setProfileData({ ...profileData, class: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-300 text-[10px]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-medium text-gray-700 mb-0.5">Roll Number</label>
                      <input
                        type="text"
                        value={profileData.rollNumber}
                        onChange={(e) => setProfileData({ ...profileData, rollNumber: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-300 text-[10px]"
                      />
                    </div>

                    <div className="flex gap-1 pt-2">
                      <button
                        onClick={() => {
                          setProfileData({
                            name: studentData.name,
                            email: 'sarah.johnson@example.com',
                            class: studentData.class,
                            rollNumber: studentData.rollNumber
                          });
                        }}
                        className="px-1.5 py-0.5 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-all text-[10px]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setStudentData({
                            ...studentData,
                            name: profileData.name,
                            class: profileData.class,
                            rollNumber: profileData.rollNumber
                          });
                          alert('Profile updated successfully!');
                        }}
                        className="px-1.5 py-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded hover:from-indigo-600 hover:to-purple-700 transition-all shadow-sm hover:shadow text-[10px]"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>

                {/* Settings and Actions in a single row */}
                <div className="flex gap-3">
                  <div className="flex-1 bg-white rounded-md shadow-sm border border-gray-100 p-3">
                    <h3 className="text-[11px] font-bold text-gray-900 mb-2">Settings</h3>
                    <div className="space-y-2">
                      {/* Privacy Settings */}
                      <div>
                        <h4 className="text-[10px] font-medium text-gray-700 mb-1">Privacy</h4>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-600">Profile Visibility</span>
                            <select
                              className="text-[10px] border border-gray-300 rounded px-1.5 py-0.5"
                              value={settings.privacy.profileVisibility}
                              onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                            >
                              <option value="public">Public</option>
                              <option value="friends">Friends</option>
                              <option value="private">Private</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-600">Show Activity Status</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={settings.privacy.activityStatus}
                                onChange={() => handlePrivacyChange('activityStatus', !settings.privacy.activityStatus)}
                              />
                              <div className="w-6 h-3 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-2 after:w-2 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Appearance Settings */}
                      <div>
                        <h4 className="text-[10px] font-medium text-gray-700 mb-1">Appearance</h4>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-600">Theme</span>
                            <select
                              className="text-[10px] border border-gray-300 rounded px-1.5 py-0.5"
                              value={settings.appearance.theme}
                              onChange={(e) => handleAppearanceChange('theme', e.target.value)}
                            >
                              <option value="light">Light</option>
                              <option value="dark">Dark</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-600">Language</span>
                            <select
                              className="text-[10px] border border-gray-300 rounded px-1.5 py-0.5"
                              value={settings.appearance.language}
                              onChange={(e) => handleAppearanceChange('language', e.target.value)}
                            >
                              <option value="en">English</option>
                              <option value="pa">Punjabi</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 bg-white rounded-md shadow-sm border border-gray-100 p-3">
                    <h3 className="text-[11px] font-bold text-gray-900 mb-2">Security</h3>
                    <div className="space-y-2">
                      {/* Security Settings */}
                      <div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-600">Two-Factor Authentication</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={settings.security.twoFactorAuth}
                                onChange={() => handleSecurityChange('twoFactorAuth')}
                              />
                              <div className="w-6 h-3 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-2 after:w-2 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-600">Login Alerts</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={settings.security.loginAlerts}
                                onChange={() => handleSecurityChange('loginAlerts')}
                              />
                              <div className="w-6 h-3 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-2 after:w-2 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div>
                        <h4 className="text-[11px] font-bold text-gray-900 mb-2">Actions</h4>
                        <div className="space-y-1">
                          <button
                            onClick={() => window.location.reload()}
                            className="w-full flex items-center gap-1 px-1.5 py-0.5 text-gray-600 hover:bg-gray-50 rounded text-[10px]"
                          >
                            <RefreshCw className="w-2 h-2" />
                            Refresh Settings
                          </button>
                          <button
                            onClick={resetSettings}
                            className="w-full flex items-center gap-1 px-1.5 py-0.5 text-gray-600 hover:bg-gray-50 rounded text-[10px]"
                          >
                            <Settings className="w-2 h-2" />
                            Reset Settings
                          </button>
                          <button
                            onClick={() => alert('Changes saved successfully!')}
                            className="w-full flex items-center gap-1 px-1.5 py-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded hover:from-indigo-600 hover:to-purple-700 transition-all shadow-sm hover:shadow text-[10px]"
                          >
                            <CheckCircle className="w-2 h-2" />
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Class Details View */}
          {selectedClass && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-5 max-w-4xl w-full max-h-[90vh] overflow-auto">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-[15px] font-bold text-gray-900">{selectedClass.name} - Class Details</h3>
                  <button
                    onClick={() => setSelectedClass(null)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-4.5 h-4.5 text-gray-500" />
                  </button>
                </div>

                {/* Class Information */}
                <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-6 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden">
                  <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute top-3 right-3 w-6 h-6 bg-white/10 rotate-45"></div>

                  <div className="relative z-10 flex items-center gap-4">
                    <div className="flex-1">
                      <h2 className="text-[14px] font-bold text-white mb-2">{selectedClass.name}</h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="text-[13px] text-blue-100">
                          <span className="font-medium">Teacher:</span> {selectedClass.teacher}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Study Resources Section */}
                <div className="mb-8">
                  <h3 className="text-[12px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    Study Resources
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Sample resources - in a real app, these would come from props or API */}
                    <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
                      <div className="absolute -top-3 -right-3 w-12 h-12 bg-blue-500/10 rounded-full"></div>
                      <div className="relative z-10">
                        <div className="flex items-start gap-2 mb-3">
                          <FileText className="w-5 h-5 text-indigo-600 mt-0.5" />
                          <div>
                            <h4 className="font-bold text-gray-900 text-[10px]">Chapter 5 Notes</h4>
                            <p className="text-gray-600 text-[9px]">PDF Document</p>
                          </div>
                        </div>
                        <button className="w-full py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[9px] font-medium rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all">
                          View/Download
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
                      <div className="absolute -top-3 -right-3 w-12 h-12 bg-green-500/10 rounded-full"></div>
                      <div className="relative z-10">
                        <div className="flex items-start gap-2 mb-3">
                          <Globe className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <h4 className="font-bold text-gray-900 text-[10px]">Interactive Learning</h4>
                            <p className="text-gray-600 text-[9px]">Online Resource</p>
                          </div>
                        </div>
                        <button className="w-full py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[9px] font-medium rounded-md hover:from-green-600 hover:to-emerald-700 transition-all">
                          View/Download
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
                      <div className="absolute -top-3 -right-3 w-12 h-12 bg-purple-500/10 rounded-full"></div>
                      <div className="relative z-10">
                        <div className="flex items-start gap-2 mb-3">
                          <Palette className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <h4 className="font-bold text-gray-900 text-[10px]">Presentation Slides</h4>
                            <p className="text-gray-600 text-[9px]">PPT Document</p>
                          </div>
                        </div>
                        <button className="w-full py-1.5 bg-gradient-to-r from-purple-500 to-violet-600 text-white text-[9px] font-medium rounded-md hover:from-purple-600 hover:to-violet-700 transition-all">
                          View/Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          )}
        </div>
      </div>

      {/* Avatar Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-5 max-w-md w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[15px] font-bold text-gray-900">Change Avatar</h3>
              <button
                onClick={() => setShowAvatarModal(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4.5 h-4.5 text-gray-500" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3.5">
              {sampleAvatars.map((avatar, index) => (
                <div
                  key={index}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => {
                    setStudentAvatar(avatar);
                    setShowAvatarModal(false);
                  }}
                >
                  <img
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    className="w-14 h-14 rounded-full object-cover mx-auto"
                  />
                </div>
              ))}
            </div>
            <div className="mt-5 text-center">
              <p className="text-[12px] text-gray-500">Click on any avatar to select it</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimplifiedStudentDashboard;