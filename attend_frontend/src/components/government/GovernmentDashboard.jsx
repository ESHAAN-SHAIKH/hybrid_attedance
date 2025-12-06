import React, { useState, useEffect } from 'react';
import { Users, School, Utensils, TrendingUp, AlertTriangle, FileText, Settings, LogOut, Home, Search, Filter, Download, Plus, Eye, Edit, Trash2, Printer, BarChart, PieChart, LineChart, Calendar, Clock, Shield, MapPin, CheckCircle, XCircle, RefreshCw, Bell, Menu, X, Building, Activity, User, Book, Target, Award, Camera, Mail, Save, GraduationCap, Minus, Monitor, Bot } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import UltraModernHeader from '../UltraModernHeader';
import ParticleBackground from '../ParticleBackground';
import RoleChatbot from '../chatbot/RoleChatbot';

const GovernmentDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Set active tab based on current route
  const getActiveTabFromRoute = () => {
    const path = location.pathname;
    if (path.includes('/schools')) return 'schools';
    if (path.includes('/districts')) return 'districts';
    if (path.includes('/reports')) return 'reports';
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
    navigate(`/government/${tab}`);
  };
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [reportPeriod, setReportPeriod] = useState('monthly'); // weekly, monthly, yearly


  // State for Add School form
  const [showAddSchoolForm, setShowAddSchoolForm] = useState(false);
  const [newSchool, setNewSchool] = useState({
    name: '',
    students: '',
    performance: 'B'
  });

  // Sample alerts data
  const alerts = [
    { id: 1, type: 'safety', message: 'Unauthorized entry detected at Delhi Public School', time: '10 mins ago', severity: 'high', status: 'new' },
    { id: 2, type: 'performance', message: 'St. Marys Convent School showing significant improvement', time: '25 mins ago', severity: 'positive', status: 'new' },
    { id: 3, type: 'resource', message: 'Budget allocation for Kendriya Vidyalaya', time: '1 hour ago', severity: 'medium', status: 'acknowledged' },
  ];

  // State for notices
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Budget Allocation Announcement",
      content: "The annual budget for the education sector has been finalized and allocated to all districts. Please review the allocation for your district and submit utilization plan within 15 days.",
      audience: "All Districts",
      priority: "Important",
      sender: "Government Official",
      date: "2024-05-15",
      time: "09:30 AM"
    },
    {
      id: 2,
      title: "Policy Update on Student Assessment",
      content: "New guidelines for student assessment and evaluation have been released. All schools are required to implement these changes starting from the next academic year.",
      audience: "All Schools",
      priority: "Important",
      sender: "Government Official",
      date: "2024-05-10",
      time: "14:20 PM"
    },
    {
      id: 3,
      title: "Mid-Day Meal Program Enhancement",
      content: "The mid-day meal program will be enhanced with additional nutritional supplements starting June 1st. All schools participating in the program must update their inventory.",
      audience: "All Schools",
      priority: "Normal",
      sender: "Government Official",
      date: "2024-05-05",
      time: "11:45 AM"
    }
  ]);

  const [newNotice, setNewNotice] = useState({
    title: "",
    content: "",
    audience: "All Districts",
    priority: "Normal"
  });

  // Sample schools data - moved to the top to avoid reference error
  const [schools, setSchools] = useState([
    { id: 1, name: 'Delhi Public School', students: 1250, attendance: 94.2, performance: 'A', alerts: alerts.filter(a => a.message.includes('Delhi Public')).length },
    { id: 2, name: 'St. Marys Convent School', students: 850, attendance: 96.8, performance: 'A+', alerts: alerts.filter(a => a.message.includes('St. Mary')).length },
    { id: 3, name: 'Kendriya Vidyalaya', students: 920, attendance: 89.5, performance: 'B', alerts: alerts.filter(a => a.message.includes('Kendriya')).length },
    { id: 4, name: 'DAV Public School', students: 1100, attendance: 91.7, performance: 'B+', alerts: 0 },
    { id: 5, name: 'Saboo Siddik Degree', students: 1500, attendance: 88.5, performance: 'B', alerts: 0 },
    { id: 6, name: 'Saboo Siddik Polytechnic', students: 1800, attendance: 90.2, performance: 'B+', alerts: 0 },
  ]);

  // Sample data for the dashboard
  const [districtData, setDistrictData] = useState({
    name: "Central District",
    totalStudents: 7420,
    totalSchools: 6,
    mealsPerStudent: 1,
    totalMeals: 7420,
    attendanceRate: 92.5,
    schoolsNeedingSupport: 8,
    averageClassSize: 30
  });

  // State for report generation
  const [generatingReport, setGeneratingReport] = useState(null);
  const [generatedReports, setGeneratedReports] = useState([]);

  // State for meal filtering
  const [selectedSchool, setSelectedSchool] = useState('All Schools');
  const [selectedDuration, setSelectedDuration] = useState('weekly'); // weekly, monthly

  // State for applied filters
  const [appliedSchool, setAppliedSchool] = useState('All Schools');
  const [appliedDuration, setAppliedDuration] = useState('weekly');

  // Sample meal attendance data - now derived from schools state
  const mealAttendanceData = schools.map(school => ({
    id: school.id,
    schoolId: school.id,
    schoolName: school.name,
    totalStudents: school.students,
    presentToday: Math.floor(school.students * school.attendance / 100),
    date: '2023-06-15'
  }));

  // Sample weekly and monthly meal data
  const weeklyMealData = [
    { week: 'Week 1', meals: 45200 },
    { week: 'Week 2', meals: 47800 },
    { week: 'Week 3', meals: 46200 },
    { week: 'Week 4', meals: 48500 }
  ];

  const monthlyMealData = [
    { month: 'January', meals: 198000 },
    { month: 'February', meals: 182000 },
    { month: 'March', meals: 205000 },
    { month: 'April', meals: 192000 },
    { month: 'May', meals: 210000 }
  ];

  // Sample school-specific meal data (in a real app, this would come from an API)
  const getSchoolSpecificMealData = (schoolName) => {
    // This is sample data - in a real application, this would be fetched from a database
    const schoolDataMap = {
      'Delhi Public School': {
        weekly: [
          { week: 'Week 1', meals: 7500 },
          { week: 'Week 2', meals: 7800 },
          { week: 'Week 3', meals: 7600 },
          { week: 'Week 4', meals: 8100 }
        ],
        monthly: [
          { month: 'January', meals: 32000 },
          { month: 'February', meals: 29000 },
          { month: 'March', meals: 33000 },
          { month: 'April', meals: 31000 },
          { month: 'May', meals: 35000 }
        ]
      },
      'St. Marys Convent School': {
        weekly: [
          { week: 'Week 1', meals: 5200 },
          { week: 'Week 2', meals: 5400 },
          { week: 'Week 3', meals: 5100 },
          { week: 'Week 4', meals: 5600 }
        ],
        monthly: [
          { month: 'January', meals: 22000 },
          { month: 'February', meals: 20000 },
          { month: 'March', meals: 23000 },
          { month: 'April', meals: 21000 },
          { month: 'May', meals: 24000 }
        ]
      },
      'Kendriya Vidyalaya': {
        weekly: [
          { week: 'Week 1', meals: 5800 },
          { week: 'Week 2', meals: 6100 },
          { week: 'Week 3', meals: 5900 },
          { week: 'Week 4', meals: 6300 }
        ],
        monthly: [
          { month: 'January', meals: 25000 },
          { month: 'February', meals: 23000 },
          { month: 'March', meals: 26000 },
          { month: 'April', meals: 24000 },
          { month: 'May', meals: 27000 }
        ]
      },
      'DAV Public School': {
        weekly: [
          { week: 'Week 1', meals: 6700 },
          { week: 'Week 2', meals: 7100 },
          { week: 'Week 3', meals: 6900 },
          { week: 'Week 4', meals: 7300 }
        ],
        monthly: [
          { month: 'January', meals: 29000 },
          { month: 'February', meals: 27000 },
          { month: 'March', meals: 30000 },
          { month: 'April', meals: 28000 },
          { month: 'May', meals: 31000 }
        ]
      },
      'Saboo Siddik Degree': {
        weekly: [
          { week: 'Week 1', meals: 9200 },
          { week: 'Week 2', meals: 9500 },
          { week: 'Week 3', meals: 9300 },
          { week: 'Week 4', meals: 9800 }
        ],
        monthly: [
          { month: 'January', meals: 40000 },
          { month: 'February', meals: 37000 },
          { month: 'March', meals: 41000 },
          { month: 'April', meals: 39000 },
          { month: 'May', meals: 43000 }
        ]
      },
      'Saboo Siddik Polytechnic': {
        weekly: [
          { week: 'Week 1', meals: 11000 },
          { week: 'Week 2', meals: 11500 },
          { week: 'Week 3', meals: 11200 },
          { week: 'Week 4', meals: 12000 }
        ],
        monthly: [
          { month: 'January', meals: 47000 },
          { month: 'February', meals: 44000 },
          { month: 'March', meals: 48000 },
          { month: 'April', meals: 46000 },
          { month: 'May', meals: 50000 }
        ]
      }
    };

    return schoolDataMap[schoolName] || { weekly: [], monthly: [] };
  };

  // Filtered data based on applied selections
  const filteredMealAttendanceData = appliedSchool === 'All Schools'
    ? mealAttendanceData
    : mealAttendanceData.filter(school => school.schoolName === appliedSchool);

  // Get filtered data for the applied school
  const getFilteredSchoolData = () => {
    if (appliedSchool === 'All Schools') {
      return filteredMealAttendanceData;
    }
    return mealAttendanceData.filter(school => school.schoolName === appliedSchool);
  };

  const selectedSchoolData = getFilteredSchoolData();

  // Get school-specific meal data
  const schoolSpecificMealData = appliedSchool !== 'All Schools' ? getSchoolSpecificMealData(appliedSchool) : null;

  // Use school-specific data if available, otherwise use general data
  const weeklyMealReportData = schoolSpecificMealData ? schoolSpecificMealData.weekly : weeklyMealData;
  const monthlyMealReportData = schoolSpecificMealData ? schoolSpecificMealData.monthly : monthlyMealData;

  // Sample attendance trend data
  const attendanceTrendData = [
    { month: 'Jan', attendance: 89.2, schools: 38 },
    { month: 'Feb', attendance: 90.5, schools: 39 },
    { month: 'Mar', attendance: 91.8, schools: 40 },
    { month: 'Apr', attendance: 92.1, schools: 40 },
    { month: 'May', attendance: 92.5, schools: 42 },
    { month: 'Jun', attendance: 92.3, schools: 41 },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-800';
      case 'high': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'positive': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getSeverityColorSolid = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'positive': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  // Function to add a new school
  const addNewSchool = () => {
    if (newSchool.name && newSchool.students) {
      const schoolId = schools.length + 1;
      const schoolObj = {
        id: schoolId,
        name: newSchool.name,
        students: parseInt(newSchool.students),
        attendance: 90, // Default attendance
        performance: newSchool.performance,
        alerts: 0
      };

      setSchools([...schools, schoolObj]);
      setNewSchool({
        name: '',
        students: '',
        performance: 'B'
      });
      setShowAddSchoolForm(false);

      // Update district data
      setDistrictData({
        ...districtData,
        totalSchools: districtData.totalSchools + 1,
        totalStudents: districtData.totalStudents + parseInt(newSchool.students)
      });
    }
  };

  // Function to handle new school form input changes
  const handleNewSchoolChange = (e) => {
    const { name, value } = e.target;
    setNewSchool({ ...newSchool, [name]: value });
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'safety': return <Shield className="w-5 h-5" />;
      case 'performance': return <TrendingUp className="w-5 h-5" />;
      case 'resource': return <Utensils className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  // Function to handle new notice form input changes
  const handleNewNoticeChange = (e) => {
    const { name, value } = e.target;
    setNewNotice({ ...newNotice, [name]: value });
  };

  // Function to add a new notice
  const addNewNotice = () => {
    if (newNotice.title && newNotice.content) {
      const noticeObj = {
        id: notices.length + 1,
        title: newNotice.title,
        content: newNotice.content,
        audience: newNotice.audience,
        priority: newNotice.priority,
        sender: "Government Official",
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setNotices([noticeObj, ...notices]);
      setNewNotice({
        title: "",
        content: "",
        audience: "All Districts",
        priority: "Normal"
      });
    }
  };

  // Function to clear the new notice form
  const clearNoticeForm = () => {
    setNewNotice({
      title: "",
      content: "",
      audience: "All Districts",
      priority: "Normal"
    });
  };

  // Function to get priority badge class
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-100 text-red-800';
      case 'Important':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const getBarColor = (value) => {
    return '#2563EB'; // slightly darker medium blue for all bars
  };

  // Handler functions for reports
  const handleGenerateReport = (reportType) => {
    console.log(`Generating ${reportType} report`);
    setGeneratingReport(reportType);

    // Simulate report generation delay
    setTimeout(() => {
      const newReport = {
        id: Date.now(),
        type: reportType,
        generatedAt: new Date().toLocaleString(),
        status: 'completed'
      };

      setGeneratedReports(prev => [...prev, newReport]);
      setGeneratingReport(null);

      // Show success message
      alert(`${reportType} generated successfully!`);
    }, 1500);
  };

  const handleExportReport = () => {
    console.log('Exporting report');
    // Implement export logic here
    alert('Report exported successfully!');
  };

  const handleFilterReports = () => {
    console.log('Filtering reports');
    // Implement filter logic here
  };

  // Handler function for meal analysis report
  const handleGenerateMealAnalysisReport = () => {
    console.log('Generating meal analysis report');
    setGeneratingReport('Meal Analysis');

    // Simulate report generation delay
    setTimeout(() => {
      // Calculate analysis data
      const totalStudents = mealAttendanceData.reduce((total, school) => total + school.totalStudents, 0);
      const totalPresent = mealAttendanceData.reduce((total, school) => total + school.presentToday, 0);
      const attendanceRate = ((totalPresent / totalStudents) * 100).toFixed(2);

      const analysisData = {
        totalSchools: mealAttendanceData.length,
        totalStudents,
        totalPresent,
        attendanceRate,
        date: new Date().toLocaleDateString(),
        period: mealPeriod
      };

      const newReport = {
        id: Date.now(),
        type: 'Meal Analysis',
        generatedAt: new Date().toLocaleString(),
        status: 'completed',
        data: analysisData
      };

      setGeneratedReports(prev => [...prev, newReport]);
      setGeneratingReport(null);

      // Show success message with analysis data
      alert(`Meal Analysis Report Generated!

Date: ${analysisData.date}
Period: ${analysisData.period}
Total Schools: ${analysisData.totalSchools}
Total Students: ${analysisData.totalStudents.toLocaleString()}
Students Present: ${analysisData.totalPresent.toLocaleString()}
Attendance Rate: ${analysisData.attendanceRate}%`);
    }, 1500);
  };

  const handleExportMealAnalysisReport = () => {
    console.log('Exporting meal analysis report');
    // Calculate analysis data for export
    const totalStudents = mealAttendanceData.reduce((total, school) => total + school.totalStudents, 0);
    const totalPresent = mealAttendanceData.reduce((total, school) => total + school.presentToday, 0);
    const attendanceRate = ((totalPresent / totalStudents) * 100).toFixed(2);

    const analysisData = {
      totalSchools: mealAttendanceData.length,
      totalStudents,
      totalPresent,
      attendanceRate,
      date: new Date().toLocaleDateString(),
      period: mealPeriod
    };

    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Meal Analysis Report\n\n";
    csvContent += `Date: ${analysisData.date}\n`;
    csvContent += `Period: ${analysisData.period}\n`;
    csvContent += `Total Schools: ${analysisData.totalSchools}\n`;
    csvContent += `Total Students: ${analysisData.totalStudents}\n`;
    csvContent += `Students Present: ${analysisData.totalPresent}\n`;
    csvContent += `Attendance Rate: ${analysisData.attendanceRate}%\n\n`;
    csvContent += "School Details\n";
    csvContent += "School Name,Total Students,Present Today,Attendance Rate\n";

    mealAttendanceData.forEach(school => {
      const schoolAttendanceRate = ((school.presentToday / school.totalStudents) * 100).toFixed(2);
      csvContent += `${school.schoolName},${school.totalStudents},${school.presentToday},${schoolAttendanceRate}%\n`;
    });

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `meal_analysis_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert('Meal Analysis Report exported successfully!');
  };

  // Function to apply filters
  const applyFilters = () => {
    console.log('Applying filters:', selectedSchool, selectedDuration);
    setAppliedSchool(selectedSchool);
    setAppliedDuration(selectedDuration);
  };

  const summaryStats = [
    { label: 'Total Students', value: districtData.totalStudents.toLocaleString(), icon: Users, color: 'from-blue-500 to-blue-600', change: '+150' },
    { label: 'Total Schools', value: districtData.totalSchools, icon: School, color: 'from-blue-400 to-indigo-500', change: '+2' },
    { label: 'Daily Meals', value: districtData.totalMeals.toLocaleString(), icon: Utensils, color: 'from-indigo-400 to-indigo-500', change: '+150' },
    { label: 'Attendance Rate', value: `${districtData.attendanceRate}%`, icon: TrendingUp, color: 'from-indigo-500 to-purple-600', change: '+0.8%' },
  ];


  return (
    <div className="flex min-h-screen h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
      <ParticleBackground />
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-56 bg-white shadow-lg flex flex-col h-full"
      >
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-[11px] shadow-md">
                GD
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent truncate block">
                  Smart Attendance
                </span>
              </div>
              <p className="text-[11px] text-gray-500 truncate">Government</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-2.5 pt-0 space-y-0.5 overflow-y-auto">
          {[
            { id: 'home', icon: Home, label: 'Dashboard Home' },
            { id: 'schools', icon: School, label: 'Schools' },
            { id: 'notices', icon: Bell, label: 'Notices' },
            { id: 'reports', icon: FileText, label: 'Reports' },
            { id: 'alerts', icon: Bell, label: 'Alerts' },
            { id: 'middaymeal', icon: Utensils, label: 'Mid Day Meal' },
            { id: 'chatbot', icon: Bot, label: 'Chatbot' },
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-md transition-all ${activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span className="font-medium text-[11px]">{tab.label}</span>
              {tab.id === 'alerts' && (
                <span className="ml-auto bg-red-500 text-white text-[11px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {alerts.filter(a => a.status === 'new').length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-2.5 border-t border-gray-100 space-y-1">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="font-medium text-[11px]">Logout</span>
          </button>
        </div>
      </motion.div>



      {/* Main Content */}
      <div className="flex-1 overflow-y-auto overscroll-contain flex flex-col h-full lg:ml-0">
        {/* Ultra Modern Header */}
        <div className="flex-shrink-0">
          <UltraModernHeader
            dashboardTitle="Government Official Dashboard"
            userType="Government"
            userName="Government Official"
            userRole="Education Oversight"
            onLogout={logout}
            onAlertsClick={() => handleTabChange('alerts')}
          />
        </div>

        {/* Dashboard Content */}
        <div className="p-3 flex-grow overflow-y-auto overscroll-contain">
          {/* Home Tab */}
          {activeTab === 'home' && (
            <div>
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-5 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden">
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute top-4 right-4 w-7 h-7 bg-white/10 rotate-45"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Official&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,f4511e,fb8c00,fdd835,ffb300"
                        alt="Government Official Avatar"
                        className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-white/30"
                      />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white mb-1.5">Good Morning, Official! 👋</h2>
                      <p className="text-[10px] text-blue-100 mb-2">Monitor educational statistics and policy implementation across districts</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                          <span className="text-[10px] text-white font-medium">{districtData.totalSchools} active schools</span>
                        </div>
                        <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
                          <span className="text-[10px] text-white font-medium">{alerts.filter(a => a.status === 'new').length} new alerts</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 rounded-md p-2">
                      <Building className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="flex gap-4 mb-6">
                {summaryStats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div
                      key={index}
                      className={`flex-grow bg-gradient-to-br ${stat.color} rounded-md p-4 shadow-sm border border-white/20 backdrop-blur-sm relative overflow-hidden`}
                    >
                      <div className="absolute -top-2 -right-2 w-10 h-10 bg-white/10 rounded-full"></div>
                      <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white/10 rounded-full"></div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center border border-white/30">
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-right">
                          <div className="text-base font-bold text-white">{stat.value}</div>
                          <div className="text-[10px] text-white/80">{stat.label}</div>
                        </div>
                      </div>
                      <div className="text-[10px] text-white/90 font-medium">+{stat.change} from last period</div>
                    </div>
                  );
                })}
              </div>

              {/* Charts and Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Attendance Trends Chart */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-md p-4 shadow-sm border border-blue-200/30 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-white/10 rounded-full"></div>

                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-white">Attendance Trends</h2>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setReportPeriod('weekly')}
                        className={`px-2 py-1 text-[10px] rounded-md ${reportPeriod === 'weekly' ? 'bg-white text-blue-600' : 'bg-white/20 text-white'}`}
                      >
                        Weekly
                      </button>
                      <button
                        onClick={() => setReportPeriod('monthly')}
                        className={`px-2 py-1 text-[10px] rounded-md ${reportPeriod === 'monthly' ? 'bg-white text-blue-600' : 'bg-white/20 text-white'}`}
                      >
                        Monthly
                      </button>
                      <button
                        onClick={() => setReportPeriod('yearly')}
                        className={`px-2 py-1 text-[10px] rounded-md ${reportPeriod === 'yearly' ? 'bg-white text-blue-600' : 'bg-white/20 text-white'}`}
                      >
                        Yearly
                      </button>
                    </div>
                  </div>
                  <div className="h-48 bg-white rounded-md p-3 border border-gray-200">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={attendanceTrendData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(229, 231, 235, 1)" />
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: 'rgba(107, 114, 128, 1)', fontSize: 10 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: 'rgba(107, 114, 128, 1)', fontSize: 10 }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            fontSize: '11px'
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="attendance"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          dot={{ r: 6, fill: '#fff', strokeWidth: 2, stroke: '#3B82F6' }}
                          activeDot={{ r: 8, fill: '#fff', strokeWidth: 2, stroke: '#6366F1' }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Alerts */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-md p-4 shadow-sm border border-gray-200/30 backdrop-blur-sm relative overflow-hidden mb-5">
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500/10 rounded-full"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-500/10 rounded-full"></div>

                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-blue-700">Recent Alerts</h2>
                    <button className="text-[10px] text-blue-600 hover:text-blue-700 font-medium">View All</button>
                  </div>
                  <div className="space-y-3">
                    {alerts.slice(0, 3).map((alert) => (
                      <motion.div
                        key={alert.id}
                        whileHover={{ x: 5 }}
                        className={`p-3 rounded-md border ${getSeverityColor(alert.severity)} transition-all duration-300`}
                      >
                        <div className="flex items-start gap-2">
                          <div className={`p-1.5 rounded-md ${getSeverityColorSolid(alert.severity)}`}>
                            {getAlertIcon(alert.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-[10px] mb-1">{alert.message}</p>
                            <p className="text-[9px] text-gray-500">{alert.time}</p>
                          </div>
                          <div className={`px-1.5 py-0.5 rounded-full text-[8px] font-medium ${getSeverityColor(alert.severity)}`}>
                            {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Quick Notices Section */}
                <div className="bg-white rounded-md p-3 shadow-sm border border-gray-100 mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xs font-bold text-blue-700">Recent Notices</h2>
                    <button
                      onClick={() => setActiveTab('notices')}
                      className="text-[8px] text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                    >
                      View All <span className="text-[9px]">→</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {notices.slice(0, 3).map((notice) => (
                      <div key={notice.id} className="border-l-2 border-blue-500 pl-2 py-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-900 text-[10px]">{notice.title}</h3>
                          <span className={`text-[7px] ${getPriorityBadgeClass(notice.priority)} px-1 py-0.5 rounded-full ml-1`}>
                            {notice.priority}
                          </span>
                        </div>
                        <p className="text-gray-600 text-[9px] mt-1 line-clamp-2">{notice.content.substring(0, 80)}{notice.content.length > 80 ? '...' : ''}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-[8px] text-gray-500">{notice.date}</span>
                          <span className="text-[8px] text-gray-500">To: {notice.audience}</span>
                        </div>
                        <div className="text-[7px] text-gray-400 mt-1">
                          From: {notice.sender}
                        </div>
                      </div>
                    ))}
                    {notices.length === 0 && (
                      <div className="text-center py-3">
                        <Bell className="w-5 h-5 text-gray-300 mx-auto mb-1" />
                        <p className="text-[9px] text-gray-500">No notices posted yet</p>
                        <button
                          onClick={() => setActiveTab('notices')}
                          className="text-[8px] text-blue-600 hover:text-blue-700 font-medium mt-1"
                        >
                          Create your first notice
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Schools Tab */}
          {activeTab === 'schools' && (
            <div>
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-5 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden">
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute top-4 right-4 w-7 h-7 bg-white/10 rotate-45"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-white mb-1.5">School Management Dashboard</h2>
                    <p className="text-[10px] text-blue-100 mb-2">Manage and monitor all schools under your jurisdiction</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{districtData.totalSchools} active schools</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{districtData.totalStudents.toLocaleString()} total students</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 rounded-md p-2">
                      <School className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-sm font-bold text-blue-700">School Management</h2>
                  <p className="text-[10px] text-gray-600 mt-1">View and manage all schools in your district</p>
                </div>
                <button
                  onClick={() => setShowAddSchoolForm(true)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md text-[10px] font-medium"
                >
                  <Plus className="w-3 h-3" />
                  Add School
                </button>
              </div>

              {/* Add School Form Modal */}
              {showAddSchoolForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                    <div className="p-3 border-b border-gray-200">
                      <h3 className="text-base font-semibold text-gray-900">Add New School</h3>
                    </div>
                    <div className="p-3 space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">School Name</label>
                        <input
                          type="text"
                          name="name"
                          value={newSchool.name}
                          onChange={handleNewSchoolChange}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                          placeholder="Enter school name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Number of Students</label>
                        <input
                          type="number"
                          name="students"
                          value={newSchool.students}
                          onChange={handleNewSchoolChange}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                          placeholder="Enter number of students"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Performance Grade</label>
                        <select
                          name="performance"
                          value={newSchool.performance}
                          onChange={handleNewSchoolChange}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                        >
                          <option value="A+">A+</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                        </select>
                      </div>
                    </div>
                    <div className="p-3 border-t border-gray-200 flex justify-end gap-2">
                      <button
                        onClick={() => setShowAddSchoolForm(false)}
                        className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={addNewSchool}
                        className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                      >
                        Add School
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* School Statistics */}
                <div className="space-y-6">
                  <div className="bg-white rounded-md p-4 shadow-sm border border-gray-100 relative overflow-hidden">
                    {/* Decorative elements for theme */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-indigo-500/10 rounded-full"></div>
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-purple-500/10 rounded-full"></div>
                    <h3 className="text-sm font-bold text-blue-700 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent relative z-10">District Statistics</h3>
                    <div className="space-y-3 relative z-10">
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 rounded-md border border-blue-100/50">
                        <div className="flex items-center gap-2">
                          <School className="w-4 h-4 text-blue-500" />
                          <span className="text-[10px] text-gray-700 font-medium">Total Schools</span>
                        </div>
                        <span className="font-bold text-gray-900 text-[10px] bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{districtData.totalSchools}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 rounded-md border border-blue-100/50">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span className="text-[10px] text-gray-700 font-medium">Total Students</span>
                        </div>
                        <span className="font-bold text-gray-900 text-[10px] bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{districtData.totalStudents.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 rounded-md border border-blue-100/50">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-blue-500" />
                          <span className="text-[10px] text-gray-700 font-medium">Average Class Size</span>
                        </div>
                        <span className="font-bold text-gray-900 text-[10px] bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{districtData.averageClassSize}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 rounded-md border border-red-100/50">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span className="text-[10px] text-gray-700 font-medium">Schools Needing Support</span>
                        </div>
                        <span className="font-bold text-red-600 text-[10px]">{districtData.schoolsNeedingSupport}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Schools List */}
                <div className="lg:col-span-2 bg-white rounded-md p-4 shadow-sm border border-gray-100 relative overflow-hidden mb-3">
                  {/* Decorative elements for theme */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-indigo-500/10 rounded-full"></div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-purple-500/10 rounded-full"></div>
                  <h3 className="text-sm font-bold text-blue-700 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent relative z-10">All Schools</h3>
                  <div className="overflow-x-auto relative z-10">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                          <th className="text-left py-3 px-4 font-bold text-[11px] bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-wider">School</th>
                          <th className="text-left py-3 px-4 font-bold text-[11px] bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-wider">Students</th>
                          <th className="text-left py-3 px-4 font-bold text-[11px] bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-wider">Attendance</th>
                          <th className="text-left py-3 px-4 font-bold text-[11px] bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-wider">Performance</th>
                          <th className="text-left py-3 px-4 font-bold text-[11px] bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-wider">Alerts</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schools.map((school) => (
                          <tr key={school.id} className="border-b border-gray-100 hover:bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 transition-all duration-300 group">
                            <td className="py-3 px-4">
                              <div className="font-medium text-gray-900 text-[10px] flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-[10px] shadow-sm">
                                  {school.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="font-semibold">{school.name}</div>
                                  <div className="text-[9px] text-gray-500">ID: {school.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-700 text-[10px] font-medium">
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3 text-blue-500" />
                                {school.students.toLocaleString()}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${school.attendance >= 95 ? 'bg-green-500' : school.attendance >= 90 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                                    style={{ width: `${school.attendance}%` }}
                                  ></div>
                                </div>
                                <span className="text-[10px] font-medium text-gray-700">{school.attendance}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-[9px] font-bold ${{
                                'A+': 'bg-green-100 text-green-800',
                                'A': 'bg-blue-100 text-blue-800',
                                'B': 'bg-yellow-100 text-yellow-800',
                                'C': 'bg-orange-100 text-orange-800',
                                'D': 'bg-red-100 text-red-800'
                              }[school.performance] || 'bg-gray-100 text-gray-800'}`}>
                                {school.performance}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1">
                                <Bell className="w-3 h-3 text-gray-500" />
                                <span className="text-[10px] font-medium text-gray-700">{school.alerts}</span>
                              </div>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div>
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-5 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden">
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute top-4 right-4 w-7 h-7 bg-white/10 rotate-45"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-white mb-1.5">Reports & Analytics Dashboard</h2>
                    <p className="text-[10px] text-blue-100 mb-2">Comprehensive insights and analytics for data-driven decisions</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{attendanceTrendData.length} months data</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">Real-time analytics</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 rounded-md p-2">
                      <BarChart className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-sm font-bold text-blue-700">Reports & Analytics</h2>
                  <p className="text-[10px] text-gray-600 mt-1">Generate and export comprehensive educational reports</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleFilterReports}
                    className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-[10px] font-medium"
                  >
                    <Filter className="w-3 h-3" />
                    Filter
                  </button>
                  <button
                    onClick={handleExportReport}
                    className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md text-[10px] font-medium"
                  >
                    <Download className="w-3 h-3" />
                    Export Report
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 mb-6">
                {/* Attendance Analytics */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 shadow-lg border border-blue-200/30 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/10 rounded-full"></div>

                  <h3 className="text-sm font-bold text-white mb-4">Attendance Analytics</h3>
                  <div className="h-48 bg-white/20 rounded-lg p-4 backdrop-blur-sm border border-white/30">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={attendanceTrendData}>
                        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(255,255,255,0.4)" />
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: 'rgba(255,255,255,0.9)', fontSize: 9, fontWeight: 500 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: 'rgba(255,255,255,0.9)', fontSize: 9, fontWeight: 500 }}
                          domain={[0, 100]}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(255,255,255,0.95)',
                            borderRadius: '10px',
                            border: '1px solid rgba(255,255,255,0.4)',
                            boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                            backdropFilter: 'blur(12px)',
                            fontSize: '11px',
                            padding: '10px'
                          }}
                          labelStyle={{ color: '#1e40af', fontWeight: 600 }}
                          formatter={(value) => [`${value}%`, 'Attendance Rate']}
                        />
                        <Legend
                          wrapperStyle={{ paddingTop: '10px' }}
                          formatter={(value) => <span className="text-white font-medium">{value}</span>}
                        />
                        <Bar
                          dataKey="attendance"
                          name="Attendance Rate (%)"
                          fill="rgba(255,255,255,0.95)"
                          radius={[6, 6, 0, 0]}
                          barSize={30}
                          animationDuration={800}
                        >
                          {attendanceTrendData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill="#3B82F6" />
                          ))}
                        </Bar>
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Detailed Reports */}
              <div className="mt-6 bg-white rounded-md p-4 shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-blue-700 mb-4">Detailed Reports</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { title: 'Monthly Attendance Report', description: 'Comprehensive attendance analysis', icon: FileText },
                    { title: 'School Performance Index', description: 'Performance metrics across schools', icon: Target },
                    { title: 'Resource Allocation Report', description: 'Budget and resource distribution', icon: Utensils },
                    { title: 'Policy Impact Analysis', description: 'Effectiveness of educational policies', icon: Award },
                  ].map((report, index) => {
                    const IconComponent = report.icon;
                    return (
                      <div key={index} className="p-3 border border-gray-200 rounded-md hover:border-blue-300 transition-colors cursor-pointer">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                            <IconComponent className="w-4 h-4 text-blue-600" />
                          </div>
                          <h4 className="font-medium text-gray-900 text-[10px]">{report.title}</h4>
                        </div>
                        <p className="text-[9px] text-gray-500 mb-2">{report.description}</p>
                        <button
                          onClick={() => handleGenerateReport(report.title)}
                          disabled={generatingReport === report.title}
                          className={`text-[10px] font-medium ${generatingReport === report.title ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-700'}`}
                        >
                          {generatingReport === report.title ? 'Generating...' : 'Generate Report'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Alerts Tab */}
          {activeTab === 'alerts' && (
            <div>
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-5 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden">
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute top-4 right-4 w-7 h-7 bg-white/10 rotate-45"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-white mb-1.5">Alert Management Dashboard</h2>
                    <p className="text-[10px] text-blue-100 mb-2">Monitor and respond to critical system alerts and notifications</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{alerts.length} active alerts</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">Real-time monitoring</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 rounded-md p-2">
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-base font-bold text-blue-700">Alert Management</h2>
                  <p className="text-[10px] text-gray-600 mt-1">Monitor and respond to system alerts and notifications</p>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-[10px] font-medium">
                    <RefreshCw className="w-3 h-3" />
                    Refresh
                  </button>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="flex-grow bg-gradient-to-br from-red-500 to-orange-500 rounded-md p-4 text-white shadow-sm relative overflow-hidden">
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/10 rounded-full"></div>

                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold">Critical Alerts</h3>
                    <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-lg font-bold mb-1">12</div>
                  <div className="text-[9px] text-red-100">Require immediate attention</div>
                </div>

                <div className="flex-grow bg-gradient-to-br from-amber-500 to-yellow-500 rounded-md p-4 text-white shadow-sm relative overflow-hidden">
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/10 rounded-full"></div>

                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold">High Priority</h3>
                    <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center">
                      <Bell className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-lg font-bold mb-1">24</div>
                  <div className="text-[9px] text-amber-100">Should be addressed soon</div>
                </div>

                <div className="flex-grow bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md p-4 text-white shadow-sm relative overflow-hidden">
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/10 rounded-full"></div>

                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold">Medium Priority</h3>
                    <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center">
                      <Bell className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-lg font-bold mb-1">36</div>
                  <div className="text-[9px] text-blue-100">Monitor regularly</div>
                </div>
              </div>

              <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">All Alerts</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-md ${getSeverityColorSolid(alert.severity)}`}>
                          {getAlertIcon(alert.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h4 className="font-medium text-gray-900 text-[10px]">{alert.message}</h4>
                            <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-medium ${getSeverityColor(alert.severity)}`}>
                              {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                            </span>
                            <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-medium ${getSeverityColorSolid(alert.severity)} text-white`}>
                              {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                            </span>
                          </div>
                          <p className="text-[9px] text-gray-500 mb-2">{alert.time}</p>
                          <div className="flex gap-2">
                            <button className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-[10px] font-medium hover:bg-blue-200 transition-colors">
                              Acknowledge
                            </button>
                            <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-[10px] font-medium hover:bg-gray-200 transition-colors">
                              Snooze
                            </button>
                            <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-[10px] font-medium hover:bg-gray-200 transition-colors">
                              Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notices Tab */}
          {activeTab === 'notices' && (
            <div>
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-4 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden">
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute top-4 right-4 w-7 h-7 bg-white/10 rotate-45"></div>
                <div className="absolute top-1/3 left-1/4 w-7 h-7 bg-white/5 rounded-full"></div>
                <div className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-white/10 rotate-12"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-[13px] font-bold text-white mb-1.5">Notice Management Dashboard</h2>
                    <p className="text-[10px] text-blue-100 mb-2">Create and manage important notices for schools and districts</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{districtData.name}</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">Notice Board</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 rounded-md p-2">
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-[13px] font-bold text-blue-700">Post New Notice</h2>
                  <p className="text-[10px] text-gray-600 mt-1">Create and manage important notices for schools and districts</p>
                </div>
                <div className="flex gap-3">
                  <button
                    className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow text-[10px] font-medium"
                  >
                    <Plus className="w-3 h-3" />
                    Create Notice
                  </button>
                </div>
              </div>

              {/* Notice Creation Form */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-3">
                <h3 className="text-[11px] font-bold text-blue-700 mb-2">Compose Notice</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1">Notice Title</label>
                    <input
                      type="text"
                      name="title"
                      value={newNotice.title}
                      onChange={handleNewNoticeChange}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-[10px]"
                      placeholder="Enter notice title"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1">Notice Content</label>
                    <textarea
                      name="content"
                      value={newNotice.content}
                      onChange={handleNewNoticeChange}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-[10px]"
                      placeholder="Enter notice content"
                      rows="2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-medium text-gray-700 mb-1">Target Audience</label>
                      <select
                        name="audience"
                        value={newNotice.audience}
                        onChange={handleNewNoticeChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-[10px]"
                      >
                        <option value="All Districts">All Districts</option>
                        <option value="All Schools">All Schools</option>
                        <option value="Specific Districts">Specific Districts</option>
                        <option value="Specific Schools">Specific Schools</option>
                        <option value="Administrators">Administrators</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-medium text-gray-700 mb-1">Priority</label>
                      <select
                        name="priority"
                        value={newNotice.priority}
                        onChange={handleNewNoticeChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-[10px]"
                      >
                        <option value="Normal">Normal</option>
                        <option value="Important">Important</option>
                        <option value="Urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={clearNoticeForm}
                      className="px-2 py-1 border border-gray-300 text-gray-700 rounded text-[10px]"
                    >
                      Clear
                    </button>
                    <button
                      onClick={addNewNotice}
                      className="px-2 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded text-[10px]"
                    >
                      Post Notice
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Notices */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mt-[-4px]">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-[11px] font-bold text-blue-700">Recent Notices</h3>
                  <button className="text-blue-600 hover:text-blue-800 text-[10px] font-medium">View All</button>
                </div>

                <div className="space-y-3">
                  {notices.map((notice) => (
                    <div key={notice.id} className="border border-gray-200 rounded p-2 hover:bg-blue-50 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-gray-900 text-[12px]">{notice.title}</h4>
                        <span className={`text-[7px] ${getPriorityBadgeClass(notice.priority)} px-1 py-0.5 rounded-full`}>
                          {notice.priority}
                        </span>
                      </div>
                      <p className="text-gray-600 text-[10px] mb-1">{notice.content.substring(0, 100)}{notice.content.length > 100 ? '...' : ''}</p>
                      <div className="flex justify-between items-center text-[10px] text-gray-500">
                        <span>{notice.date} at {notice.time}</span>
                        <span>To: {notice.audience}</span>
                      </div>
                      <div className="text-[9px] text-gray-400 mt-1">
                        From: {notice.sender}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mid Day Meal Tab */}
          {activeTab === 'middaymeal' && (
            <div>
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-5 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden">
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute top-4 right-4 w-7 h-7 bg-white/10 rotate-45"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-white mb-1.5">Mid Day Meal Program Dashboard</h2>
                    <p className="text-[10px] text-blue-100 mb-2">Monitor and manage the mid day meal program across schools</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{districtData.totalSchools} schools enrolled</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{districtData.totalMeals.toLocaleString()} meals served</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 rounded-md p-2">
                      <Utensils className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-sm font-bold text-blue-700">Meal Program Overview</h2>
                  <p className="text-[10px] text-gray-600 mt-1">Monitor and manage the mid day meal program across schools</p>
                  <p className="text-[10px] text-gray-600 mt-1">Total meals to be served today: {selectedSchoolData.reduce((total, school) => total + school.presentToday, 0).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleGenerateMealAnalysisReport}
                    className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all text-[10px] shadow-sm hover:shadow-md"
                  >
                    <FileText className="w-3 h-3" />
                    Generate Analysis
                  </button>
                  <button
                    onClick={handleExportMealAnalysisReport}
                    className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all text-[10px] shadow-sm hover:shadow-md"
                  >
                    <Download className="w-3 h-3" />
                    Export Analysis
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-md p-4 shadow-sm border border-gray-100 mb-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">School</label>
                    <select
                      value={selectedSchool}
                      onChange={(e) => setSelectedSchool(e.target.value)}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="All Schools">All Schools</option>
                      {mealAttendanceData.map((school) => (
                        <option key={school.id} value={school.schoolName}>
                          {school.schoolName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Duration</label>
                    <select
                      value={selectedDuration}
                      onChange={(e) => setSelectedDuration(e.target.value)}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={applyFilters}
                      className="w-full px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-all text-[10px] font-medium"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Meal Statistics */}
                <div className="lg:col-span-1 space-y-4">
                  <div className="bg-white rounded-md p-4 shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-indigo-500/10 rounded-full"></div>
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-purple-500/10 rounded-full"></div>
                    <h3 className="text-sm font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent relative z-10">Program Statistics</h3>
                    <div className="space-y-3 relative z-10">
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 rounded-md border border-blue-100/50">
                        <div className="flex items-center gap-2">
                          <Utensils className="w-4 h-4 text-blue-500" />
                          <span className="text-[10px] text-gray-700 font-medium">Total Meals Served</span>
                        </div>
                        <span className="font-bold text-gray-900 text-[10px] bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{selectedSchoolData.reduce((total, school) => total + Math.round(school.presentToday * districtData.mealsPerStudent), 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 rounded-md border border-blue-100/50">
                        <div className="flex items-center gap-2">
                          <School className="w-4 h-4 text-blue-500" />
                          <span className="text-[10px] text-gray-700 font-medium">Enrolled Schools</span>
                        </div>
                        <span className="font-bold text-gray-900 text-[10px] bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{selectedSchoolData.length}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 rounded-md border border-blue-100/50">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span className="text-[10px] text-gray-700 font-medium">Beneficiary Students</span>
                        </div>
                        <span className="font-bold text-gray-900 text-[10px] bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{selectedSchoolData.reduce((total, school) => total + school.totalStudents, 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 rounded-md border border-green-100/50">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-[10px] text-gray-700 font-medium">Program Coverage</span>
                        </div>
                        <span className="font-bold text-green-600 text-[10px]">98.5%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nutrition Information and Meal Distribution Chart side by side */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nutrition Information */}
                  <div className="bg-white rounded-md p-4 shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500"></div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-teal-500/10 rounded-full"></div>
                    <h3 className="text-sm font-bold text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent relative z-10">Nutrition Information</h3>
                    <div className="space-y-3 relative z-10">
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50/50 via-teal-50/50 to-blue-50/50 rounded-md border border-green-100/50">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-700 font-medium">Calories per Meal</span>
                        </div>
                        <span className="font-bold text-gray-900 text-[10px]">450-500 kcal</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50/50 via-teal-50/50 to-blue-50/50 rounded-md border border-green-100/50">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-700 font-medium">Protein Content</span>
                        </div>
                        <span className="font-bold text-gray-900 text-[10px]">12-15g</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50/50 via-teal-50/50 to-blue-50/50 rounded-md border border-green-100/50">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-700 font-medium">Iron Content</span>
                        </div>
                        <span className="font-bold text-gray-900 text-[10px]">3-5mg</span>
                      </div>
                    </div>
                  </div>

                  {/* Meal Distribution Chart */}
                  <div className="bg-white rounded-md p-4 shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"></div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-orange-500/10 rounded-full"></div>
                    <h3 className="text-sm font-bold text-gray-900 mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent relative z-10">Meal Distribution Trends</h3>
                    <div className="h-48 bg-gradient-to-br from-amber-50 to-orange-50 rounded-md p-3 border border-amber-100 relative z-10">
                      <div className="flex items-center justify-center h-full text-gray-500 text-[10px]">
                        <div className="text-center">
                          <Utensils className="w-8 h-8 mx-auto mb-2 text-amber-400" />
                          <p>Meal distribution chart</p>
                          <p className="mt-1 text-[9px]">Data visualization will be displayed here</p>
                          <div className="flex justify-center gap-2 mt-3">
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-md flex items-center justify-center border border-amber-200 overflow-hidden">
                              <img
                                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&h=120&q=80"
                                alt="Rice and Curry Meal"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-md flex items-center justify-center border border-amber-200 overflow-hidden">
                              <img
                                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&h=120&q=80"
                                alt="Vegetable Thali"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-md flex items-center justify-center border border-amber-200 overflow-hidden">
                              <img
                                src="https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&h=120&q=80"
                                alt="Dal and Rice"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* School Meal Participation */}
              <div className="bg-white rounded-md p-4 shadow-sm border border-gray-100 relative overflow-hidden mb-6">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"></div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-indigo-500/10 rounded-full"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-purple-500/10 rounded-full"></div>
                <h3 className="text-sm font-bold text-gray-900 mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent relative z-10">School Meal Participation</h3>
                <div className="overflow-x-auto relative z-10">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
                        <th className="text-left py-3 px-4 font-bold text-[11px] bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-wider">School</th>
                        <th className="text-left py-3 px-4 font-bold text-[11px] bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-wider">Total Students</th>
                        <th className="text-left py-3 px-4 font-bold text-[11px] bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-wider">Present Today</th>
                        <th className="text-left py-3 px-4 font-bold text-[11px] bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-wider">Meals Served</th>
                        <th className="text-left py-3 px-4 font-bold text-[11px] bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-wider">Participation Rate</th>
                        <th className="text-left py-3 px-4 font-bold text-[11px] bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedSchoolData.map((school) => (
                        <tr key={school.id} className="border-b border-gray-100 hover:bg-gradient-to-r from-purple-50/50 via-indigo-50/50 to-blue-50/50 transition-all duration-300 group">
                          <td className="py-2 px-4">
                            <div className="font-medium text-gray-900 text-[10px] flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-[10px] shadow-sm">
                                {school.schoolName.charAt(0)}
                              </div>
                              <div>
                                <div className="font-semibold">{school.schoolName}</div>
                                <div className="text-[9px] text-gray-500">ID: {school.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-2 px-4 text-gray-700 text-[10px] font-medium">
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3 text-purple-500" />
                              {school.totalStudents.toLocaleString()}
                            </div>
                          </td>
                          <td className="py-2 px-4 text-gray-700 text-[10px] font-medium">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3 text-blue-500" />
                              {school.presentToday.toLocaleString()}
                            </div>
                          </td>
                          <td className="py-2 px-4 text-gray-700 text-[10px] font-medium">
                            <div className="flex items-center gap-1">
                              <Utensils className="w-3 h-3 text-amber-500" />
                              {Math.round(school.presentToday * districtData.mealsPerStudent).toLocaleString()}
                            </div>
                          </td>
                          <td className="py-2 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${((school.presentToday / school.totalStudents) * 100) >= 95 ? 'bg-green-500' : ((school.presentToday / school.totalStudents) * 100) >= 90 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                                  style={{ width: `${(school.presentToday / school.totalStudents) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-[10px] font-bold text-gray-700">{((school.presentToday / school.totalStudents) * 100).toFixed(1)}%</span>
                            </div>
                          </td>
                          <td className="py-2 px-4">
                            <span className="px-2 py-1 rounded-full text-[9px] font-bold bg-green-100 text-green-800">Active</span>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Weekly and Monthly Meal Reports */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Weekly Meal Report */}
                <div className={`bg-white rounded-md p-4 shadow-sm border ${appliedDuration === 'weekly' ? 'border-blue-300 ring-2 ring-blue-100' : 'border-gray-100'} relative overflow-hidden`}>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-indigo-500/10 rounded-full"></div>
                  <h3 className="text-sm font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent relative z-10">Weekly Meal Generation Report</h3>
                  <div className="overflow-x-auto relative z-10">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                          <th className="text-left py-2 px-3 font-bold text-[11px] bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-wider">Week</th>
                          <th className="text-left py-2 px-3 font-bold text-[11px] bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-wider">Meals Generated</th>
                          <th className="text-left py-2 px-3 font-bold text-[11px] bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-wider">Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {weeklyMealReportData.map((week, index) => {
                          // Calculate trend compared to previous week
                          let trend = 0;
                          let trendType = 'neutral';
                          if (index > 0) {
                            const prevWeek = weeklyMealReportData[index - 1];
                            trend = ((week.meals - prevWeek.meals) / prevWeek.meals) * 100;
                            trendType = trend > 0 ? 'up' : trend < 0 ? 'down' : 'neutral';
                          }

                          return (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 transition-all duration-300 group">
                              <td className="py-2 px-3 text-gray-900 text-[10px] font-bold">{week.week}</td>
                              <td className="py-2 px-3 text-gray-700 text-[10px] font-medium">
                                <div className="flex items-center gap-1">
                                  <Utensils className="w-3 h-3 text-blue-500" />
                                  {week.meals.toLocaleString()}
                                </div>
                              </td>
                              <td className="py-2 px-3">
                                {index > 0 ? (
                                  <div className="flex items-center gap-1">
                                    {trendType === 'up' ? (
                                      <TrendingUp className="w-3 h-3 text-green-500" />
                                    ) : trendType === 'down' ? (
                                      <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />
                                    ) : (
                                      <Minus className="w-3 h-3 text-gray-500" />
                                    )}
                                    <span className={`text-[10px] font-medium ${trendType === 'up' ? 'text-green-600' : trendType === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                                      {trendType === 'neutral' ? '0%' : `${Math.abs(trend).toFixed(1)}%`}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-[10px] text-gray-500">-</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Monthly Meal Report */}
                <div className={`bg-white rounded-md p-4 shadow-sm border ${appliedDuration === 'monthly' ? 'border-green-300 ring-2 ring-green-100' : 'border-gray-100'} relative overflow-hidden`}>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500"></div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-teal-500/10 rounded-full"></div>
                  <h3 className="text-sm font-bold text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent relative z-10">Monthly Meal Generation Report</h3>
                  <div className="overflow-x-auto relative z-10">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gradient-to-r from-green-50 to-teal-50">
                          <th className="text-left py-2 px-3 font-bold text-[11px] bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent uppercase tracking-wider">Month</th>
                          <th className="text-left py-2 px-3 font-bold text-[11px] bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent uppercase tracking-wider">Meals Generated</th>
                          <th className="text-left py-2 px-3 font-bold text-[11px] bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent uppercase tracking-wider">Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {monthlyMealReportData.map((month, index) => {
                          // Calculate trend compared to previous month
                          let trend = 0;
                          let trendType = 'neutral';
                          if (index > 0) {
                            const prevMonth = monthlyMealReportData[index - 1];
                            trend = ((month.meals - prevMonth.meals) / prevMonth.meals) * 100;
                            trendType = trend > 0 ? 'up' : trend < 0 ? 'down' : 'neutral';
                          }

                          return (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gradient-to-r from-green-50/50 via-teal-50/50 to-blue-50/50 transition-all duration-300 group">
                              <td className="py-2 px-3 text-gray-900 text-[10px] font-bold">{month.month}</td>
                              <td className="py-2 px-3 text-gray-700 text-[10px] font-medium">
                                <div className="flex items-center gap-1">
                                  <Utensils className="w-3 h-3 text-green-500" />
                                  {month.meals.toLocaleString()}
                                </div>
                              </td>
                              <td className="py-2 px-3">
                                {index > 0 ? (
                                  <div className="flex items-center gap-1">
                                    {trendType === 'up' ? (
                                      <TrendingUp className="w-3 h-3 text-green-500" />
                                    ) : trendType === 'down' ? (
                                      <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />
                                    ) : (
                                      <Minus className="w-3 h-3 text-gray-500" />
                                    )}
                                    <span className={`text-[10px] font-medium ${trendType === 'up' ? 'text-green-600' : trendType === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                                      {trendType === 'neutral' ? '0%' : `${Math.abs(trend).toFixed(1)}%`}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-[10px] text-gray-500">-</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chatbot Tab */}
          {activeTab === 'chatbot' && (
            <div>
              <RoleChatbot role="government" />
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-5 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden">
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute top-4 right-4 w-7 h-7 bg-white/10 rotate-45"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-white mb-1.5">System Settings Dashboard</h2>
                    <p className="text-[10px] text-blue-100 mb-2">Configure and customize your dashboard experience</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{Object.keys({ profile: 1, notifications: 1, security: 1, appearance: 1 }).length} setting categories</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">Personalized experience</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 rounded-md p-2">
                      <Settings className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-base font-bold text-blue-700">System Settings</h2>
                  <p className="text-[10px] text-gray-600 mt-1">Manage your account preferences and system settings</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md text-[10px] font-medium">
                    <RefreshCw className="w-3 h-3" />
                    Refresh
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all shadow-sm hover:shadow-md text-[10px] font-medium">
                    <Settings className="w-3 h-3" />
                    Reset
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Settings Navigation */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-200/30 backdrop-blur-sm p-1.5 sticky top-4">
                    <div className="p-3 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-1.5 text-[10px]">
                        <Settings className="w-4 h-4 text-blue-500" />
                        Settings
                      </h3>
                    </div>
                    {[
                      { id: 'profile', icon: User, label: 'Profile' },
                      { id: 'notifications', icon: Bell, label: 'Notifications' },
                      { id: 'security', icon: Shield, label: 'Security' },
                    ].map((tab) => {
                      const IconComponent = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveSettingsTab(tab.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all ${activeSettingsTab === tab.id
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm'
                            : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600 text-xs'
                            }`}
                        >
                          <IconComponent className="w-4 h-4" />
                          <span className="font-medium text-[10px]">{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Settings Content */}
                <div className="lg:col-span-3">
                  {activeSettingsTab === 'profile' && (
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-200/30 backdrop-blur-sm p-4">
                      <div className="mb-4 pb-3 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-sm font-bold text-blue-700 flex items-center gap-1.5">
                              <User className="w-4 h-4 text-blue-500" />
                              Profile Information
                            </h2>
                            <p className="text-[10px] text-gray-600 mt-1">Update your personal and professional details</p>
                          </div>
                          <div className="flex gap-1">
                            <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        <div className="flex flex-col items-center md:col-span-2">
                          <div className="relative mb-3 group">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md transform transition-all group-hover:scale-105">
                              GO
                            </div>
                            <button className="absolute bottom-1 right-1 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-all shadow-md transform hover:scale-110 flex items-center justify-center">
                              <Edit className="w-3 h-3" />
                            </button>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-all hover:underline text-xs">
                            <Camera className="w-3 h-3" />
                            Change Picture
                          </button>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-medium text-gray-700">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              defaultValue="Government Official"
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-xs hover:shadow-sm text-[10px]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-medium text-gray-700">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="email"
                              defaultValue="official@education.gov"
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-xs hover:shadow-sm text-[10px]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-medium text-gray-700">Department</label>
                          <div className="relative">
                            <Building className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              defaultValue="Education Oversight"
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-xs hover:shadow-sm text-[10px]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-medium text-gray-700">District</label>
                          <div className="relative">
                            <MapPin className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              defaultValue="Central District"
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-xs hover:shadow-sm text-[10px]"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                        <button className="px-3 py-1.5 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all shadow-sm hover:shadow-md font-medium flex items-center gap-1.5 text-[10px]">
                          <X className="w-3 h-3" />
                          Cancel
                        </button>
                        <button className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md font-medium flex items-center gap-1.5 text-[10px]">
                          <Save className="w-3 h-3" />
                          Save
                        </button>
                      </div>
                    </div>
                  )}

                  {activeSettingsTab === 'notifications' && (
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-200/30 backdrop-blur-sm p-4">
                      <div className="mb-4 pb-3 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-sm font-bold text-blue-700 flex items-center gap-1.5">
                              <Bell className="w-4 h-4 text-blue-500" />
                              Notification Preferences
                            </h2>
                            <p className="text-[10px] text-gray-600 mt-1">Customize how and when you receive alerts and updates</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <h3 className="font-medium text-gray-900 text-[10px]">Email Notifications</h3>
                            <p className="text-[10px] text-gray-600 mt-1">Receive alerts via email</p>
                          </div>
                          <div className="relative inline-block w-10 h-5 rounded-full bg-gray-300">
                            <input type="checkbox" className="absolute opacity-0 w-0 h-0" defaultChecked />
                            <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-all duration-300 before:absolute before:h-4 before:w-4 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all before:duration-300 checked:bg-blue-500 checked:before:transform checked:before:translate-x-5"></span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <h3 className="font-medium text-gray-900 text-[10px]">Push Notifications</h3>
                            <p className="text-[10px] text-gray-600 mt-1">Receive alerts on your device</p>
                          </div>
                          <div className="relative inline-block w-10 h-5 rounded-full bg-gray-300">
                            <input type="checkbox" className="absolute opacity-0 w-0 h-0" defaultChecked />
                            <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-all duration-300 before:absolute before:h-4 before:w-4 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all before:duration-300 checked:bg-blue-500 checked:before:transform checked:before:translate-x-5"></span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <h3 className="font-medium text-gray-900 text-[10px]">SMS Notifications</h3>
                            <p className="text-[10px] text-gray-600 mt-1">Receive alerts via text message</p>
                          </div>
                          <div className="relative inline-block w-10 h-5 rounded-full bg-gray-300">
                            <input type="checkbox" className="absolute opacity-0 w-0 h-0" />
                            <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-all duration-300 before:absolute before:h-4 before:w-4 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all before:duration-300 checked:bg-blue-500 checked:before:transform checked:before:translate-x-5"></span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <h3 className="font-medium text-gray-900 text-[10px]">Critical Alerts</h3>
                            <p className="text-[10px] text-gray-600 mt-1">Immediate notifications for critical issues</p>
                          </div>
                          <div className="relative inline-block w-10 h-5 rounded-full bg-gray-300">
                            <input type="checkbox" className="absolute opacity-0 w-0 h-0" defaultChecked />
                            <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-all duration-300 before:absolute before:h-4 before:w-4 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all before:duration-300 checked:bg-blue-500 checked:before:transform checked:before:translate-x-5"></span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 mt-4">
                        <button className="px-3 py-1.5 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all shadow-sm hover:shadow-md font-medium flex items-center gap-1.5 text-[10px]">
                          <X className="w-3 h-3" />
                          Cancel
                        </button>
                        <button className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md font-medium flex items-center gap-1.5 text-[10px]">
                          <Save className="w-3 h-3" />
                          Save
                        </button>
                      </div>
                    </div>
                  )}

                  {activeSettingsTab === 'security' && (
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-200/30 backdrop-blur-sm p-4">
                      <div className="mb-4 pb-3 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-base font-bold text-blue-700 flex items-center gap-1.5">
                              <Shield className="w-4 h-4 text-blue-500" />
                              Security Settings
                            </h2>
                            <p className="text-[10px] text-gray-600 mt-1">Manage your account security and authentication preferences</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h3 className="font-medium text-gray-900 text-[10px] mb-2">Password</h3>
                          <button className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all text-[10px] font-medium">
                            Change Password
                          </button>
                        </div>

                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h3 className="font-medium text-gray-900 text-[10px] mb-2">Two-Factor Authentication</h3>
                          <p className="text-[10px] text-gray-600 mb-2">Add an extra layer of security to your account</p>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-600">Currently disabled</span>
                            <button className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all text-[10px] font-medium">
                              Enable
                            </button>
                          </div>
                        </div>

                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h3 className="font-medium text-gray-900 text-[10px] mb-2">Login History</h3>
                          <p className="text-[10px] text-gray-600 mb-2">View recent login attempts</p>
                          <button className="px-3 py-1.5 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-md hover:from-gray-600 hover:to-gray-700 transition-all text-[10px] font-medium">
                            View History
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 mt-4">
                        <button className="px-3 py-1.5 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all shadow-sm hover:shadow-md font-medium flex items-center gap-1.5 text-[10px]">
                          <X className="w-3 h-3" />
                          Cancel
                        </button>
                        <button className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md font-medium flex items-center gap-1.5 text-[10px]">
                          <Save className="w-3 h-3" />
                          Save
                        </button>
                      </div>
                    </div>
                  )}
                </div>


              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GovernmentDashboard;