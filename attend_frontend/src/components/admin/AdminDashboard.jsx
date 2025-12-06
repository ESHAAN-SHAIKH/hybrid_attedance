import React, { useState, useEffect } from 'react'; // Force rebuild
import { Users, UserCheck, UserX, BookOpen, TrendingUp, FileText, Settings, LogOut, Home, Search, Filter, Download, Plus, Eye, Edit, Trash2, Printer, BarChart, PieChart, LineChart, Calendar, Clock, Shield, MapPin, AlertTriangle, CheckCircle, XCircle, RefreshCw, Bell, Menu, X, School, Activity, User, Book, Utensils, GraduationCap, Minus, Bot } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import UltraModernHeader from '../UltraModernHeader';
import ParticleBackground from '../ParticleBackground';
import RoleChatbot from '../chatbot/RoleChatbot';
import api from '../../services/api';

const AdminDashboard = () => {
  console.log('AdminDashboard rendering...'); // Debug log
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Set active tab based on current route
  const getActiveTabFromRoute = () => {
    const path = location.pathname;
    if (path.includes('/schools')) return 'schools';
    if (path.includes('/teachers')) return 'teachers';
    if (path.includes('/students')) return 'students';
    if (path.includes('/classes')) return 'classes';
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
    navigate(`/admin/${tab}`);
  };
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [newClassData, setNewClassData] = useState({
    name: '',
    subject: '',
    teacher: '',
    students: ''
  });

  // State for Add Teacher form
  const [newTeacherData, setNewTeacherData] = useState({
    name: '',
    email: '',
    subject: '',
    classes: '',
    students: '',
    password: '' // Added password field for new teacher
  });

  // State for Add Student form
  const [newStudentData, setNewStudentData] = useState({
    name: '',
    roll: '',
    class: '',
    attendance: '',
    grade: '',
    password: '',
    RFID_uid: '',
    face_encoding_id: '',
    parent_contact: '',
    email: '' // Added email field
  });

  // State for Edit Student form
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [reportPeriod, setReportPeriod] = useState('weekly'); // weekly, monthly, yearly
  const [showReportFilterModal, setShowReportFilterModal] = useState(false);
  const [reportClassFilter, setReportClassFilter] = useState('All Classes');
  const [reportSubjectFilter, setReportSubjectFilter] = useState('All Subjects');
  const [teacherAvatarPreview, setTeacherAvatarPreview] = useState(null);
  const [studentAvatarPreview, setStudentAvatarPreview] = useState(null);
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);
  const [avatarType, setAvatarType] = useState(''); // 'teacher' or 'student'
  const [mealFilter, setMealFilter] = useState('daily'); // daily, weekly, monthly

  // State for report generation
  const [generatingReport, setGeneratingReport] = useState(null);
  const [generatedReports, setGeneratedReports] = useState([]);

  // State for meal filtering
  const [selectedSchool, setSelectedSchool] = useState('All Schools');
  const [selectedDuration, setSelectedDuration] = useState('weekly'); // weekly, monthly

  // State for notices
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({ title: '', content: '', audience: 'All', priority: 'Medium' });
  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
  const [appliedSchool, setAppliedSchool] = useState('All Schools');
  const [appliedDuration, setAppliedDuration] = useState('This Week');

  const closeEditStudentModal = () => {
    setShowEditStudentModal(false);
    setEditingStudent(null);
  };

  const closeAddNoticeModal = () => {
    setShowAddNoticeModal(false);
    setNewNotice({ title: '', content: '', audience: 'All', priority: 'Medium' });
  };

  // Fetch notices safely
  const fetchNotices = async () => {
    try {
      const res = await api.get('/notices');
      if (res.data.success) {
        setNotices(res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch notices:', error);
    }
  };

  useEffect(() => {
    if (activeTab === 'notices') {
      fetchNotices();
    }
  }, [activeTab]);



  // Function to add a notice
  const handleAddNotice = async () => {
    if (newNotice.title && newNotice.content) {
      try {
        const res = await api.post('/notices', newNotice);
        if (res.data.success) {
          setNotices([res.data.data, ...notices]);
          setNewNotice({ title: '', content: '', audience: 'All', priority: 'Medium' });
          setShowAddNoticeModal(false);
          alert('Notice added successfully!');
        }
      } catch (error) {
        console.error('Failed to add notice:', error);
        alert('Failed to add notice');
      }
    } else {
      alert('Title and Content are required');
    }
  };

  // Function to delete a notice
  const handleDeleteNotice = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        const res = await api.delete(`/notices/${id}`);
        if (res.data.success) {
          setNotices(notices.filter(n => n._id !== id));
        }
      } catch (error) {
        console.error('Failed to delete notice:', error);
        alert('Failed to delete notice');
      }
    }
  };

  // Filter states for Teachers tab
  const [teacherSubjectFilter, setTeacherSubjectFilter] = useState('All Subjects');
  const [teacherClassFilter, setTeacherClassFilter] = useState('All Classes');
  const [teacherStatusFilter, setTeacherStatusFilter] = useState('All Statuses');

  // Filter states for Students tab
  const [studentClassFilter, setStudentClassFilter] = useState('All Classes');
  const [studentGradeFilter, setStudentGradeFilter] = useState('All Grades');
  const [studentAttendanceFilter, setStudentAttendanceFilter] = useState('All');

  // Filter states for Classes tab
  const [classSubjectFilter, setClassSubjectFilter] = useState('All Subjects');
  const [classGradeFilter, setClassGradeFilter] = useState('All Grades');
  const [classStudentsFilter, setClassStudentsFilter] = useState('All');

  // Predefined avatars
  const predefinedAvatars = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Eve',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Frank',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Henry'
  ];

  // Handler functions for class actions
  const handleViewClass = (classId) => {
    console.log('View class:', classId);
    // In a real app, this would open a modal or navigate to class details
    alert(`Viewing details for class ID: ${classId}`);
  };

  const handleEditClass = (classId) => {
    console.log('Edit class:', classId);
    // In a real app, this would open an edit modal
    alert(`Editing class ID: ${classId}`);
  };

  const handleDeleteClass = (classId) => {
    console.log('Delete class:', classId);
    // In a real app, this would show a confirmation and then delete
    if (window.confirm(`Are you sure you want to delete class ID: ${classId}?`)) {
      alert(`Deleted class ID: ${classId}`);
    }
  };

  // School-specific data
  const [schoolData, setSchoolData] = useState({
    name: 'Saboo Siddik Degree',
    location: 'Mumbai, Maharashtra',
    principal: 'Asrar Pathan',
    contact: 'info@sabboosiddik.edu',
    established: '1970',
    totalStudents: 0,
    totalTeachers: 0,
    currentAttendance: 0,
    mealsPerStudent: 1,
    totalMeals: 1500
  });

  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, teachersRes, classesRes, studentsRes] = await Promise.all([
          api.get('/reports/stats'),
          api.get('/auth/teachers'),
          api.get('/students/classes'),
          api.get('/students') // Assumes this endpoint exists and returns all students or paginated
        ]);

        if (statsRes.data.success) {
          const stats = statsRes.data.data;
          setSchoolData(prev => ({
            ...prev,
            totalStudents: stats.totalStudents,
            totalTeachers: stats.totalTeachers,
            currentAttendance: stats.attendancePercentage
          }));
        }

        if (teachersRes.data.success) {
          setTeachers(teachersRes.data.data.map(t => ({
            id: t._id,
            name: t.name,
            email: t.email,
            subject: t.subject || 'N/A',
            classes: ['Unassigned'], // Backend doesn't strictly link yet
            students: 0,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.name}`
          })));
        }

        if (classesRes.data.success) {
          setClasses(classesRes.data.data.map((c, index) => ({
            id: index + 1,
            name: c._id,
            teacher: 'See below',
            students: c.studentCount,
            subject: 'General'
          })));
        }

        if (studentsRes.data.success) {
          setStudents(studentsRes.data.data.map(s => ({
            id: s._id || s.student_id,
            name: s.name,
            roll: s.student_id,
            class: s.class,
            attendance: 0, // Would need individual fetch or included in list
            grade: 'N/A',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${s.name}`,
            email: s.email
          })));
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [activeTab]);

  // Sample meal attendance data for this school
  const mealAttendanceData = [
    { id: 1, schoolId: 1, schoolName: 'Saboo Siddik Degree', totalStudents: 1500, presentToday: 1380, date: '2023-06-15' }
  ];

  // Sample weekly and monthly meal data
  const weeklyMealData = [
    { week: 'Week 1', meals: 7500 },
    { week: 'Week 2', meals: 7800 },
    { week: 'Week 3', meals: 7600 },
    { week: 'Week 4', meals: 8100 }
  ];

  const monthlyMealData = [
    { month: 'January', meals: 32000 },
    { month: 'February', meals: 29000 },
    { month: 'March', meals: 33000 },
    { month: 'April', meals: 31000 },
    { month: 'May', meals: 35000 }
  ];

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


  // Performance data for this school
  const performanceData = [
    { subject: 'Math', averageScore: 85 },
    { subject: 'Science', averageScore: 78 },
    { subject: 'English', averageScore: 82 },
    { subject: 'History', averageScore: 76 },
    { subject: 'Computer', averageScore: 90 },
  ];

  // Enhanced attendance data for different periods
  const weeklyAttendanceData = [
    { day: 'Mon', attendance: 92 },
    { day: 'Tue', attendance: 89 },
    { day: 'Wed', attendance: 91 },
    { day: 'Thu', attendance: 93 },
    { day: 'Fri', attendance: 90 },
  ];

  const monthlyAttendanceData = [
    { week: 'Week 1', attendance: 89 },
    { week: 'Week 2', attendance: 91 },
    { week: 'Week 3', attendance: 93 },
    { week: 'Week 4', attendance: 92 },
  ];

  const yearlyAttendanceData = [
    { month: 'Jan', attendance: 89 },
    { month: 'Feb', attendance: 91 },
    { month: 'Mar', attendance: 93 },
    { month: 'Apr', attendance: 92 },
    { month: 'May', attendance: 94 },
    { month: 'Jun', attendance: 90 },
    { month: 'Jul', attendance: 91 },
    { month: 'Aug', attendance: 93 },
    { month: 'Sep', attendance: 92 },
    { month: 'Oct', attendance: 90 },
    { month: 'Nov', attendance: 91 },
    { month: 'Dec', attendance: 92 },
  ];

  const alerts = [
    { id: 1, type: 'lowAttendance', message: 'Overall attendance dropped below 90%', time: '2 hours ago', severity: 'high', status: 'new' },
    { id: 2, type: 'device', message: 'RFID readers malfunctioning', time: '5 hours ago', severity: 'medium', status: 'acknowledged' },
    { id: 3, type: 'safety', message: 'Unauthorized access attempt', time: '1 day ago', severity: 'critical', status: 'resolved' },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-800';
      case 'high': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getSeverityColorSolid = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'lowAttendance': return <UserX className="w-5 h-5" />;
      case 'device': return <Activity className="w-5 h-5" />;
      case 'safety': return <Shield className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getBarColor = (value) => {
    if (value >= 40) return '#10B981'; // green
    if (value >= 30) return '#3B82F6'; // blue
    if (value >= 20) return '#F59E0B'; // amber
    return '#EF4444'; // red
  };

  const handleAddTeacher = async () => {
    // Validate required fields
    if (newTeacherData.name && newTeacherData.email && newTeacherData.password) {
      try {
        const payload = {
          name: newTeacherData.name,
          email: newTeacherData.email,
          password: newTeacherData.password,
          subject: newTeacherData.subject,
          // classes/students logic might need adjustment based on backend schema
        };

        const res = await api.post('/teachers', payload);

        if (res.data.success) {
          // Update state
          const newTeacher = {
            id: res.data.data.id,
            name: res.data.data.name,
            email: res.data.data.email,
            subject: res.data.data.subject || newTeacherData.subject,
            classes: ['Unassigned'],
            students: 0,
            avatar: teacherAvatarPreview || `https://api.dicebear.com/7.x/avataaars/svg?seed=${res.data.data.name}`
          };

          setTeachers(prev => [...prev, newTeacher]);
          setNewTeacherData({ name: '', email: '', subject: '', classes: '', students: '', password: '' });
          setShowAddTeacherModal(false);
          setTeacherAvatarPreview(null);
          alert('Teacher added successfully');
        }
      } catch (error) {
        console.error('Failed to add teacher:', error);
        alert('Failed to add teacher: ' + (error.response?.data?.error || error.message));
      }
    } else {
      alert('Name, Email, and Password are required.');
    }
  };

  // State for Edit Teacher
  const [showEditTeacherModal, setShowEditTeacherModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const handleEditTeacher = (teacher) => {
    setEditingTeacher({
      ...teacher,
      password: '' // Reset password for security/don't preload hash
    });
    setShowEditTeacherModal(true);
  };

  const handleEditTeacherChange = (e) => {
    const { name, value } = e.target;
    setEditingTeacher(prev => ({ ...prev, [name]: value }));
  };

  const closeEditTeacherModal = () => {
    setShowEditTeacherModal(false);
    setEditingTeacher(null);
  };

  const handleUpdateTeacher = async () => {
    if (!editingTeacher) return;
    try {
      const res = await api.put(`/teachers/${editingTeacher.id}`, editingTeacher);
      if (res.data.success) {
        setTeachers(prev => prev.map(t => t.id === editingTeacher.id ? { ...t, ...editingTeacher, password: '' } : t));
        setShowEditTeacherModal(false);
        setEditingTeacher(null);
        alert('Teacher updated successfully');
      }
    } catch (error) {
      console.error('Failed to update teacher:', error);
      alert('Failed to update teacher: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleDeleteTeacher = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await api.delete(`/teachers/${id}`);
        setTeachers(prev => prev.filter(t => t.id !== id));
      } catch (error) {
        console.error('Failed to delete teacher:', error);
        alert('Failed to delete teacher');
      }
    }
  };

  const handleAddStudent = async () => {
    // Validate required fields
    if (newStudentData.name && newStudentData.roll && newStudentData.class && newStudentData.password) {
      try {
        const studentPayload = {
          student_id: newStudentData.roll, // Using roll as student_id
          name: newStudentData.name,
          class: newStudentData.class,
          password: newStudentData.password,
          RFID_uid: newStudentData.RFID_uid,
          face_encoding_id: newStudentData.face_encoding_id,
          parent_contact: newStudentData.parent_contact,
          email: newStudentData.email
        };

        const response = await api.post('/students', studentPayload);

        if (response.data.success) {
          // Refresh students list (we'll rely on the useEffect to re-fetch or we could manually update if we implemented fetchStudents)
          // For now, let's just re-fetch by toggling tab or update active tab logic? 
          // Actually, useEffect depends on activeTab. We can just invoke data fetching.
          // However, keeping it simple:

          setNewStudentData({
            name: '',
            roll: '',
            class: '',
            attendance: '',
            grade: '',
            password: '',
            RFID_uid: '',
            face_encoding_id: '',
            parent_contact: '',
            email: ''
          });
          setShowAddStudentModal(false);
          setStudentAvatarPreview(null);
          alert('Student added successfully!');

          // Trigger re-fetch if possible, or just let user refresh. 
          // Ideally we call fetchStudents() but that's inside useEffect.
          // We can force a reload by simulating tab change or just alert.
        }
      } catch (error) {
        console.error('Failed to add student:', error);
        alert('Failed to add student: ' + (error.response?.data?.error || error.message));
      }
    } else {
      alert('Please fill in all required fields (Name, Roll No, Class, Password)');
    }
  };

  // Function to open edit student modal
  const handleEditStudent = (student) => {
    setEditingStudent({
      ...student,
      password: '' // Don't pre-fill password usually
    });
    setShowEditStudentModal(true);
  };

  const handleEditStudentChange = (e) => {
    const { name, value } = e.target;
    setEditingStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateStudent = async () => {
    if (!editingStudent) return;
    try {
      // Use student_id (which is mapped to roll in frontend) for ID
      const res = await api.put(`/students/${editingStudent.roll}`, editingStudent);
      if (res.data.success) {
        alert('Student updated successfully');
        setShowEditStudentModal(false);
        setEditingStudent(null);

        // Update local state to reflect changes immediately
        setStudents(prevStudents =>
          prevStudents.map(student =>
            student.roll === editingStudent.roll ? { ...student, ...editingStudent } : student
          )
        );
      }
    } catch (error) {
      console.error('Failed to update student:', error);
      alert('Failed to update student: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleAddClass = () => {
    // In a real app, this would make an API call to add a class
    console.log('Adding new class:', newClassData);

    // Add the new class to the classes array
    if (newClassData.name && newClassData.subject) {
      const newClass = {
        id: classes.length + 1,
        name: newClassData.name,
        subject: newClassData.subject,
        teacher: newClassData.teacher || 'Not Assigned',
        students: parseInt(newClassData.students) || 0
      };

      // Update the state with the new class
      setClasses(prevClasses => [...prevClasses, newClass]);

      // Reset the form and close the modal
      setNewClassData({ name: '', subject: '', teacher: '', students: '' });
      setShowAddClassModal(false);
    }
  };

  const handleNewClassChange = (e) => {
    const { name, value } = e.target;
    setNewClassData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewTeacherChange = (e) => {
    const { name, value } = e.target;
    setNewTeacherData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewStudentChange = (e) => {
    const { name, value } = e.target;
    setNewStudentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const closeAddClassModal = () => {
    setShowAddClassModal(false);
    setNewClassData({ name: '', subject: '', teacher: '', students: '' });
  };

  const closeAddTeacherModal = () => {
    setShowAddTeacherModal(false);
    setNewTeacherData({ name: '', email: '', subject: '', classes: '', students: '' });
    setTeacherAvatarPreview(null);
  };

  const closeAddStudentModal = () => {
    setShowAddStudentModal(false);
    setNewStudentData({
      name: '',
      roll: '',
      class: '',
      attendance: '',
      grade: '',
      password: '',
      RFID_uid: '',
      face_encoding_id: '',
      parent_contact: ''
    });
    setStudentAvatarPreview(null);
  };

  const handleTeacherAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTeacherAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStudentAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setStudentAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePredefinedAvatarSelect = (avatarUrl) => {
    if (avatarType === 'teacher') {
      setTeacherAvatarPreview(avatarUrl);
    } else if (avatarType === 'student') {
      setStudentAvatarPreview(avatarUrl);
    }
    setShowAvatarOptions(false);
  };

  const openAvatarOptions = (type) => {
    setAvatarType(type);
    setShowAvatarOptions(true);
  };

  const closeAvatarOptions = () => {
    setShowAvatarOptions(false);
    setAvatarType('');
  };

  // Function to apply filters
  const applyFilters = () => {
    console.log('Applying filters:', selectedSchool, selectedDuration);
    setAppliedSchool(selectedSchool);
    setAppliedDuration(selectedDuration);
  };

  // Function to apply teacher filters
  const applyTeacherFilters = () => {
    console.log('Applying teacher filters:', teacherSubjectFilter, teacherClassFilter, teacherStatusFilter);
    // Filtering logic would go here
  };

  // Filter teachers based on filter criteria
  const getFilteredTeachers = () => {
    return teachers.filter(teacher => {
      // Subject filter
      if (teacherSubjectFilter !== 'All Subjects' && teacher.subject !== teacherSubjectFilter) {
        return false;
      }

      // Class filter
      if (teacherClassFilter !== 'All Classes' && !teacher.classes.includes(teacherClassFilter)) {
        return false;
      }

      // Status filter (simplified - in a real app, you'd have an actual status field)
      if (teacherStatusFilter !== 'All Statuses') {
        // For demo purposes, we'll consider all teachers as active
        if (teacherStatusFilter === 'Inactive') {
          return false;
        }
      }

      return true;
    });
  };

  // Function to apply student filters
  const applyStudentFilters = () => {
    console.log('Applying student filters:', studentClassFilter, studentGradeFilter, studentAttendanceFilter);
    // Filtering logic would go here
  };

  // Filter students based on filter criteria
  const getFilteredStudents = () => {
    return students.filter(student => {
      // Class filter
      if (studentClassFilter !== 'All Classes' && student.class !== studentClassFilter) {
        return false;
      }

      // Grade filter
      if (studentGradeFilter !== 'All Grades' && student.grade !== studentGradeFilter) {
        return false;
      }

      // Attendance filter
      if (studentAttendanceFilter !== 'All') {
        const attendance = student.attendance;
        if (studentAttendanceFilter === 'Above 90%' && attendance <= 90) {
          return false;
        } else if (studentAttendanceFilter === '80-90%' && (attendance < 80 || attendance > 90)) {
          return false;
        } else if (studentAttendanceFilter === 'Below 80%' && attendance >= 80) {
          return false;
        }
      }

      return true;
    });
  };

  // Function to apply class filters
  const applyClassFilters = () => {
    console.log('Applying class filters:', classSubjectFilter, classGradeFilter, classStudentsFilter);
    // Filtering logic would go here
  };

  // Function to apply report filters
  const applyReportFilters = () => {
    console.log('Applying report filters:', reportClassFilter, reportSubjectFilter, reportPeriod);
    // In a real app, this would update the charts with filtered data
    setShowReportFilterModal(false);
  };

  const closeReportFilterModal = () => {
    setShowReportFilterModal(false);
  };

  // Function to handle new notice form input changes
  const handleNewNoticeChange = (e) => {
    const { name, value } = e.target;
    setNewNotice(prev => ({ ...prev, [name]: value }));
  };

  // Filter classes based on filter criteria
  const getFilteredClasses = () => {
    return classes.filter(classItem => {
      // Subject filter
      if (classSubjectFilter !== 'All Subjects' && classItem.subject !== classSubjectFilter) {
        return false;
      }

      // Grade filter (using class name as grade)
      if (classGradeFilter !== 'All Grades' && classItem.name !== classGradeFilter) {
        return false;
      }

      // Students filter
      if (classStudentsFilter !== 'All') {
        const studentCount = classItem.students;
        if (classStudentsFilter === '0-25' && (studentCount < 0 || studentCount > 25)) {
          return false;
        } else if (classStudentsFilter === '26-35' && (studentCount < 26 || studentCount > 35)) {
          return false;
        } else if (classStudentsFilter === '36-50' && (studentCount < 36 || studentCount > 50)) {
          return false;
        } else if (classStudentsFilter === '51-100' && studentCount <= 50) {
          return false;
        }
      }

      return true;
    });
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

  // Get current attendance data based on selected period
  const getCurrentAttendanceData = () => {
    switch (reportPeriod) {
      case 'weekly':
        return weeklyAttendanceData;
      case 'monthly':
        return monthlyAttendanceData;
      case 'yearly':
        return yearlyAttendanceData;
      default:
        return weeklyAttendanceData;
    }
  };

  // Get current attendance data key based on selected period
  const getDataKey = () => {
    switch (reportPeriod) {
      case 'weekly':
        return 'day';
      case 'monthly':
        return 'week';
      case 'yearly':
        return 'month';
      default:
        return 'day';
    }
  };

  const summaryStats = [
    { label: 'Total Students', value: schoolData.totalStudents, icon: Users, color: 'from-blue-500 to-blue-600', change: '+150' },
    { label: 'Total Teachers', value: schoolData.totalTeachers, icon: User, color: 'from-blue-400 to-indigo-500', change: '+5' },
    { label: 'Present Today', value: Math.round(schoolData.totalStudents * schoolData.currentAttendance / 100), icon: UserCheck, color: 'from-indigo-400 to-indigo-500', change: '+180' },
    { label: 'Attendance Rate', value: `${schoolData.currentAttendance}%`, icon: TrendingUp, color: 'from-indigo-500 to-purple-600', change: '-0.3%' },
  ];

  return (
    <div className="flex min-h-screen h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
      <ParticleBackground />
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-52 bg-white shadow-lg flex flex-col h-full"
      >
        <div className="p-2.5 border-b border-gray-100">
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-[11px] shadow-md">
                AD
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent truncate block">
                  Smart Attendance
                </span>
              </div>
              <p className="text-[10px] text-gray-500 truncate">Admin</p>
            </div>
            <div className="relative">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,f4511e,fb8c00,fdd835,ffb300"
                alt="Admin User Avatar"
                className="w-8 h-8 rounded-full border-2 border-white shadow-md"
              />
            </div>
          </div>
        </div>

        <nav className="flex-1 p-2 pt-0 space-y-0.5 overflow-y-auto">
          {[
            { id: 'home', icon: Home, label: 'Dashboard Home' },
            { id: 'teachers', icon: User, label: 'Teachers' },
            { id: 'students', icon: Users, label: 'Students' },
            { id: 'classes', icon: BookOpen, label: 'Classes' },
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
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md transition-all ${activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
            >
              <tab.icon className="w-3 h-3" />
              <span className="font-medium text-[11px]">{tab.label}</span>
              {tab.id === 'alerts' && (
                <span className="ml-auto bg-red-500 text-white text-[8px] font-bold rounded-full w-3 h-3 flex items-center justify-center">
                  3
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-gray-100 space-y-1">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut className="w-3 h-3" />
            <span className="font-medium text-[11px]">Logout</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto overscroll-contain flex flex-col h-full">
        {/* Ultra Modern Header */}
        <div className="flex-shrink-0">
          <UltraModernHeader
            dashboardTitle="School Admin Dashboard"
            userType="Admin"
            userName="Admin User"
            userRole="School Administrator"
            onLogout={logout}
            onAlertsClick={() => handleTabChange('alerts')}
          />
        </div>

        {/* Dashboard Content */}
        <div className="p-4 flex-grow overflow-y-auto">
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
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,f4511e,fb8c00,fdd835,ffb300"
                        alt="Admin User Avatar"
                        className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-white/30"
                      />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white mb-1.5">Good Morning, Admin! 👋</h2>
                      <p className="text-xs text-blue-100 mb-2">Manage school-wide attendance and oversee academic performance</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                          <span className="text-[10px] text-white font-medium">{schoolData.totalStudents} total students</span>
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
                      <School className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-4 mb-6">
                {summaryStats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div
                      key={index}
                      className={`bg-gradient-to-br ${stat.color} rounded-md p-4 shadow-sm border border-white/20 backdrop-blur-sm relative overflow-hidden`}
                    >
                      <div className="absolute -top-2 -right-2 w-10 h-10 bg-white/10 rounded-full"></div>
                      <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white/10 rounded-full"></div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center border border-white/30">
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-white">{stat.value}</div>
                          <div className="text-[9px] text-white/80">{stat.label}</div>
                        </div>
                      </div>
                      <div className="text-[9px] text-white/90 font-medium">+{stat.change} from last period</div>
                    </div>
                  );
                })}
              </div>

              {/* Charts and Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Attendance Trends Chart */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 shadow-lg border border-blue-200/30 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/10 rounded-full"></div>

                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-base font-bold text-white">Attendance Trends</h2>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setReportPeriod('weekly')}
                        className={`px-2.5 py-1.5 text-[10px] rounded-md font-medium ${reportPeriod === 'weekly' ? 'bg-white text-blue-600 shadow-sm' : 'bg-white/20 text-white'}`}
                      >
                        Weekly
                      </button>
                      <button
                        onClick={() => setReportPeriod('monthly')}
                        className={`px-2.5 py-1.5 text-[10px] rounded-md font-medium ${reportPeriod === 'monthly' ? 'bg-white text-blue-600 shadow-sm' : 'bg-white/20 text-white'}`}
                      >
                        Monthly
                      </button>
                      <button
                        onClick={() => setReportPeriod('yearly')}
                        className={`px-2.5 py-1.5 text-[10px] rounded-md font-medium ${reportPeriod === 'yearly' ? 'bg-white text-blue-600 shadow-sm' : 'bg-white/20 text-white'}`}
                      >
                        Yearly
                      </button>
                    </div>
                  </div>
                  <div className="h-52 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={getCurrentAttendanceData()}>
                        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(229, 231, 235, 1)" />
                        <XAxis
                          dataKey={getDataKey()}
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: 'rgba(107, 114, 128, 1)', fontSize: 11, fontWeight: 500 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: 'rgba(107, 114, 128, 1)', fontSize: 11, fontWeight: 500 }}
                          domain={[80, 100]}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(255,255,255,0.95)',
                            borderRadius: '10px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
                            fontSize: '12px',
                            padding: '10px'
                          }}
                          formatter={(value) => [`${value}%`, 'Attendance']}
                          labelStyle={{ fontWeight: 600 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="attendance"
                          stroke="#3B82F6"
                          strokeWidth={3}
                          dot={{ r: 7, fill: '#fff', strokeWidth: 2, stroke: '#3B82F6' }}
                          activeDot={{ r: 9, fill: '#fff', strokeWidth: 2, stroke: '#6366F1' }}
                          animationDuration={800}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Alerts */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-md p-4 shadow-sm border border-gray-200/30 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500/10 rounded-full"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-500/10 rounded-full"></div>

                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-gray-900">Recent Alerts</h2>
                    <button className="text-[9px] text-blue-600 hover:text-blue-700 font-medium">View All</button>
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
              </div>

              {/* School Info */}
              <div className="bg-white rounded-md p-4 shadow-sm border border-gray-100 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-bold text-gray-900">{schoolData.name}</h2>
                    <p className="text-[10px] text-gray-600 mt-1">{schoolData.location}</p>
                    <div className="flex flex-wrap gap-3 mt-3">
                      <div className="flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-blue-500" />
                        <span className="text-[10px] text-gray-600">{schoolData.totalStudents} Students</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4 text-green-500" />
                        <span className="text-[10px] text-gray-600">{schoolData.totalTeachers} Teachers</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-purple-500" />
                        <span className="text-[10px] text-gray-600">{schoolData.currentAttendance}% Attendance</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-[9px] text-gray-500">Principal</p>
                    <p className="font-medium text-gray-900 text-[10px]">{schoolData.principal}</p>
                    <p className="text-[9px] text-gray-500 mt-1">Contact</p>
                    <p className="font-medium text-gray-900 text-[10px]">{schoolData.contact}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Teachers Tab */}
          {activeTab === 'teachers' && (
            <div>
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-5 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden">
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute top-4 right-4 w-7 h-7 bg-white/10 rotate-45"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-white mb-1.5">Teacher Management Dashboard</h2>
                    <p className="text-[10px] text-blue-100 mb-2">Manage and organize all teaching staff members</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{schoolData.name}</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{teachers.length} Teachers</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 rounded-md p-2">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-5">
                <div>
                  <h2 className="text-sm font-bold text-blue-700">Teacher Management</h2>
                  <p className="text-[10px] text-gray-600 mt-1">Manage and organize all teaching staff members</p>
                </div>
                <button
                  onClick={() => setShowAddTeacherModal(true)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all text-[10px] shadow-sm hover:shadow-md"
                >
                  <Plus className="w-3 h-3" />
                  Add Teacher
                </button>
              </div>

              {/* Teachers Filters */}
              <div className="bg-white rounded-md p-4 shadow-sm border border-gray-100 mb-5">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Subject</label>
                    <select
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={teacherSubjectFilter}
                      onChange={(e) => setTeacherSubjectFilter(e.target.value)}
                    >
                      <option value="All Subjects">All Subjects</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="English">English</option>
                      <option value="History">History</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Classes</label>
                    <select
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={teacherClassFilter}
                      onChange={(e) => setTeacherClassFilter(e.target.value)}
                    >
                      <option value="All Classes">All Classes</option>
                      <option value="Grade 1">Grade 1</option>
                      <option value="Grade 2">Grade 2</option>
                      <option value="Grade 3">Grade 3</option>
                      <option value="Grade 4">Grade 4</option>
                      <option value="Grade 5">Grade 5</option>
                      <option value="Grade 6">Grade 6</option>
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 8">Grade 8</option>
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 10">Grade 10</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Status</label>
                    <select
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={teacherStatusFilter}
                      onChange={(e) => setTeacherStatusFilter(e.target.value)}
                    >
                      <option value="All Statuses">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      className="w-full px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-all text-[10px] font-medium"
                      onClick={applyTeacherFilters}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>

              {/* Teachers Table */}
              <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-[9px] font-semibold text-indigo-700 uppercase tracking-wider">Avatar</th>
                        <th className="px-3 py-2 text-left text-[9px] font-semibold text-indigo-700 uppercase tracking-wider">Teacher</th>
                        <th className="px-3 py-2 text-left text-[9px] font-semibold text-indigo-700 uppercase tracking-wider">Email</th>
                        <th className="px-3 py-2 text-left text-[9px] font-semibold text-indigo-700 uppercase tracking-wider">Subject</th>
                        <th className="px-3 py-2 text-left text-[9px] font-semibold text-indigo-700 uppercase tracking-wider">Classes</th>
                        <th className="px-3 py-2 text-right text-[9px] font-semibold text-indigo-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-50">
                      {getFilteredTeachers().map((teacher) => (
                        <tr key={teacher.id} className="hover:bg-indigo-50/50 transition-colors duration-150">
                          <td className="px-3 py-2">
                            {teacher.avatar ? (
                              <img
                                src={teacher.avatar}
                                alt={teacher.name}
                                className="w-7 h-7 rounded-md object-cover"
                              />
                            ) : (
                              <div className="w-7 h-7 rounded-md bg-gray-200 flex items-center justify-center">
                                <User className="w-4 h-4 text-gray-400" />
                              </div>
                            )}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-[10px] font-medium text-gray-900">{teacher.name}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-[10px] text-gray-600">{teacher.email}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-[10px] text-gray-600">{teacher.subject}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-[10px] text-gray-600">{teacher.classes.join(', ')}</td>
                          <td className="px-3 py-2 text-right">
                            <div className="flex justify-end gap-1">
                              <button
                                onClick={() => handleEditTeacher(teacher)}
                                className="p-1 rounded bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors"
                              >
                                <Edit className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleDeleteTeacher(teacher.id)}
                                className="p-1 rounded bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}


          {/* Students Tab */}
          {activeTab === 'students' && (
            <div>
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-5 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden">
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute top-4 right-4 w-7 h-7 bg-white/10 rotate-45"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-white mb-1.5">Student Management Dashboard</h2>
                    <p className="text-[10px] text-blue-100 mb-2">Manage and track all student information and records</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{schoolData.name}</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{students.length} Students</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 rounded-md p-2">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-5">
                <div>
                  <h2 className="text-sm font-bold text-blue-700">Student Management</h2>
                  <p className="text-[10px] text-gray-600 mt-1">Manage and track all student information and records</p>
                </div>
                <button
                  onClick={() => setShowAddStudentModal(true)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all text-[10px] shadow-sm hover:shadow-md"
                >
                  <Plus className="w-3 h-3" />
                  Add Student
                </button>
              </div>

              {/* Students Filters */}
              <div className="bg-white rounded-md p-4 shadow-sm border border-gray-100 mb-5">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Class</label>
                    <select
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={studentClassFilter}
                      onChange={(e) => setStudentClassFilter(e.target.value)}
                    >
                      <option value="All Classes">All Classes</option>
                      <option value="Grade 1">Grade 1</option>
                      <option value="Grade 2">Grade 2</option>
                      <option value="Grade 3">Grade 3</option>
                      <option value="Grade 4">Grade 4</option>
                      <option value="Grade 5">Grade 5</option>
                      <option value="Grade 6">Grade 6</option>
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 8">Grade 8</option>
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 10">Grade 10</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Grade</label>
                    <select
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={studentGradeFilter}
                      onChange={(e) => setStudentGradeFilter(e.target.value)}
                    >
                      <option value="All Grades">All Grades</option>
                      <option value="A+">A+</option>
                      <option value="A">A</option>
                      <option value="B+">B+</option>
                      <option value="B">B</option>
                      <option value="C+">C+</option>
                      <option value="C">C</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Attendance</label>
                    <select
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={studentAttendanceFilter}
                      onChange={(e) => setStudentAttendanceFilter(e.target.value)}
                    >
                      <option value="All">All</option>
                      <option value="Above 90%">Above 90%</option>
                      <option value="80-90%">80-90%</option>
                      <option value="Below 80%">Below 80%</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      className="w-full px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-all text-[10px] font-medium"
                      onClick={applyStudentFilters}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>

              {/* Students Table */}
              <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-[9px] font-semibold text-indigo-700 uppercase tracking-wider">Avatar</th>
                        <th className="px-3 py-2 text-left text-[9px] font-semibold text-indigo-700 uppercase tracking-wider">Student</th>
                        <th className="px-3 py-2 text-left text-[9px] font-semibold text-indigo-700 uppercase tracking-wider">Roll Number</th>
                        <th className="px-3 py-2 text-left text-[9px] font-semibold text-indigo-700 uppercase tracking-wider">Class</th>
                        <th className="px-3 py-2 text-left text-[9px] font-semibold text-indigo-700 uppercase tracking-wider">Email</th>
                        <th className="px-3 py-2 text-left text-[9px] font-semibold text-indigo-700 uppercase tracking-wider">Attendance</th>
                        <th className="px-3 py-2 text-left text-[9px] font-semibold text-indigo-700 uppercase tracking-wider">Grade</th>
                        <th className="px-3 py-2 text-left text-[9px] font-semibold text-indigo-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-50">
                      {getFilteredStudents().map((student) => (
                        <tr key={student.id} className="hover:bg-indigo-50/50 transition-colors duration-150">
                          <td className="px-3 py-2">
                            {student.avatar ? (
                              <img
                                src={student.avatar}
                                alt={student.name}
                                className="w-7 h-7 rounded-md object-cover"
                              />
                            ) : (
                              <div className="w-7 h-7 rounded-md bg-gray-200 flex items-center justify-center">
                                <User className="w-4 h-4 text-gray-400" />
                              </div>
                            )}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-[10px] font-medium text-gray-900">{student.name}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-[10px] text-gray-600">{student.roll}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-[10px] text-gray-600">{student.class}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-[10px] text-gray-600">{student.email}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-[10px] font-medium text-gray-900">{student.attendance}%</td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <span className="px-2 py-1 text-[8px] font-semibold rounded-full bg-green-100 text-green-800">
                              {student.grade}
                            </span>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <button
                              onClick={() => handleEditStudent(student)}
                              className="text-blue-600 hover:text-blue-900 text-[10px] font-medium"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Classes Tab */}
          {activeTab === 'classes' && (
            <div>
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-5 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden">
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute top-4 right-4 w-7 h-7 bg-white/10 rotate-45"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-white mb-1.5">Class Management Dashboard</h2>
                    <p className="text-[10px] text-blue-100 mb-2">Organize and manage all school classes and divisions</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{schoolData.name}</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{classes.length} Classes</span>
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

              <div className="flex justify-between items-center mb-5">
                <div>
                  <h2 className="text-sm font-bold text-blue-700">Class Management</h2>
                  <p className="text-[10px] text-gray-600 mt-1">Organize and manage all school classes and divisions</p>
                </div>
                <button
                  onClick={() => setShowAddClassModal(true)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all text-[10px] shadow-sm hover:shadow-md"
                >
                  <Plus className="w-3 h-3" />
                  Add Class
                </button>
              </div>

              {/* Classes Filters */}
              <div className="bg-white rounded-md p-4 shadow-sm border border-gray-100 mb-5">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Subject</label>
                    <select
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={classSubjectFilter}
                      onChange={(e) => setClassSubjectFilter(e.target.value)}
                    >
                      <option value="All Subjects">All Subjects</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="English">English</option>
                      <option value="History">History</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Grade</label>
                    <select
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={classGradeFilter}
                      onChange={(e) => setClassGradeFilter(e.target.value)}
                    >
                      <option value="All Grades">All Grades</option>
                      <option value="Grade 1">Grade 1</option>
                      <option value="Grade 2">Grade 2</option>
                      <option value="Grade 3">Grade 3</option>
                      <option value="Grade 4">Grade 4</option>
                      <option value="Grade 5">Grade 5</option>
                      <option value="Grade 6">Grade 6</option>
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 8">Grade 8</option>
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 10">Grade 10</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Students</label>
                    <select
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={classStudentsFilter}
                      onChange={(e) => setClassStudentsFilter(e.target.value)}
                    >
                      <option value="All">All</option>
                      <option value="0-25">0-25</option>
                      <option value="26-35">26-35</option>
                      <option value="36-50">36-50</option>
                      <option value="51-100">51-100</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      className="w-full px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-all text-[10px] font-medium"
                      onClick={applyClassFilters}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>

              {/* Enhanced Classes Table */}
              <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                      <tr>
                        <th className="px-2 py-2 text-left text-[9px] font-bold uppercase tracking-wider">Class</th>
                        <th className="px-2 py-2 text-left text-[9px] font-bold uppercase tracking-wider">Subject</th>
                        <th className="px-2 py-2 text-left text-[9px] font-bold uppercase tracking-wider">Teacher</th>
                        <th className="px-2 py-2 text-left text-[9px] font-bold uppercase tracking-wider">Students</th>
                        <th className="px-2 py-2 text-left text-[9px] font-bold uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {getFilteredClasses().map((classItem) => (
                        <tr key={classItem.id} className="hover:bg-blue-50/50 transition-all duration-200 group">
                          <td className="px-2 py-2 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                                {classItem.name.charAt(0)}
                              </div>
                              <div>
                                <div className="text-[11px] font-bold text-gray-900">{classItem.name}</div>
                                <div className="text-[9px] text-gray-500 flex items-center gap-1">
                                  <span>ID: {classItem.id}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-2 py-2 whitespace-nowrap">
                            <div className="text-[10px] font-medium text-gray-900">{classItem.subject}</div>
                          </td>
                          <td className="px-2 py-2 whitespace-nowrap">
                            <div className="text-[10px] text-gray-700">{classItem.teacher}</div>
                          </td>
                          <td className="px-2 py-2 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-600">
                                <Users className="w-2.5 h-2.5" />
                              </div>
                              <span className="text-[10px] font-semibold text-gray-900">{classItem.students}</span>
                            </div>
                          </td>
                          <td className="px-2 py-2 whitespace-nowrap">
                            <span className="inline-flex px-2 py-0.5 text-[9px] font-semibold leading-tight rounded-full bg-green-100 text-green-800 shadow-sm">
                              Active
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Notices Tab */}
          {activeTab === 'notices' && (
            <div>
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-5 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden">
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute top-4 right-4 w-7 h-7 bg-white/10 rotate-45"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-[16px] font-bold text-white mb-1.5">Notices & Announcements</h2>
                    <p className="text-[10px] text-blue-100 mb-2">Create and manage important notices for students, teachers, and parents</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                        <span className="text-[8px] text-white font-medium">{schoolData?.name || 'School'}</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
                        <span className="text-[8px] text-white font-medium">{notices?.length || 0} Notices</span>
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

              <div className="flex justify-between items-center mb-5">
                <div>
                  <h2 className="text-[13px] font-bold text-blue-700">Notice Management</h2>
                  <p className="text-[10px] text-gray-600 mt-1">Create and manage important notices for students, teachers, and parents</p>
                </div>
                <button
                  onClick={() => setShowAddNoticeModal(true)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all text-[10px] shadow-sm hover:shadow-md"
                >
                  <Plus className="w-3 h-3" />
                  Add Notice
                </button>
              </div>

              {/* Notices List */}
              <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                      <tr>
                        <th className="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wider">Notice</th>
                        <th className="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wider">Audience</th>
                        <th className="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wider">Priority</th>
                        <th className="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {notices && notices.map((notice) => (
                        <tr key={notice.id || Math.random()} className="hover:bg-blue-50/50 transition-all duration-200 group">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div>
                              <div className="text-[11px] font-bold text-gray-900">{notice.title}</div>
                              <div className="text-[9px] text-gray-600 mt-1 max-w-md truncate">{notice.content}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-[10px] text-gray-700">{notice.audience}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`inline-flex px-2.5 py-1 text-[9px] font-semibold leading-tight rounded-full shadow-sm ${notice.priority === 'High' ? 'bg-red-100 text-red-800' :
                              notice.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                              {notice.priority}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-[10px] text-gray-700">{notice.date}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                    <p className="text-[10px] text-blue-100 mb-2">Comprehensive analytics and reporting for school performance</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{schoolData.name}</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">Performance Insights</span>
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

              <div className="flex justify-between items-center mb-5">
                <div>
                  <h2 className="text-sm font-bold text-blue-700">Reports & Analytics</h2>
                  <p className="text-[10px] text-gray-600 mt-1">Comprehensive analytics and reporting for school performance</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowReportFilterModal(true)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-all text-[10px] font-medium"
                  >
                    <Filter className="w-3 h-3" />
                    Filter
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {/* Attendance Analytics */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-5 shadow-lg border border-blue-300/30 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/10 rounded-full"></div>

                  <h3 className="text-base font-bold text-white mb-5">Attendance Analytics</h3>
                  <div className="h-48 bg-white/20 rounded-lg p-4 backdrop-blur-sm border border-white/30">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={classes}>
                        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(255,255,255,0.4)" />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: 'rgba(255,255,255,0.9)', fontSize: 9, fontWeight: 500 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: 'rgba(255,255,255,0.9)', fontSize: 9, fontWeight: 500 }}
                        />
                        <Tooltip
                          formatter={(value) => [`${value}`, 'Students']}
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
                        />
                        <Legend
                          wrapperStyle={{ paddingTop: '10px' }}
                          formatter={(value) => <span className="text-white font-medium">{value}</span>}
                        />
                        <Bar
                          dataKey="students"
                          name="Students"
                          fill="rgba(255,255,255,0.95)"
                          radius={[6, 6, 0, 0]}
                          barSize={30}
                          animationDuration={800}
                        >
                          {classes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill="#3B82F6" />
                          ))}
                        </Bar>
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Performance Analytics */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-5 shadow-lg border border-blue-400/30 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/10 rounded-full"></div>

                  <h3 className="text-base font-bold text-white mb-5">Performance Analytics</h3>
                  <div className="h-48 bg-white/20 rounded-lg p-4 backdrop-blur-sm border border-white/30">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(255,255,255,0.4)" />
                        <XAxis
                          dataKey="subject"
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
                          formatter={(value) => [`${value}%`, 'Score']}
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
                        />
                        <Legend
                          wrapperStyle={{ paddingTop: '10px' }}
                          formatter={(value) => <span className="text-white font-medium">{value}</span>}
                        />
                        <Line
                          type="monotone"
                          dataKey="averageScore"
                          name="Average Score"
                          stroke="#3B82F6"
                          strokeWidth={3}
                          dot={{ r: 6, fill: '#3B82F6', strokeWidth: 2, stroke: '#3B82F6' }}
                          activeDot={{ r: 8, fill: '#3B82F6', strokeWidth: 2, stroke: '#6366F1' }}
                          animationDuration={800}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
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
                    <p className="text-[10px] text-blue-100 mb-2">Monitor and manage all system alerts and notifications</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{schoolData.name}</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{alerts.length} Active Alerts</span>
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

              <div className="flex justify-between items-center mb-5">
                <div>
                  <h2 className="text-sm font-bold text-blue-700">Alert Management</h2>
                  <p className="text-[10px] text-gray-600 mt-1">Monitor and manage all system alerts and notifications</p>
                </div>
                <div className="flex gap-2">
                  <select className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Statuses</option>
                    <option>New</option>
                    <option>Acknowledged</option>
                    <option>Resolved</option>
                  </select>
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-all text-[10px] font-medium">
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
                <div className="divide-y divide-gray-50">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="p-4 hover:bg-indigo-50/50 transition-colors duration-150">
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
                          <div className="flex gap-1.5">
                            <button className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-[9px] font-medium hover:bg-blue-200 transition-colors">
                              Acknowledge
                            </button>
                            <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-[9px] font-medium hover:bg-gray-200 transition-colors">
                              Snooze
                            </button>
                            <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-[9px] font-medium hover:bg-gray-200 transition-colors">
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

          {/* Chatbot Tab */}
          {activeTab === 'chatbot' && (
            <div>
              <RoleChatbot role="admin" />
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
                    <p className="text-[10px] text-blue-100 mb-2">Configure and customize your system preferences</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{schoolData.name}</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">Account Management</span>
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
                  <h2 className="text-sm font-bold text-blue-700">System Settings</h2>
                  <p className="text-gray-600 text-[10px] mt-1">Manage your account preferences and system settings</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Settings Navigation */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-md shadow-sm border border-gray-100 p-1 sticky top-4">
                    {[
                      { id: 'profile', icon: User, label: 'Profile' },
                      { id: 'notifications', icon: Bell, label: 'Notifications' },
                      { id: 'security', icon: Shield, label: 'Security' },
                      { id: 'appearance', icon: Settings, label: 'Appearance' },
                    ].map((tab) => {
                      const IconComponent = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left transition-all text-[11px] ${activeSettingsTab === tab.id
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          onClick={() => setActiveSettingsTab(tab.id)}
                        >
                          <IconComponent className="w-3.5 h-3.5" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Settings Content */}
                <div className="lg:col-span-3">
                  {/* Profile Settings */}
                  {activeSettingsTab === 'profile' && (
                    <div className="bg-white rounded-md shadow-sm border border-gray-100 p-3">
                      <div className="mb-3">
                        <h2 className="text-sm font-bold text-blue-700 mb-1">Profile Information</h2>
                        <p className="text-gray-600 text-[10px]">Update your personal and professional details</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-3">
                        <div className="flex flex-col items-center md:col-span-2">
                          <div className="relative mb-2">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-base">
                              AD
                            </div>
                            <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition-colors shadow-sm">
                              <Edit className="w-2.5 h-2.5" />
                            </button>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 font-medium text-[10px]">
                            Change Picture
                          </button>
                        </div>

                        <div>
                          <label className="block text-[9px] font-medium text-gray-700 mb-1">Full Name</label>
                          <input
                            type="text"
                            defaultValue="Admin User"
                            className="w-full px-2.5 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[10px]"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-medium text-gray-700 mb-1">Email Address</label>
                          <input
                            type="email"
                            defaultValue="admin@school.edu"
                            className="w-full px-2.5 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[10px]"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-medium text-gray-700 mb-1">School</label>
                          <input
                            type="text"
                            defaultValue={schoolData.name}
                            className="w-full px-2.5 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[10px]"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-medium text-gray-700 mb-1">Position</label>
                          <input
                            type="text"
                            defaultValue="School Administrator"
                            className="w-full px-2.5 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[10px]"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md font-medium text-[10px]">
                          Save
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Notifications Settings */}
                  {activeSettingsTab === 'notifications' && (
                    <div className="bg-white rounded-md shadow-sm border border-gray-100 p-3">
                      <div className="mb-3">
                        <h2 className="text-sm font-bold text-blue-700 mb-1">Notification Preferences</h2>
                        <p className="text-gray-600 text-[10px]">Manage how and when you receive notifications</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                          <div>
                            <h3 className="text-[10px] font-medium text-gray-900">Email Notifications</h3>
                            <p className="text-[9px] text-gray-600">Receive notifications via email</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                          <div>
                            <h3 className="text-[10px] font-medium text-gray-900">Push Notifications</h3>
                            <p className="text-[9px] text-gray-600">Receive push notifications on your device</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                          <div>
                            <h3 className="text-[10px] font-medium text-gray-900">SMS Notifications</h3>
                            <p className="text-[9px] text-gray-600">Receive SMS notifications for critical alerts</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                          <div>
                            <h3 className="text-[10px] font-medium text-gray-900">Daily Summary</h3>
                            <p className="text-[9px] text-gray-600">Receive a daily summary of activities</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end mt-4">
                        <button className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md font-medium text-[10px]">
                          Save Preferences
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Security Settings */}
                  {activeSettingsTab === 'security' && (
                    <div className="bg-white rounded-md shadow-sm border border-gray-100 p-3">
                      <div className="mb-3">
                        <h2 className="text-sm font-bold text-blue-700 mb-1">Security Settings</h2>
                        <p className="text-gray-600 text-[10px]">Manage your account security and authentication</p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h3 className="text-[10px] font-medium text-gray-900 mb-2">Change Password</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[9px] font-medium text-gray-700 mb-1">Current Password</label>
                              <input
                                type="password"
                                placeholder="Enter current password"
                                className="w-full px-2.5 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[10px]"
                              />
                            </div>

                            <div>
                              <label className="block text-[9px] font-medium text-gray-700 mb-1">New Password</label>
                              <input
                                type="password"
                                placeholder="Enter new password"
                                className="w-full px-2.5 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[10px]"
                              />
                            </div>

                            <div>
                              <label className="block text-[9px] font-medium text-gray-700 mb-1">Confirm New Password</label>
                              <input
                                type="password"
                                placeholder="Confirm new password"
                                className="w-full px-2.5 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[10px]"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-[10px] font-medium text-gray-900 mb-2">Two-Factor Authentication</h3>
                          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                            <div>
                              <h4 className="text-[10px] font-medium text-gray-900">Enable 2FA</h4>
                              <p className="text-[9px] text-gray-600">Add an extra layer of security to your account</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                            </label>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-[10px] font-medium text-gray-900 mb-2">Active Sessions</h3>
                          <div className="bg-gray-50 rounded-md p-2">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="text-[10px] font-medium text-gray-900">Current Session</p>
                                <p className="text-[9px] text-gray-600">Chrome on Windows • Mumbai, India</p>
                              </div>
                              <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-[9px] font-medium">Active</span>
                            </div>
                            <button className="text-[9px] text-red-600 hover:text-red-700 font-medium">
                              Log out of all other sessions
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end mt-4">
                        <button className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md font-medium text-[10px]">
                          Update Security
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Appearance Settings */}
                  {activeSettingsTab === 'appearance' && (
                    <div className="bg-white rounded-md shadow-sm border border-gray-100 p-3">
                      <div className="mb-3">
                        <h2 className="text-sm font-bold text-blue-700 mb-1">Appearance Settings</h2>
                        <p className="text-gray-600 text-[10px]">Customize the look and feel of your dashboard</p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h3 className="text-[10px] font-medium text-gray-900 mb-2">Theme</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            <button className="p-2 border border-blue-500 rounded-md bg-blue-50">
                              <div className="w-full h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded mb-1"></div>
                              <p className="text-[9px] font-medium text-gray-900">Default</p>
                            </button>
                            <button className="p-2 border border-gray-200 rounded-md hover:border-gray-300">
                              <div className="w-full h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded mb-1"></div>
                              <p className="text-[9px] font-medium text-gray-900">Nature</p>
                            </button>
                            <button className="p-2 border border-gray-200 rounded-md hover:border-gray-300">
                              <div className="w-full h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded mb-1"></div>
                              <p className="text-[9px] font-medium text-gray-900">Sunset</p>
                            </button>
                            <button className="p-2 border border-gray-200 rounded-md hover:border-gray-300">
                              <div className="w-full h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded mb-1"></div>
                              <p className="text-[9px] font-medium text-gray-900">Violet</p>
                            </button>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-[10px] font-medium text-gray-900 mb-2">Layout Preferences</h3>
                          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                            <div>
                              <h4 className="text-[10px] font-medium text-gray-900">Compact Mode</h4>
                              <p className="text-[9px] text-gray-600">Reduce spacing and make UI more compact</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md mt-2">
                            <div>
                              <h4 className="text-[10px] font-medium text-gray-900">Dark Mode</h4>
                              <p className="text-[9px] text-gray-600">Switch to dark theme for reduced eye strain</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                            </label>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-[10px] font-medium text-gray-900 mb-2">Language</h3>
                          <select className="w-full px-2.5 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[10px]">
                            <option>English</option>
                            <option>Hindi</option>
                            <option>Marathi</option>
                            <option>Gujarati</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end mt-4">
                        <button className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md font-medium text-[10px]">
                          Save Appearance
                        </button>
                      </div>
                    </div>
                  )}
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
                    <p className="text-[10px] text-blue-100 mb-2">Monitor and manage the mid day meal program for your school</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{schoolData.name}</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{schoolData.totalMeals.toLocaleString()} meals served</span>
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
                        <span className="font-bold text-gray-900 text-[10px] bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{selectedSchoolData.reduce((total, school) => total + Math.round(school.presentToday * schoolData.mealsPerStudent), 0).toLocaleString()}</span>
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
                              {Math.round(school.presentToday * schoolData.mealsPerStudent).toLocaleString()}
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
                        {weeklyMealData.map((week, index) => {
                          // Calculate trend compared to previous week
                          let trend = 0;
                          let trendType = 'neutral';
                          if (index > 0) {
                            const prevWeek = weeklyMealData[index - 1];
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
                        {monthlyMealData.map((month, index) => {
                          // Calculate trend compared to previous month
                          let trend = 0;
                          let trendType = 'neutral';
                          if (index > 0) {
                            const prevMonth = monthlyMealData[index - 1];
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
        </div>
      </div>

      {/* Add Teacher Modal */}
      {
        showAddTeacherModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
            <div className="bg-white rounded-md w-full max-w-md max-h-80 overflow-y-auto">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900">Add New Teacher</h3>
                  <button
                    onClick={closeAddTeacherModal}
                    className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex flex-col items-center mb-4">
                  <div className="relative mb-3">
                    {teacherAvatarPreview ? (
                      <img
                        src={teacherAvatarPreview}
                        alt="Teacher preview"
                        className="w-20 h-20 rounded-md object-cover border-2 border-blue-100"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-md bg-gray-200 flex items-center justify-center border-2 border-blue-100">
                        <User className="w-10 h-10 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 flex gap-1">
                      <label className="bg-blue-500 rounded-md p-1.5 cursor-pointer hover:bg-blue-600 transition-colors">
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleTeacherAvatarChange}
                        />
                        <Edit className="w-3 h-3 text-white" />
                      </label>
                      <button
                        className="bg-green-500 rounded-md p-1.5 cursor-pointer hover:bg-green-600 transition-colors"
                        onClick={() => openAvatarOptions('teacher')}
                      >
                        <User className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500">Upload or choose avatar</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newTeacherData.name}
                      onChange={handleNewTeacherChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter teacher's name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={newTeacherData.email}
                      onChange={handleNewTeacherChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter teacher's email"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={newTeacherData.password}
                      onChange={handleNewTeacherChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter password"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={newTeacherData.subject}
                      onChange={handleNewTeacherChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter subject name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Class</label>
                    <input
                      type="text"
                      name="classes"
                      value={newTeacherData.classes}
                      onChange={handleNewTeacherChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter class name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Number of Students</label>
                    <input
                      type="number"
                      name="students"
                      value={newTeacherData.students}
                      onChange={handleNewTeacherChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter number of students"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={closeAddTeacherModal}
                    className="flex-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all text-[10px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTeacher}
                    className="flex-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all text-[10px] shadow-sm hover:shadow-md"
                  >
                    Add Teacher
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {/* Edit Teacher Modal */}
      {showEditTeacherModal && editingTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
          <div className="bg-white rounded-md w-full max-w-md max-h-80 overflow-y-auto">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900">Edit Teacher</h3>
                <button
                  onClick={closeEditTeacherModal}
                  className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editingTeacher.name}
                    onChange={handleEditTeacherChange}
                    className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editingTeacher.email}
                    onChange={handleEditTeacherChange}
                    className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Password (Leave blank to keep current)</label>
                  <input
                    type="password"
                    name="password"
                    value={editingTeacher.password || ''}
                    onChange={handleEditTeacherChange}
                    className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={editingTeacher.subject}
                    onChange={handleEditTeacherChange}
                    className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2">
                <button
                  onClick={closeEditTeacherModal}
                  className="px-3 py-1.5 border border-gray-200 text-gray-600 rounded-md text-[10px] hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateTeacher}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-[10px] hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Update Teacher
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {
        showAddStudentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
            <div className="bg-white rounded-md w-full max-w-md max-h-80 overflow-y-auto">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900">Add New Student</h3>
                  <button
                    onClick={closeAddStudentModal}
                    className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex flex-col items-center mb-4">
                  <div className="relative mb-3">
                    {studentAvatarPreview ? (
                      <img
                        src={studentAvatarPreview}
                        alt="Student preview"
                        className="w-20 h-20 rounded-md object-cover border-2 border-blue-100"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-md bg-gray-200 flex items-center justify-center border-2 border-blue-100">
                        <User className="w-10 h-10 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 flex gap-1">
                      <label className="bg-blue-500 rounded-md p-1.5 cursor-pointer hover:bg-blue-600 transition-colors">
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleStudentAvatarChange}
                        />
                        <Edit className="w-3 h-3 text-white" />
                      </label>
                      <button
                        className="bg-green-500 rounded-md p-1.5 cursor-pointer hover:bg-green-600 transition-colors"
                        onClick={() => openAvatarOptions('student')}
                      >
                        <User className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500">Upload or choose avatar</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newStudentData.name}
                      onChange={handleNewStudentChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter student's name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Roll Number</label>
                    <input
                      type="text"
                      name="roll"
                      value={newStudentData.roll}
                      onChange={handleNewStudentChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter roll number"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Class</label>
                    <input
                      type="text"
                      name="class"
                      value={newStudentData.class}
                      onChange={handleNewStudentChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter class name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Attendance (%)</label>
                    <input
                      type="number"
                      name="attendance"
                      value={newStudentData.attendance}
                      onChange={handleNewStudentChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter attendance percentage"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Grade</label>
                    <input
                      type="text"
                      name="grade"
                      value={newStudentData.grade}
                      onChange={handleNewStudentChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter grade"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={newStudentData.password}
                      onChange={handleNewStudentChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter password"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">RFID UID</label>
                    <input
                      type="text"
                      name="RFID_uid"
                      value={newStudentData.RFID_uid}
                      onChange={handleNewStudentChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter RFID UID"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Face Encoding ID</label>
                    <input
                      type="text"
                      name="face_encoding_id"
                      value={newStudentData.face_encoding_id}
                      onChange={handleNewStudentChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Face Encoding ID"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Parent Contact</label>
                    <input
                      type="text"
                      name="parent_contact"
                      value={newStudentData.parent_contact}
                      onChange={handleNewStudentChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter parent contact number"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={newStudentData.email}
                      onChange={handleNewStudentChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={closeAddStudentModal}
                    className="flex-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all text-[10px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddStudent}
                    className="flex-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all text-[10px] shadow-sm hover:shadow-md"
                  >
                    Add Student
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {/* Edit Student Modal */}
      {
        showEditStudentModal && editingStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
            <div className="bg-white rounded-md w-full max-w-md max-h-80 overflow-y-auto">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900">Edit Student</h3>
                  <button
                    onClick={closeEditStudentModal}
                    className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editingStudent.name || ''}
                      onChange={handleEditStudentChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter student's name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Roll Number</label>
                    <input
                      type="text"
                      name="roll"
                      value={editingStudent.roll || ''}
                      onChange={handleEditStudentChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter roll number"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Class</label>
                    <input
                      type="text"
                      name="class"
                      value={editingStudent.class || ''}
                      onChange={handleEditStudentChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter class name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Attendance (%)</label>
                    <input
                      type="number"
                      name="attendance"
                      value={editingStudent.attendance || 0}
                      onChange={handleEditStudentChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter attendance percentage"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Grade</label>
                    <input
                      type="text"
                      name="grade"
                      value={editingStudent.grade || ''}
                      onChange={handleEditStudentChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter grade"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">New Password</label>
                    <input
                      type="password"
                      name="password"
                      value={editingStudent.password || ''}
                      onChange={handleEditStudentChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter new password (leave blank to keep current)"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">RFID UID</label>
                    <input
                      type="text"
                      name="RFID_uid"
                      value={editingStudent.RFID_uid || ''}
                      onChange={handleEditStudentChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter RFID UID"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Face Encoding ID</label>
                    <input
                      type="text"
                      name="face_encoding_id"
                      value={editingStudent.face_encoding_id || ''}
                      onChange={handleEditStudentChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Face Encoding ID"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Parent Contact</label>
                    <input
                      type="text"
                      name="parent_contact"
                      value={editingStudent.parent_contact || ''}
                      onChange={handleEditStudentChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter parent contact number"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editingStudent.email || ''}
                      onChange={handleEditStudentChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={closeEditStudentModal}
                    className="flex-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all text-[10px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateStudent}
                    className="flex-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all text-[10px] shadow-sm hover:shadow-md"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {/* Add Class Modal */}
      {
        showAddClassModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
            <div className="bg-white rounded-md w-full max-w-md max-h-80 overflow-y-auto">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900">Add New Class</h3>
                  <button
                    onClick={closeAddClassModal}
                    className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Class Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newClassData.name}
                      onChange={handleNewClassChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter class name (e.g., Grade 10-A)"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={newClassData.subject}
                      onChange={handleNewClassChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter subject name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Teacher</label>
                    <input
                      type="text"
                      name="teacher"
                      value={newClassData.teacher}
                      onChange={handleNewClassChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter teacher name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Number of Students</label>
                    <input
                      type="number"
                      name="students"
                      value={newClassData.students}
                      onChange={handleNewClassChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter number of students"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={closeAddClassModal}
                    className="flex-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all text-[10px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddClass}
                    className="flex-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all text-[10px] shadow-sm hover:shadow-md"
                  >
                    Add Class
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {/* Report Filter Modal */}
      {
        showReportFilterModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
            <div className="bg-white rounded-md w-full max-w-md max-h-80 overflow-y-auto">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900">Filter Reports</h3>
                  <button
                    onClick={closeReportFilterModal}
                    className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Class</label>
                    <select
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={reportClassFilter}
                      onChange={(e) => setReportClassFilter(e.target.value)}
                    >
                      <option value="All Classes">All Classes</option>
                      <option value="Grade 1">Grade 1</option>
                      <option value="Grade 2">Grade 2</option>
                      <option value="Grade 3">Grade 3</option>
                      <option value="Grade 4">Grade 4</option>
                      <option value="Grade 5">Grade 5</option>
                      <option value="Grade 6">Grade 6</option>
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 8">Grade 8</option>
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 10">Grade 10</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Subject</label>
                    <select
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={reportSubjectFilter}
                      onChange={(e) => setReportSubjectFilter(e.target.value)}
                    >
                      <option value="All Subjects">All Subjects</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="English">English</option>
                      <option value="History">History</option>
                      <option value="Computer Science">Computer Science</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Period</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setReportPeriod('weekly')}
                        className={`px-2.5 py-1.5 text-[10px] rounded-md font-medium ${reportPeriod === 'weekly' ? 'bg-blue-500 text-white shadow-sm' : 'bg-gray-100 text-gray-700'}`}
                      >
                        Weekly
                      </button>
                      <button
                        onClick={() => setReportPeriod('monthly')}
                        className={`px-2.5 py-1.5 text-[10px] rounded-md font-medium ${reportPeriod === 'monthly' ? 'bg-blue-500 text-white shadow-sm' : 'bg-gray-100 text-gray-700'}`}
                      >
                        Monthly
                      </button>
                      <button
                        onClick={() => setReportPeriod('yearly')}
                        className={`px-2.5 py-1.5 text-[10px] rounded-md font-medium ${reportPeriod === 'yearly' ? 'bg-blue-500 text-white shadow-sm' : 'bg-gray-100 text-gray-700'}`}
                      >
                        Yearly
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button
                    onClick={closeReportFilterModal}
                    className="flex-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all text-[10px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={applyReportFilters}
                    className="flex-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all text-[10px] shadow-sm hover:shadow-md"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {/* Avatar Options Modal */}
      {
        showAvatarOptions && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
            <div className="bg-white rounded-md w-full max-w-md max-h-80 overflow-y-auto">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900">Choose Avatar</h3>
                  <button
                    onClick={closeAvatarOptions}
                    className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-4 gap-3">
                  {predefinedAvatars.map((avatar, index) => (
                    <button
                      key={index}
                      onClick={() => handlePredefinedAvatarSelect(avatar)}
                      className="p-1.5 rounded-md border border-gray-200 hover:border-blue-500 transition-all"
                    >
                      <img
                        src={avatar}
                        alt={`Avatar ${index + 1}`}
                        className="w-14 h-14 rounded-md object-cover"
                      />
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={closeAvatarOptions}
                    className="flex-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all text-[10px]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {/* Add Notice Modal */}
      {
        showAddNoticeModal && newNotice && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
            <div className="bg-white rounded-md w-full max-w-md max-h-80 overflow-y-auto">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-bold text-gray-900">Add New Notice</h3>
                  <button
                    onClick={closeAddNoticeModal}
                    className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-[8px] font-medium text-gray-700 mb-1.5">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={newNotice.title}
                      onChange={handleNewNoticeChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter notice title"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-medium text-gray-700 mb-1.5">Content</label>
                    <textarea
                      name="content"
                      value={newNotice.content}
                      onChange={handleNewNoticeChange}
                      rows="3"
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter notice content"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-[8px] font-medium text-gray-700 mb-1.5">Audience</label>
                    <select
                      name="audience"
                      value={newNotice.audience}
                      onChange={handleNewNoticeChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="All">All</option>
                      <option value="Students">Students</option>
                      <option value="Teachers">Teachers</option>
                      <option value="Parents">Parents</option>
                      <option value="Grade 9, Grade 10">Grade 9, Grade 10</option>
                      <option value="Grade 1-5">Grade 1-5</option>
                      <option value="Grade 6-8">Grade 6-8</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[8px] font-medium text-gray-700 mb-1.5">Priority</label>
                    <select
                      name="priority"
                      value={newNotice.priority}
                      onChange={handleNewNoticeChange}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={closeAddNoticeModal}
                    className="flex-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all text-[8px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddNotice}
                    className="flex-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all text-[8px] shadow-sm hover:shadow-md"
                  >
                    Add Notice
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default AdminDashboard;

