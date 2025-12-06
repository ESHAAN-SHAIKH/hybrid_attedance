import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Users, UserCheck, UserX, User, Clock, Calendar, Search, Filter,
  Download, Plus, MoreVertical, ChevronDown, ChevronRight,
  BarChart2, PieChart, TrendingUp, Mail, Phone, MapPin,
  BookOpen, Award, AlertCircle, CheckCircle, XCircle,
  Edit, Trash2, Save, X, FileText, Upload, Image, File,
  LogOut, Settings, Bell, Menu, Home, ClipboardList,
  MessageSquare, Bot, BarChart, RefreshCw
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart as RePieChart, Pie, Cell,
  BarChart as ReBarChart, Bar
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import RoleChatbot from '../chatbot/RoleChatbot';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

// Particle Background Component
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-500/10 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
          }}
        />
      ))}
    </div>
  );
};

// Ultra Modern Header Component
const UltraModernHeader = ({ dashboardTitle, userType, userName, userRole, onLogout, onAlertsClick }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20 px-6 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg shadow-md shadow-blue-500/20">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {dashboardTitle}
          </h1>
          <p className="text-[10px] text-gray-500 font-medium tracking-wide uppercase">
            {userType} Portal
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-gray-600">System Online</span>
        </div>

        <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>

        <button
          onClick={onAlertsClick}
          className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-all hover:text-blue-600"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500">{userRole}</p>
          </div>
          <button
            onClick={onLogout}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced Classroom Card Component
const EnhancedClassroomCard = ({ title, subtitle, teacher, theme, onClick, onMenuClick }) => {
  const getThemeColors = (theme) => {
    const themes = {
      blue: 'from-blue-500 to-indigo-600',
      green: 'from-emerald-500 to-teal-600',
      purple: 'from-violet-500 to-purple-600',
      orange: 'from-orange-500 to-red-600',
      pink: 'from-pink-500 to-rose-600',
      cyan: 'from-cyan-500 to-blue-600',
    };
    return themes[theme] || themes.blue;
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer transition-all duration-300"
      onClick={onClick}
    >
      <div className={`h-24 bg-gradient-to-r ${getThemeColors(theme)} p-4 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-black/5 rounded-full -ml-6 -mb-6 blur-lg"></div>

        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h3 className="text-white font-bold text-lg tracking-tight">{title}</h3>
            <p className="text-white/90 text-xs font-medium mt-0.5">{subtitle}</p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onMenuClick(); }}
            className="text-white/80 hover:text-white hover:bg-white/20 p-1.5 rounded-full transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mb-1">Class Teacher</p>
            <p className="text-sm font-semibold text-gray-800">{teacher}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  console.log('TeacherDashboard: Component Rendering');

  useEffect(() => {
    console.log('TeacherDashboard: Component Mounted');
  }, []);

  const handleLogout = () => {
    if (logout) logout();
    navigate('/login');
  };

  const [activeTab, setActiveTab] = useState('home');
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [showAddClassForm, setShowAddClassForm] = useState(false);
  const [showAddAssignmentForm, setShowAddAssignmentForm] = useState(false);
  const [showAssignmentFilter, setShowAssignmentFilter] = useState(false);
  const [showReportsFilter, setShowReportsFilter] = useState(false);
  const [showClassDetailsModal, setShowClassDetailsModal] = useState(false);
  const [selectedClassDetails, setSelectedClassDetails] = useState(null);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showStudentAttendanceModal, setShowStudentAttendanceModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [teacherAvatar, setTeacherAvatar] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=James');

  // State for file uploads
  const [fileUploads, setFileUploads] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // State for class notes
  const [classNotes, setClassNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    class: ""
  });

  // State for notices
  const [notices, setNotices] = useState([
    { id: 1, title: "Science Fair Registration", content: "Registration for the annual science fair closes this Friday.", date: "2024-04-15", time: "10:00 AM", priority: "Important", audience: "All Classes" },
    { id: 2, title: "Parent-Teacher Meeting", content: "Scheduled for next Saturday. Please prepare student reports.", date: "2024-04-18", time: "02:00 PM", priority: "Urgent", audience: "Staff Only" },
    { id: 3, title: "Holiday Announcement", content: "School will remain closed on Monday due to public holiday.", date: "2024-04-20", time: "09:00 AM", priority: "Normal", audience: "Parents" }
  ]);

  const [newNotice, setNewNotice] = useState({
    title: "",
    content: "",
    audience: "All Classes",
    priority: "Normal"
  });

  const [noticeAttachments, setNoticeAttachments] = useState([]);

  // State for assignments
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Algebra Problem Set",
      subject: "Mathematics",
      class: "Class 10-A",
      dueDate: "2024-04-25",
      description: "Complete exercises 5.1 to 5.3 from the textbook.",
      students: [
        { id: 1, name: "Alex Johnson", submitted: true, grade: "A" },
        { id: 2, name: "Sam Smith", submitted: false, grade: "-" },
        { id: 3, name: "Jordan Lee", submitted: true, grade: "B+" }
      ]
    },
    {
      id: 2,
      title: "Physics Lab Report",
      subject: "Physics",
      class: "Class 11-B",
      dueDate: "2024-04-28",
      description: "Submit the lab report for the pendulum experiment.",
      students: [
        { id: 4, name: "Casey Brown", submitted: true, grade: "A-" },
        { id: 5, name: "Jamie Wilson", submitted: true, grade: "A" }
      ]
    }
  ]);

  const [newAssignment, setNewAssignment] = useState({
    title: "",
    subject: "",
    class: "",
    dueDate: "",
    description: ""
  });

  const [assignmentFilter, setAssignmentFilter] = useState({
    class: "",
    subject: "",
    status: "all"
  });

  const [reportsFilter, setReportsFilter] = useState({
    class: "",
    dateRange: "last7days"
  });

  // State for alerts
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'critical', message: 'High absenteeism detected in Class 10-A', time: '2 hours ago', status: 'new' },
    { id: 2, type: 'warning', message: 'Late arrival trend increasing in Class 11-B', time: '1 day ago', status: 'new' },
    { id: 3, type: 'info', message: 'System maintenance scheduled for tonight', time: '3 days ago', status: 'read' }
  ]);

  // State for settings
  const [settingsTab, setSettingsTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    subject: '',
    school: ''
  });

  // Mock Data
  const [teacherData, setTeacherData] = useState({
    name: "Dr. James Wilson",
    subject: "Mathematics",
    classes: [
      { name: "Class 10-A", subject: "Mathematics", students: 35, color: "blue" },
      { name: "Class 11-B", subject: "Advanced Math", students: 28, color: "purple" },
      { name: "Class 9-C", subject: "Basic Math", students: 32, color: "green" },
      { name: "Class 12-A", subject: "Calculus", students: 25, color: "orange" },
      { name: "Class 10-B", subject: "Mathematics", students: 34, color: "cyan" },
      { name: "Class 8-A", subject: "Arithmetic", students: 30, color: "pink" }
    ],
    school: "Greenwood High School"
  });

  const [studentAttendanceData, setStudentAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch students and attendance data
    const fetchData = async () => {
      try {
        const studentsRes = await api.get('/students');
        const attendanceRes = await api.get('/reports/daily'); // Assuming this endpoint gives daily summary or similar

        // Transform student data to match UI needs
        const students = studentsRes.data.map(s => ({
          id: s._id,
          name: s.name,
          roll: s.rollNumber,
          class: s.class,
          status: { present: false, absent: false, late: false }, // Default status
          method: 'Manual', // Default method
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${s.name}`
        }));

        // If we have attendance data, update status
        // This part depends on the exact structure of attendanceRes.data
        // For now, we'll just use the students list
        setStudentAttendanceData(students);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "",
    roll: "",
    method: "Manual"
  });

  const [newClass, setNewClass] = useState({
    name: "",
    subject: "",
    color: "blue"
  });

  // Helper Functions
  const getStudentAvatar = (name) => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;
  };

  const handleEditClick = (student) => {
    // Implementation for edit click
    console.log("Edit clicked for", student.name);
  };

  const cancelEdit = () => {
    // Implementation for cancel edit
    console.log("Cancel edit");
  };

  const handleSaveEdit = () => {
    // Implementation for save edit
    console.log("Save edit");
  };

  const handleNewStudentChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const addNewStudent = async () => {
    if (newStudent.name && newStudent.class && newStudent.roll) {
      try {
        const res = await api.post('/students', {
          name: newStudent.name,
          rollNumber: newStudent.roll,
          class: newStudent.class,
          // other fields as needed
        });

        const addedStudent = {
          id: res.data._id,
          name: res.data.name,
          roll: res.data.rollNumber,
          class: res.data.class,
          status: { present: false, absent: false, late: false },
          method: newStudent.method,
          avatar: getStudentAvatar(res.data.name)
        };

        setStudentAttendanceData([...studentAttendanceData, addedStudent]);
        setNewStudent({ name: "", class: "", roll: "", method: "Manual" });
        setShowAddStudentForm(false);
      } catch (error) {
        console.error("Error adding student:", error);
        alert("Failed to add student");
      }
    }
  };

  const updateStudentMethod = (id, method) => {
    setStudentAttendanceData(studentAttendanceData.map(student =>
      student.id === id ? { ...student, method } : student
    ));
  };

  const handleNewClassChange = (e) => {
    const { name, value } = e.target;
    setNewClass({ ...newClass, [name]: value });
  };

  const addNewClass = () => {
    if (newClass.name && newClass.subject) {
      const classObj = {
        name: newClass.name,
        subject: newClass.subject,
        students: 0,
        color: newClass.color
      };
      setTeacherData({
        ...teacherData,
        classes: [...teacherData.classes, classObj]
      });
      setNewClass({ name: "", subject: "", color: "blue" });
      setShowAddClassForm(false);
    }
  };

  const closeAddStudentForm = () => {
    setShowAddStudentForm(false);
    setNewStudent({ name: "", class: "", roll: "", method: "Manual" });
  };

  const editStudentStatus = (id, status) => {
    setStudentAttendanceData(studentAttendanceData.map(student => {
      if (student.id === id) {
        const newStatus = { present: false, absent: false, late: false };
        newStatus[status] = true;
        return { ...student, status: newStatus };
      }
      return student;
    }));
  };

  const addNewAssignment = () => {
    if (newAssignment.title && newAssignment.subject && newAssignment.class && newAssignment.dueDate) {
      const assignmentObj = {
        id: assignments.length + 1,
        ...newAssignment,
        students: [] // Initialize with empty students list or populate based on class
      };
      setAssignments([...assignments, assignmentObj]);
      setNewAssignment({ title: "", subject: "", class: "", dueDate: "", description: "" });
      setShowAddAssignmentForm(false);
    }
  };

  // Function to update student submission status
  const updateStudentSubmission = (assignmentId, studentId, submitted) => {
    setAssignments(assignments.map(assignment => {
      if (assignment.id === assignmentId) {
        const updatedStudents = assignment.students.map(student => {
          if (student.id === studentId) {
            return { ...student, submitted };
          }
          return student;
        });
        return { ...assignment, students: updatedStudents };
      }
      return assignment;
    }));
  };

  // Function to update student grade
  const updateStudentGrade = (assignmentId, studentId, grade) => {
    setAssignments(assignments.map(assignment => {
      if (assignment.id === assignmentId) {
        const updatedStudents = assignment.students.map(student => {
          if (student.id === studentId) {
            return { ...student, grade };
          }
          return student;
        });
        return { ...assignment, students: updatedStudents };
      }
      return assignment;
    }));
  };

  // Function to handle new assignment form input changes
  const handleNewAssignmentChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({ ...newAssignment, [name]: value });
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
        priority: "Normal"
      };
      setNotices([...notices, noticeObj]);
      setNewNotice({ title: "", content: "", audience: "All Classes", priority: "Normal" });
      setNoticeAttachments([]);
    }
  };

  // Function to handle notice attachment selection
  const handleNoticeAttachment = (e) => {
    const files = Array.from(e.target.files);
    setNoticeAttachments(prev => [...prev, ...files]);
  };

  // Function to remove a notice attachment
  const removeNoticeAttachment = (index) => {
    setNoticeAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // Function to add a new note
  const addNewNote = () => {
    if (newNote.title && newNote.content) {
      const noteObj = {
        id: classNotes.length + 1,
        title: newNote.title,
        content: newNote.content,
        class: newNote.class,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setClassNotes([noteObj, ...classNotes]);
      setNewNote({
        title: "",
        content: "",
        class: ""
      });
      setShowAddNoteModal(false);
    }
  };

  // Function to handle new note form input changes
  const handleNewNoteChange = (e) => {
    const { name, value } = e.target;
    setNewNote({ ...newNote, [name]: value });
  };

  // Function to clear the new note form
  const clearNoteForm = () => {
    setNewNote({
      title: "",
      content: "",
      class: ""
    });
  };

  // Function to get notes for a specific class
  const getNotesForClass = (className) => {
    return classNotes.filter(note => note.class === className);
  };

  // Function to delete a note
  const deleteNote = (noteId) => {
    setClassNotes(classNotes.filter(note => note.id !== noteId));
  };

  // Function to edit a note
  const editNote = (noteId, updatedNote) => {
    setClassNotes(classNotes.map(note =>
      note.id === noteId ? { ...note, ...updatedNote } : note
    ));
  };

  // Function to handle file selection
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
      size: file.size,
      type: file.type,
      class: selectedClassDetails?.name || newNote.class,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }));

    setFileUploads([...fileUploads, ...newFiles]);
  };

  // Function to remove a file from upload list
  const removeFile = (fileId) => {
    setFileUploads(fileUploads.filter(file => file.id !== fileId));
  };

  // Function to upload files
  const uploadFiles = () => {
    // In a real application, this would send the files to a server
    // For now, we'll just add them to the uploaded files list
    const newUploads = fileUploads.map(file => ({
      ...file,
      id: Date.now() + Math.random(),
      uploadDate: new Date().toISOString().split('T')[0],
      uploadTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    setUploadedFiles([...uploadedFiles, ...newUploads]);
    setFileUploads([]);
    setShowFileUploadModal(false);

    // Show success message
    alert(`${newUploads.length} file(s) uploaded successfully!`);
  };

  // Initialize fileUploads with class information when opening the modal
  useEffect(() => {
    if (showFileUploadModal && selectedClassDetails) {
      // Ensure all file uploads have the correct class information
      setFileUploads(prevUploads => prevUploads.map(file => ({
        ...file,
        class: selectedClassDetails.name
      })));
    }
  }, [showFileUploadModal, selectedClassDetails]);

  // Function to format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Function to get file icon based on file type
  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) {
      return '🖼️';
    } else if (fileType.includes('pdf')) {
      return '📄';
    } else if (fileType.includes('word')) {
      return '📝';
    } else if (fileType.includes('excel') || fileType.includes('spreadsheet')) {
      return '📊';
    } else if (fileType.includes('powerpoint') || fileType.includes('presentation')) {
      return '📽️';
    } else {
      return '📁';
    }
  };

  // Function to get files for a specific class
  const getFilesForClass = (className) => {
    return uploadedFiles.filter(file => file.class === className);
  };

  // Function to delete an uploaded file
  const deleteUploadedFile = (fileId) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== fileId));
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

  // Function to get time ago
  const getTimeAgo = (date, time) => {
    // For simplicity, returning static values
    // In a real application, you would calculate the actual time difference
    return '2 hours ago';
  };

  // Function to handle assignment filter changes
  const handleAssignmentFilterChange = (e) => {
    const { name, value } = e.target;
    setAssignmentFilter({ ...assignmentFilter, [name]: value });
  };

  // Function to apply assignment filters
  const applyAssignmentFilters = () => {
    // Filtering is handled by the render logic, so we just close the modal
    setShowAssignmentFilter(false);
  };

  // Function to reset assignment filters
  const resetAssignmentFilters = () => {
    setAssignmentFilter({
      class: "",
      subject: "",
      status: "all"
    });
  };

  // Function to get filtered assignments
  const getFilteredAssignments = () => {
    return assignments.filter(assignment => {
      // Filter by class
      if (assignmentFilter.class && assignment.class !== assignmentFilter.class) {
        return false;
      }

      // Filter by subject
      if (assignmentFilter.subject && assignment.subject !== assignmentFilter.subject) {
        return false;
      }

      // Filter by status
      if (assignmentFilter.status !== "all") {
        const submittedCount = assignment.students.filter(s => s.submitted).length;
        const totalCount = assignment.students.length;
        const completionRate = totalCount > 0 ? submittedCount / totalCount : 0;

        if (assignmentFilter.status === "completed" && completionRate < 1) {
          return false;
        } else if (assignmentFilter.status === "pending" && completionRate >= 1) {
          return false;
        }
      }

      return true;
    });
  };

  // Get unique classes and subjects for filter options
  const getUniqueClasses = () => {
    const classes = assignments.map(a => a.class);
    return [...new Set(classes)];
  };

  const getUniqueSubjects = () => {
    const subjects = assignments.map(a => a.subject);
    return [...new Set(subjects)];
  };

  // Get filtered assignments for display
  const filteredAssignments = getFilteredAssignments();

  // Sync profileData with teacherData when teacherData changes
  useEffect(() => {
    setProfileData({
      name: teacherData.name,
      email: profileData.email, // Keep email as it's not in teacherData
      subject: teacherData.subject,
      school: teacherData.school
    });
  }, [teacherData]);

  // Calculate attendance counts
  const presentCount = studentAttendanceData.filter(student => student.status.present).length;
  const absentCount = studentAttendanceData.filter(student => student.status.absent).length;
  const lateCount = studentAttendanceData.filter(student => student.status.late).length;

  // State for chart time range
  const [chartTimeRange, setChartTimeRange] = useState('Last 7 Days');

  // Generate mock attendance data for different time ranges
  const weeklyAttendanceData = [
    { day: 'Mon', present: 32, absent: 3, late: 5 },
    { day: 'Tue', present: 30, absent: 4, late: 6 },
    { day: 'Wed', present: 35, absent: 2, late: 3 },
    { day: 'Thu', present: 33, absent: 3, late: 4 },
    { day: 'Fri', present: 36, absent: 1, late: 3 },
  ];

  const monthlyAttendanceData = [
    { day: 'Week 1', present: 150, absent: 20, late: 30 },
    { day: 'Week 2', present: 145, absent: 25, late: 30 },
    { day: 'Week 3', present: 160, absent: 15, late: 25 },
    { day: 'Week 4', present: 155, absent: 18, late: 27 },
  ];

  const quarterlyAttendanceData = [
    { day: 'Month 1', present: 620, absent: 85, late: 95 },
    { day: 'Month 2', present: 600, absent: 90, late: 110 },
    { day: 'Month 3', present: 650, absent: 60, late: 90 },
  ];

  // Function to get chart data based on selected time range
  const getChartData = () => {
    // Get the total number of students in the class
    const totalStudents = studentAttendanceData.length;

    // Get the raw data based on time range
    let rawData;
    switch (chartTimeRange) {
      case 'Last 30 Days':
        rawData = monthlyAttendanceData;
        break;
      case 'Last 90 Days':
        rawData = quarterlyAttendanceData;
        break;
      case 'Last 7 Days':
      default:
        rawData = weeklyAttendanceData;
        break;
    }

    // Convert absolute numbers to percentages
    return rawData.map(item => ({
      ...item,
      present: Math.round((item.present / totalStudents) * 100),
      absent: Math.round((item.absent / totalStudents) * 100),
      late: Math.round((item.late / totalStudents) * 100)
    }));
  };

  const summaryStats = [
    { label: 'Total Students', value: studentAttendanceData.length, icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Present Today', value: presentCount, icon: UserCheck, color: 'from-green-500 to-green-600' },
    { label: 'Absent Today', value: absentCount, icon: UserX, color: 'from-red-500 to-red-600' },
    { label: 'Late Today', value: lateCount, icon: Clock, color: 'from-yellow-500 to-orange-500' },
  ];

  // Placeholder for missing functions to avoid errors if any
  const exportAttendanceReport = () => console.log("Export report");
  const resetAttendance = () => console.log("Reset attendance");
  const deleteStudent = () => console.log("Delete student");
  const markAllPresent = () => console.log("Mark all present");
  const handleReportsFilterChange = () => console.log("Reports filter change");
  const applyReportsFilters = () => console.log("Apply reports filters");
  const resetReportsFilters = () => console.log("Reset reports filters");

  // Missing SVG Components
  const EducationIllustration = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-20 absolute right-0 bottom-0 pointer-events-none">
      <circle cx="150" cy="150" r="40" fill="currentColor" />
      <rect x="100" y="50" width="30" height="30" rx="5" fill="currentColor" />
      <path d="M50 150 L80 100 L110 150 Z" fill="currentColor" />
    </svg>
  );

  const EnhancedEducationIllustration = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-20 absolute right-0 bottom-0 pointer-events-none">
      <circle cx="160" cy="40" r="20" fill="currentColor" />
      <rect x="20" y="120" width="40" height="40" rx="8" fill="currentColor" />
      <path d="M120 160 L140 120 L160 160 Z" fill="currentColor" />
    </svg>
  );

  const EducationCardIllustration = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full opacity-20 absolute right-0 bottom-0 pointer-events-none">
      <circle cx="80" cy="20" r="15" fill="currentColor" />
      <rect x="10" y="60" width="20" height="20" rx="4" fill="currentColor" />
    </svg>
  );

  return (
    <div className="flex min-h-screen h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
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
              <img
                src={teacherAvatar}
                alt="Teacher Avatar"
                className="w-8 h-8 rounded-md object-cover shadow-sm"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent truncate block">
                  {teacherData.name}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 truncate">{teacherData.subject} Teacher</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-2.5 pt-0 space-y-0.5 overflow-y-auto">
          {[
            { id: 'home', icon: Home, label: 'Dashboard Home' },
            { id: 'classes', icon: BookOpen, label: 'Classes' },
            { id: 'attendance', icon: UserCheck, label: 'Attendance' },
            { id: 'assignments', icon: ClipboardList, label: 'Assignments' },
            { id: 'notices', icon: MessageSquare, label: 'Post Notices', 'data-tab': 'notices' },
            { id: 'reports', icon: FileText, label: 'Reports' },
            { id: 'alerts', icon: Bell, label: 'Alerts' },
            { id: 'chatbot', icon: Bot, label: 'Chatbot' },
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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
            onClick={() => setShowAvatarModal(true)}
            className="w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all"
          >
            <User className="w-3.5 h-3.5" />
            <span className="font-medium text-[11px]">Change Avatar</span>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              navigate('/login');
            }}
            className="w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="font-medium text-[11px]">Logout</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto overscroll-contain flex flex-col h-full">
        {/* Ultra Modern Header */}
        <div className="flex-shrink-0">
          <UltraModernHeader
            dashboardTitle="Teacher Dashboard"
            userType="Teacher"
            userName={teacherData.name}
            userRole={`${teacherData.subject} Teacher`}
            onLogout={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              navigate('/login');
            }}
            onAlertsClick={() => setActiveTab('alerts')}
          />
        </div>

        {/* Dashboard Content */}
        <div className="p-6 flex-grow min-h-[500px]">
          {/* Home Tab */}
          {activeTab === 'home' && (
            <div>
              {/* Welcome Banner - Matching student dashboard style */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-4 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden drop-shadow-sm -mt-5">
                {/* Educational background elements */}
                <EnhancedEducationIllustration />
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute top-3 right-3 w-6 h-6 bg-white/10 rotate-45"></div>
                <div className="absolute bottom-3 left-3 w-5 h-5 bg-white/20 rounded-full"></div>
                <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-white/5 rounded-full"></div>
                <div className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-white/10 rotate-12"></div>

                <div className="relative z-10 flex items-center gap-2.5">
                  <div className="relative">
                    <img
                      src={teacherAvatar}
                      alt="Teacher Avatar"
                      className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-white/30 cursor-pointer"
                      onClick={() => setShowAvatarModal(true)}
                    />
                  </div>
                  <div>
                    <h2 className="text-[13px] font-bold text-white mb-1">
                      Welcome back, {teacherData.name.split(' ')[1]}! 👋
                    </h2>
                    <p className="text-blue-100 text-[11px] mb-1">
                      {teacherData.subject} Teacher at {teacherData.school}
                    </p>
                    <p className="text-blue-100 text-[11px]">
                      You have {teacherData.classes.length} classes today
                    </p>
                  </div>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="flex gap-2 mb-3">
                <div className="flex-grow bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-3 shadow-sm border border-white/30 backdrop-blur-sm text-white relative overflow-hidden">
                  {/* Educational design elements */}
                  <EducationCardIllustration />
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-white/10 rounded-full"></div>
                  <div className="absolute top-2 right-2 w-6 h-6 bg-white/10 rotate-45"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-blue-100 text-[11px]">Total Students</p>
                      <p className="text-lg font-bold mt-0.5">{studentAttendanceData.length}</p>
                      <p className="text-blue-100 text-[9px] mt-0.5">Across all classes</p>
                    </div>
                    <Users className="w-6 h-6 text-blue-200 relative z-10" />
                  </div>
                </div>
                <div className="flex-grow bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-3 shadow-sm border border-white/30 backdrop-blur-sm text-white relative overflow-hidden">
                  {/* Educational design elements */}
                  <EducationCardIllustration />
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-white/10 rounded-full"></div>
                  <div className="absolute top-2 right-2 w-6 h-6 bg-white/10 rotate-45"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-indigo-100 text-[11px]">Present Today</p>
                      <p className="text-lg font-bold mt-0.5">{presentCount}</p>
                      <p className="text-indigo-100 text-[9px] mt-0.5">Currently marked</p>
                    </div>
                    <UserCheck className="w-6 h-6 text-indigo-200 relative z-10" />
                  </div>
                </div>

                <div className="flex-grow bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg p-3 shadow-sm border border-white/30 backdrop-blur-sm text-white relative overflow-hidden">
                  {/* Educational design elements */}
                  <EducationCardIllustration />
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-white/10 rounded-full"></div>
                  <div className="absolute top-2 right-2 w-6 h-6 bg-white/10 rotate-45"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-purple-100 text-[11px]">Absent Today</p>
                      <p className="text-lg font-bold mt-0.5">{absentCount}</p>
                      <p className="text-purple-100 text-[9px] mt-0.5">Needs attention</p>
                    </div>
                    <UserX className="w-6 h-6 text-purple-200 relative z-10" />
                  </div>
                </div>

                <div className="flex-grow bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-3 shadow-sm border border-white/30 backdrop-blur-sm text-white relative overflow-hidden">
                  {/* Educational design elements */}
                  <EducationCardIllustration />
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-white/10 rounded-full"></div>
                  <div className="absolute top-2 right-2 w-6 h-6 bg-white/10 rotate-45"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-blue-100 text-[11px]">Late Arrivals</p>
                      <p className="text-lg font-bold mt-0.5">{lateCount}</p>
                      <p className="text-blue-100 text-[9px] mt-0.5">Arrived after start</p>
                    </div>
                    <Clock className="w-6 h-6 text-blue-200 relative z-10" />
                  </div>
                </div>
              </div >

              {/* Charts and Recent Activity */}
              < div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8" >
                {/* Attendance Chart */}
                < div className="flex-grow bg-gradient-to-br from-[#F3F4FF] to-[#E0F2FE] rounded-lg p-4 shadow-md border border-gray-300" >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xs font-bold text-gray-900">Weekly Attendance Trend Analysis</h3>
                    <select
                      className="text-[10px] border border-gray-300 rounded-full px-3 py-1.5 bg-white"
                      value={chartTimeRange}
                      onChange={(e) => setChartTimeRange(e.target.value)}
                    >
                      <option value="Last 7 Days">Last 7 Days</option>
                      <option value="Last 30 Days">Last 30 Days</option>
                      <option value="Last 90 Days">Last 90 Days</option>
                    </select>
                  </div>
                  <div className="h-44">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getChartData()}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        <XAxis
                          dataKey="day"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#666', fontSize: 8 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#666', fontSize: 8 }}
                          domain={[0, 100]}
                          ticks={[0, 20, 40, 60, 80, 100]}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            borderRadius: '6px',
                            border: '1px solid #eee',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            fontSize: '8px',
                            color: '#333'
                          }}
                          formatter={(value) => [`${value}%`, 'Percentage']}
                        />
                        <Legend
                          wrapperStyle={{ fontSize: '8px' }}
                          formatter={(value) => `${value} (%)`}
                        />
                        <Line
                          type="monotone"
                          dataKey="present"
                          name="Present Students"
                          stroke="#8B5CF6"
                          strokeWidth={2}
                          dot={{ r: 3, fill: '#A78BFA' }}
                          activeDot={{ r: 5, fill: '#A78BFA' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="absent"
                          name="Absent Students"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          dot={{ r: 3, fill: '#60A5FA' }}
                          activeDot={{ r: 5, fill: '#60A5FA' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="late"
                          name="Late Arrivals"
                          stroke="#1D4ED8"
                          strokeWidth={2}
                          dot={{ r: 3, fill: '#3B82F6' }}
                          activeDot={{ r: 5, fill: '#3B82F6' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div >
              </div >
            </div >
          )}

          {/* Classes Tab */}
          {
            activeTab === 'classes' && (
              <div>
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-1 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden">
                  <EnhancedEducationIllustration />
                  <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute top-4 right-4 w-7 h-7 bg-white/10 rotate-45"></div>
                  <div className="absolute top-1/4 left-1/3 w-6 h-6 bg-white/5 rounded-full"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-white/10 rotate-6"></div>

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <h2 className="text-base font-bold text-white mb-1.5">Class Management Dashboard</h2>
                      <p className="text-[10px] text-blue-100 mb-2">Organize and manage all your classes and subjects</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                          <span className="text-[10px] text-white font-medium">{teacherData.school}</span>
                        </div>
                        <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
                          <span className="text-[10px] text-white font-medium">{teacherData.classes.length} Classes</span>
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

                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-sm font-bold text-blue-700">Class Management</h2>
                    <p className="text-[10px] text-gray-600 mt-1">Organize and manage all your classes and subjects</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowAddClassForm(true)}
                      className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow text-xs"
                    >
                      <Plus className="w-2.5 h-2.5" />
                      Add Class
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {teacherData.classes.slice(0, 3).map((classObj, index) => (
                    <div key={index}>
                      <EnhancedClassroomCard
                        title={classObj.subject}
                        subtitle={classObj.name}
                        teacher={teacherData.name}
                        theme={classObj.color}
                        onClick={() => {
                          setSelectedClassDetails(classObj);
                          setShowClassDetailsModal(true);
                        }}
                        onMenuClick={() => console.log(`${classObj.name} menu clicked`)}
                      />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-6 mt-6">
                  {teacherData.classes.slice(3).map((classObj, index) => (
                    <div key={index + 3}>
                      <EnhancedClassroomCard
                        title={classObj.subject}
                        subtitle={classObj.name}
                        teacher={teacherData.name}
                        theme={classObj.color}
                        onClick={() => {
                          setSelectedClassDetails(classObj);
                          setShowClassDetailsModal(true);
                        }}
                        onMenuClick={() => console.log(`${classObj.name} menu clicked`)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          }

          {/* Attendance Tab */}
          {
            activeTab === 'attendance' && (
              <div>
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-4 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden -mt-5">
                  <EnhancedEducationIllustration />
                  <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute top-4 right-4 w-7 h-7 bg-white/10 rotate-45"></div>
                  <div className="absolute top-1/3 left-1/4 w-7 h-7 bg-white/5 rounded-full"></div>
                  <div className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-white/10 rotate-12"></div>

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <h2 className="text-base font-bold text-white mb-1.5">Attendance Management Dashboard</h2>
                      <p className="text-[10px] text-blue-100 mb-2">Track and manage student attendance records</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                          <span className="text-[10px] text-white font-medium">{teacherData.school}</span>
                        </div>
                        <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
                          <span className="text-[10px] text-white font-medium">{studentAttendanceData.length} Students</span>
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

                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-sm font-bold text-blue-700">Attendance Management</h2>
                    <p className="text-[10px] text-gray-600 mt-1">Track and manage student attendance records</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowAddStudentForm(true)}
                      className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow text-xs"
                    >
                      <Plus className="w-2.5 h-2.5" />
                      Add Student
                    </button>
                    <button className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-200 text-gray-700 rounded hover:from-gray-200 hover:to-gray-300 transition-all shadow-sm hover:shadow text-xs">
                      <Filter className="w-2.5 h-2.5" />
                      Filter
                    </button>
                    <button className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded hover:from-purple-600 hover:to-pink-700 transition-all shadow-sm hover:shadow text-xs">
                      <Download className="w-2.5 h-2.5" />
                      Export Report
                    </button>
                  </div>
                </div>

                {/* Attendance Table */}
                <div className="bg-white rounded-md p-2.5 shadow-sm">
                  {/* Bulk Actions */}
                  <div className="flex gap-1 mb-2.5">
                    <button
                      onClick={markAllPresent}
                      className="px-2 py-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-[9px] font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow"
                    >
                      Mark All Present
                    </button>
                    <button
                      onClick={resetAttendance}
                      className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-[9px] font-medium hover:bg-gray-200 transition-all"
                    >
                      Reset Attendance
                    </button>
                  </div>
                  <div className="overflow-hidden rounded-sm border border-gray-200">
                    <table className="w-full text-[9px]">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-left py-1 px-1.5 font-medium text-gray-500 text-[9px]">Student</th>
                          <th className="text-left py-1 px-1.5 font-medium text-gray-500 text-[9px]">Roll No</th>
                          <th className="text-left py-1 px-1.5 font-medium text-gray-500 text-[9px]">Status</th>
                          <th className="text-left py-1 px-1.5 font-medium text-gray-500 text-[9px]">Method</th>
                          <th className="text-left py-1 px-1.5 font-medium text-gray-500 text-[9px]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentAttendanceData.map((student) => (
                          <tr key={student.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors duration-150">
                            <td className="py-1 px-1.5">
                              <div className="flex items-center gap-1">
                                <div className="relative">
                                  <img
                                    src={student.avatar}
                                    alt="Student Avatar"
                                    className="w-6 h-6 rounded-full object-cover shadow-sm border-2 border-indigo-200"
                                  />
                                  <div className={`absolute bottom-0 right-0 w-1 h-1 rounded-full border border-white ${student.status.present ? 'bg-green-500' : student.status.absent ? 'bg-red-500' : student.status.late ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
                                </div>
                                <span className="font-medium text-gray-900 text-[10px]">{student.name}</span>
                              </div>
                            </td>
                            <td className="py-1 px-1.5 text-gray-600 text-[10px]">{student.roll}</td>
                            <td className="py-1 px-1.5">
                              <div className="flex gap-0.5">
                                <button
                                  onClick={() => editStudentStatus(student.id, 'present')}
                                  className={`px-1 py-0.5 rounded-full text-[9px] font-medium transition-all duration-200 ${student.status.present ? 'bg-green-100 text-green-800 ring-1 ring-green-400' : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600'}`}
                                >
                                  P
                                </button>
                                <button
                                  onClick={() => editStudentStatus(student.id, 'absent')}
                                  className={`px-1 py-0.5 rounded-full text-[9px] font-medium transition-all duration-200 ${student.status.absent ? 'bg-red-100 text-red-800 ring-1 ring-red-400' : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'}`}
                                >
                                  A
                                </button>
                                <button
                                  onClick={() => editStudentStatus(student.id, 'late')}
                                  className={`px-1 py-0.5 rounded-full text-[9px] font-medium transition-all duration-200 ${student.status.late ? 'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-400' : 'bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600'}`}
                                >
                                  L
                                </button>
                              </div>
                            </td>
                            <td className="py-1 px-1.5">
                              <span className={`px-1 py-0.5 rounded-full text-[9px] font-medium ${student.method === 'Face Scan' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                {student.method}
                              </span>
                            </td>
                            <td className="py-1 px-1.5">
                              <div className="flex gap-1">
                                <button
                                  onClick={() => handleEditClick(student)}
                                  className="p-0.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                >
                                  <Edit className="w-2.5 h-2.5" />
                                </button>
                                <button
                                  onClick={() => deleteStudent(student.id)}
                                  className="p-0.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                >
                                  <Trash2 className="w-2.5 h-2.5" />
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
            )
          }

          {/* Assignments Tab */}
          {
            activeTab === 'assignments' && (
              <div>
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-4 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden -mt-5">
                  <EducationIllustration />
                  <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute top-4 right-4 w-7 h-7 bg-white/10 rotate-45"></div>

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <h2 className="text-base font-bold text-white mb-1.5">Assignment Management Dashboard</h2>
                      <p className="text-[10px] text-blue-100 mb-2">Create and manage student assignments and track submissions</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                          <span className="text-[10px] text-white font-medium">{teacherData.school}</span>
                        </div>
                        <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
                          <span className="text-[10px] text-white font-medium">{assignments.length} Assignments</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-white/20 rounded-md p-2">
                        <ClipboardList className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-sm font-bold text-blue-700">Assignment Management</h2>
                    <p className="text-[10px] text-gray-600 mt-1">Create and manage student assignments and track submissions</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowAddAssignmentForm(true)}
                      className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow text-xs"
                    >
                      <Plus className="w-2.5 h-2.5" />
                      Post Assignment
                    </button>
                    <button
                      onClick={() => setShowAssignmentFilter(true)}
                      className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-all shadow-sm hover:shadow text-xs"
                    >
                      <Filter className="w-2.5 h-2.5" />
                      Filter
                    </button>
                  </div>
                </div>

                {/* Assignments List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {filteredAssignments.map((assignment) => (
                    <div key={assignment.id} className="bg-blue-50 rounded-md p-3 shadow-sm border border-blue-100">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900 text-sm">{assignment.title}</h3>
                        <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                          {assignment.subject}
                        </span>
                      </div>
                      <p className="text-gray-600 text-[10px] mb-2">{assignment.description}</p>
                      <div className="flex justify-between items-center text-[10px] text-gray-500 mb-3">
                        <span>Class: {assignment.class}</span>
                        <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-[10px]">
                          <span className="text-gray-600">Submissions: </span>
                          <span className="font-medium">
                            {assignment.students.filter(s => s.submitted).length}/{assignment.students.length}
                          </span>
                        </div>
                        <button
                          onClick={() => console.log('View assignment details')}
                          className="text-blue-600 hover:text-blue-800 text-[10px] font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Assignment Submission Tracking */}
                <div className="bg-blue-50 rounded-md p-2.5 shadow-sm border border-blue-100">
                  <h3 className="font-bold text-gray-900 text-sm mb-3">Track Student Submissions</h3>
                  <div className="overflow-hidden rounded-sm border border-gray-200">
                    <table className="w-full text-[9px]">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-left py-1 px-1.5 font-medium text-gray-500 text-[9px]">Assignment</th>
                          <th className="text-left py-1 px-1.5 font-medium text-gray-500 text-[9px]">Student</th>
                          <th className="text-left py-1 px-1.5 font-medium text-gray-500 text-[9px]">Status</th>
                          <th className="text-left py-1 px-1.5 font-medium text-gray-500 text-[9px]">Grade</th>
                          <th className="text-left py-1 px-1.5 font-medium text-gray-500 text-[9px]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAssignments.flatMap(assignment =>
                          assignment.students.map(student => {
                            // Find the full student object from studentAttendanceData
                            const fullStudent = studentAttendanceData.find(s => s.id === student.id);
                            return (
                              <tr key={`${assignment.id}-${student.id}`} className="border-b border-gray-100 hover:bg-blue-50 transition-colors duration-150">
                                <td className="py-1 px-1.5">
                                  <div className="font-medium text-gray-900 text-[10px]">{assignment.title}</div>
                                  <div className="text-gray-500 text-[9px]">{assignment.class}</div>
                                </td>
                                <td className="py-1 px-1.5">
                                  <div className="flex items-center gap-1">
                                    {fullStudent && (
                                      <div className="relative">
                                        <img
                                          src={getStudentAvatar(fullStudent.name)}
                                          alt="Student Avatar"
                                          className="w-6 h-6 rounded-full object-cover shadow-sm border-2 border-indigo-200"
                                        />
                                        <div className="absolute bottom-0 right-0 w-1 h-1 bg-green-400 rounded-full border border-white"></div>
                                      </div>
                                    )}
                                    <span className="font-medium text-gray-900 text-[10px]">{student.name}</span>
                                  </div>
                                </td>
                                <td className="py-1 px-1.5">
                                  <div className="flex gap-0.5">
                                    <button
                                      onClick={() => updateStudentSubmission(assignment.id, student.id, !student.submitted)}
                                      className={`px-1 py-0.5 rounded-full text-[9px] font-medium transition-all duration-200 ${student.submitted ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                    >
                                      {student.submitted ? 'Submitted' : 'Pending'}
                                    </button>
                                  </div>
                                </td>
                                <td className="py-1 px-1.5 text-gray-600 text-[10px]">
                                  <span>{student.grade}</span>
                                </td>
                                <td className="py-1 px-1.5">
                                  <div className="flex gap-0.5">
                                    <input
                                      type="text"
                                      value={student.grade}
                                      onChange={(e) => updateStudentGrade(assignment.id, student.id, e.target.value)}
                                      className="w-12 px-1 py-0.5 border border-gray-300 rounded text-[9px]"
                                      placeholder="Grade"
                                    />
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )
          }

          {/* Reports Tab */}
          {
            activeTab === 'reports' && (
              <div className="pt-2">
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-4 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden -mt-5">
                  <EnhancedEducationIllustration />
                  <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute top-4 right-4 w-7 h-7 bg-white/10 rotate-45"></div>
                  <div className="absolute top-1/4 left-1/3 w-6 h-6 bg-white/5 rounded-full"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-white/10 rotate-6"></div>

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <h2 className="text-base font-bold text-white mb-1.5">Reports & Analytics Dashboard</h2>
                      <p className="text-[10px] text-blue-100 mb-2">Comprehensive analytics and reporting for student performance</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                          <span className="text-[10px] text-white font-medium">{teacherData.school}</span>
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

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-sm font-bold text-blue-700">Attendance Reports & Analytics</h2>
                    <p className="text-[10px] text-gray-600 mt-1">Comprehensive analytics and reporting for student performance</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowReportsFilter(true)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-all text-xs font-medium"
                    >
                      <Filter className="w-3 h-3" />
                      Filter Data
                    </button>
                    <button
                      onClick={exportAttendanceReport}
                      className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow text-xs font-medium"
                    >
                      <Download className="w-3 h-3" />
                      Export Report
                    </button>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="flex gap-3 mb-4">
                  {/* Total Students: Purple to indigo gradient */}
                  <div className="flex-grow bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg p-4 shadow-sm border border-purple-200/30 backdrop-blur-sm text-white relative overflow-hidden">
                    <div className="absolute -top-5 -right-5 w-20 h-20 bg-purple-300/10 rounded-full"></div>
                    <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-purple-700/10 rounded-full"></div>
                    <div className="flex items-center justify-between relative z-10">
                      <div>
                        <p className="text-purple-100 text-xs">Total Students</p>
                        <p className="text-xl font-bold mt-1">{studentAttendanceData.length}</p>
                      </div>
                      <Users className="w-7 h-7 text-purple-200 relative z-10" />
                    </div>
                  </div>

                  {/* Present Today: Purple to indigo gradient */}
                  <div className="flex-grow bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg p-4 shadow-sm border border-purple-200/30 backdrop-blur-sm text-white relative overflow-hidden">
                    <div className="absolute -top-5 -right-5 w-20 h-20 bg-purple-300/10 rounded-full"></div>
                    <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-purple-700/10 rounded-full"></div>
                    <div className="flex items-center justify-between relative z-10">
                      <div>
                        <p className="text-purple-100 text-xs">Present Today</p>
                        <p className="text-xl font-bold mt-1">{presentCount}</p>
                      </div>
                      <UserCheck className="w-7 h-7 text-purple-200 relative z-10" />
                    </div>
                  </div>

                  {/* Absent Today: Purple to indigo gradient */}
                  <div className="flex-grow bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg p-4 shadow-sm border border-purple-200/30 backdrop-blur-sm text-white relative overflow-hidden">
                    <div className="absolute -top-5 -right-5 w-20 h-20 bg-purple-300/10 rounded-full"></div>
                    <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-purple-700/10 rounded-full"></div>
                    <div className="flex items-center justify-between relative z-10">
                      <div>
                        <p className="text-purple-100 text-xs">Absent Today</p>
                        <p className="text-xl font-bold mt-1">{absentCount}</p>
                      </div>
                      <UserX className="w-7 h-7 text-purple-200 relative z-10" />
                    </div>
                  </div>

                  {/* Late Arrivals: Purple to indigo gradient */}
                  <div className="flex-grow bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg p-4 shadow-sm border border-purple-200/30 backdrop-blur-sm text-white relative overflow-hidden">
                    <div className="absolute -top-5 -right-5 w-20 h-20 bg-purple-300/10 rounded-full"></div>
                    <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-purple-700/10 rounded-full"></div>
                    <div className="flex items-center justify-between relative z-10">
                      <div>
                        <p className="text-purple-100 text-xs">Late Arrivals</p>
                        <p className="text-xl font-bold mt-1">{lateCount}</p>
                      </div>
                      <Clock className="w-7 h-7 text-purple-200 relative z-10" />
                    </div>
                  </div>
                </div>

                {/* Charts Section */}
                <div className="flex gap-3 mb-4">
                  {/* Weekly Attendance Chart */}
                  <div className="flex-grow bg-gradient-to-br from-[#F3F4FF] to-[#E0F2FE] rounded-lg p-4 shadow-md border border-gray-300">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xs font-bold text-gray-900">Weekly Attendance Trend Analysis</h3>
                      <select
                        className="text-[10px] border border-gray-300 rounded-full px-3 py-1.5 bg-white"
                        value={chartTimeRange}
                        onChange={(e) => setChartTimeRange(e.target.value)}
                      >
                        <option value="Last 7 Days">Last 7 Days</option>
                        <option value="Last 30 Days">Last 30 Days</option>
                        <option value="Last 90 Days">Last 90 Days</option>
                      </select>
                    </div>
                    <div className="h-44">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={getChartData()}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                          <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#666', fontSize: 8 }}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#666', fontSize: 8 }}
                            domain={[0, 100]}
                            ticks={[0, 20, 40, 60, 80, 100]}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'white',
                              borderRadius: '6px',
                              border: '1px solid #eee',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                              fontSize: '8px',
                              color: '#333'
                            }}
                            formatter={(value) => [`${value}%`, 'Percentage']}
                          />
                          <Legend
                            wrapperStyle={{ fontSize: '8px' }}
                            formatter={(value) => `${value} (%)`}
                          />
                          <Line
                            type="monotone"
                            dataKey="present"
                            name="Present Students"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            dot={{ r: 3, fill: '#3B82F6' }}
                            activeDot={{ r: 5, fill: '#3B82F6' }}
                          />
                          <Line
                            type="monotone"
                            dataKey="absent"
                            name="Absent Students"
                            stroke="#6366F1"
                            strokeWidth={2}
                            dot={{ r: 3, fill: '#6366F1' }}
                            activeDot={{ r: 5, fill: '#6366F1' }}
                          />
                          <Line
                            type="monotone"
                            dataKey="late"
                            name="Late Arrivals"
                            stroke="#8B5CF6"
                            strokeWidth={2}
                            dot={{ r: 3, fill: '#8B5CF6' }}
                            activeDot={{ r: 5, fill: '#8B5CF6' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Additional Reports Section */}
                <div className="mt-6 flex gap-4">
                  <div className="flex-grow bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-3 shadow-sm border border-indigo-200/30 backdrop-blur-sm text-white">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-bold text-sm">Monthly Attendance Report</h3>
                      <Calendar className="w-4 h-4 text-indigo-200" />
                    </div>
                    <p className="text-indigo-100 text-[9px] mb-2.5">Comprehensive attendance analysis for the current month</p>
                    <button
                      onClick={() => console.log('View Monthly Report clicked')}
                      className="px-2 py-0.5 bg-white text-indigo-600 rounded-md hover:bg-gray-100 transition-all text-[9px] font-medium"
                    >
                      View Detailed Report
                    </button>
                  </div>

                  <div className="flex-grow bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg p-3 shadow-sm border border-cyan-200/30 backdrop-blur-sm text-white">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-bold text-sm">Class Performance Comparison</h3>
                      <TrendingUp className="w-4 h-4 text-cyan-200" />
                    </div>
                    <p className="text-cyan-100 text-[9px] mb-2.5">Compare attendance performance across different classes</p>
                    <button
                      onClick={() => console.log('View Class Performance clicked')}
                      className="px-2 py-0.5 bg-white text-cyan-600 rounded-md hover:bg-gray-100 transition-all text-[9px] font-medium"
                    >
                      Compare Performance
                    </button>
                  </div>

                  <div className="flex-grow bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg p-3 shadow-sm border border-amber-200/30 backdrop-blur-sm text-white">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-bold text-sm">Individual Student Records</h3>
                      <Users className="w-4 h-4 text-amber-200" />
                    </div>
                    <p className="text-amber-100 text-[9px] mb-2.5">Detailed attendance history for each student</p>
                    <button
                      onClick={() => console.log('View Student Details clicked')}
                      className="px-2 py-0.5 bg-white text-amber-600 rounded-md hover:bg-gray-100 transition-all text-[9px] font-medium"
                    >
                      View Student Records
                    </button>
                  </div>
                </div>
              </div>
            )}

          {/* Alerts Tab */}
          {activeTab === 'alerts' && (
            <div style={{ padding: '16px' }}>
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-2 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden -mt-8">
                <EnhancedEducationIllustration />
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute top-4 right-4 w-7 h-7 bg-white/10 rotate-45"></div>
                <div className="absolute top-1/3 left-1/4 w-7 h-7 bg-white/5 rounded-full"></div>
                <div className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-white/10 rotate-12"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-white mb-1.5">Alert Management Dashboard</h2>
                    <p className="text-[10px] text-blue-100 mb-2">Monitor and manage all system alerts and notifications</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{teacherData.school}</span>
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

              <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '21px', marginBottom: '21px', color: '#1d4ed8' }}>Alert Management & Notifications</h2>

              {/* Alert Summary Cards */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '15px' }}>
                <div style={{ background: 'linear-gradient(to bottom right, #f87171, #ef4444)', padding: '14px', borderRadius: '7px', border: '1px solid rgba(248, 113, 113, 0.3)', textAlign: 'center', flex: '1', position: 'relative', overflow: 'hidden', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.15)' }}>
                  <div style={{ position: 'absolute', top: '-29px', right: '-29px', width: '95px', height: '95px', backgroundColor: 'rgba(254, 202, 202, 0.15)', borderRadius: '50%', zIndex: '0' }}></div>
                  <div style={{ position: 'absolute', bottom: '-19px', left: '-19px', width: '75px', height: '75px', backgroundColor: 'rgba(252, 165, 165, 0.2)', borderRadius: '50%', zIndex: '0' }}></div>
                  <div style={{ position: 'relative', zIndex: '1' }}>
                    <h3 style={{ fontSize: '21px', fontWeight: 'bold', marginBottom: '4px' }}>3</h3>
                    <p style={{ fontSize: '11px', opacity: '0.9' }}>Critical Alerts</p>
                  </div>
                </div>

                <div style={{ background: 'linear-gradient(to bottom right, #fbbf24, #f59e0b)', padding: '14px', borderRadius: '7px', border: '1px solid rgba(251, 191, 36, 0.3)', textAlign: 'center', flex: '1', position: 'relative', overflow: 'hidden', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.15)' }}>
                  <div style={{ position: 'absolute', top: '-29px', right: '-29px', width: '95px', height: '95px', backgroundColor: 'rgba(251, 191, 36, 0.15)', borderRadius: '50%', zIndex: '0' }}></div>
                  <div style={{ position: 'absolute', bottom: '-19px', left: '-19px', width: '75px', height: '75px', backgroundColor: 'rgba(245, 158, 11, 0.2)', borderRadius: '50%', zIndex: '0' }}></div>
                  <div style={{ position: 'relative', zIndex: '1' }}>
                    <h3 style={{ fontSize: '21px', fontWeight: 'bold', marginBottom: '4px' }}>7</h3>
                    <p style={{ fontSize: '11px', opacity: '0.9' }}>Warnings</p>
                  </div>
                </div>

                <div style={{ background: 'linear-gradient(to bottom right, #60a5fa, #3b82f6)', padding: '14px', borderRadius: '7px', border: '1px solid rgba(96, 165, 250, 0.3)', textAlign: 'center', flex: '1', position: 'relative', overflow: 'hidden', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.15)' }}>
                  <div style={{ position: 'absolute', top: '-29px', right: '-29px', width: '95px', height: '95px', backgroundColor: 'rgba(191, 219, 254, 0.15)', borderRadius: '50%', zIndex: '0' }}></div>
                  <div style={{ position: 'absolute', bottom: '-19px', left: '-19px', width: '75px', height: '75px', backgroundColor: 'rgba(96, 165, 250, 0.2)', borderRadius: '50%', zIndex: '0' }}></div>
                  <div style={{ position: 'relative', zIndex: '1' }}>
                    <h3 style={{ fontSize: '21px', fontWeight: 'bold', marginBottom: '4px' }}>12</h3>
                    <p style={{ fontSize: '11px', opacity: '0.9' }}>Informational Notices</p>
                  </div>
                </div>

                <div style={{ background: 'linear-gradient(to bottom right, #a78bfa, #8b5cf6)', padding: '14px', borderRadius: '7px', border: '1px solid rgba(167, 139, 250, 0.3)', textAlign: 'center', flex: '1', position: 'relative', overflow: 'hidden', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.15)' }}>
                  <div style={{ position: 'absolute', top: '-29px', right: '-29px', width: '95px', height: '95px', backgroundColor: 'rgba(221, 214, 254, 0.15)', borderRadius: '50%', zIndex: '0' }}></div>
                  <div style={{ position: 'absolute', bottom: '-19px', left: '-19px', width: '75px', height: '75px', backgroundColor: 'rgba(192, 132, 252, 0.2)', borderRadius: '50%', zIndex: '0' }}></div>
                  <div style={{ position: 'relative', zIndex: '1' }}>
                    <h3 style={{ fontSize: '21px', fontWeight: 'bold', marginBottom: '4px' }}>5</h3>
                    <p style={{ fontSize: '11px', opacity: '0.9' }}>General Info</p>
                  </div>
                </div>
              </div>

              {/* Alerts List */}
              <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '10px' }}>Recent Alerts & Notifications</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', padding: '11px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px' }}>
                    <div style={{ color: '#dc2626', marginTop: '1px' }}>⚠️</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1px' }}>
                        <h4 style={{ fontWeight: '600', color: '#111827', fontSize: '12px' }}>High Absenteeism Detected</h4>
                        <span style={{ fontSize: '6px', color: '#6b7280' }}>2 hours ago</span>
                      </div>
                      <p style={{ fontSize: '8px', color: '#6b7280', marginBottom: '6px' }}>Multiple students in Class 10-A have been absent for more than 3 consecutive days. Immediate attention required.</p>
                      <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                        <span style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '2px 4px', borderRadius: '9999px', fontSize: '6px' }}>Critical</span>
                        <span style={{ fontSize: '6px', color: '#6b7280' }}>Class 10-A</span>
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button style={{ padding: '2px 8px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '2px', cursor: 'pointer', fontWeight: '500', fontSize: '8px' }}>Take Action</button>
                        <button style={{ padding: '2px 8px', backgroundColor: '#ffffff', color: '#dc2626', border: '1px solid #dc2626', borderRadius: '2px', cursor: 'pointer', fontWeight: '500', fontSize: '8px' }}>View Details</button>
                      </div>
                    </div>
                    <button style={{ color: '#9ca3af', cursor: 'pointer' }}>✕</button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', padding: '11px', backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '4px' }}>
                    <div style={{ color: '#d97706', marginTop: '1px' }}>⚠️</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1px' }}>
                        <h4 style={{ fontWeight: '600', color: '#111827', fontSize: '12px' }}>Late Arrival Trend</h4>
                        <span style={{ fontSize: '6px', color: '#6b7280' }}>1 day ago</span>
                      </div>
                      <p style={{ fontSize: '8px', color: '#6b7280', marginBottom: '6px' }}>Increased number of late arrivals detected in Class 11-B this week compared to previous weeks.</p>
                      <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                        <span style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '2px 4px', borderRadius: '9999px', fontSize: '6px' }}>Warning</span>
                        <span style={{ fontSize: '6px', color: '#6b7280' }}>Class 11-B</span>
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button style={{ padding: '2px 8px', backgroundColor: '#d97706', color: 'white', border: 'none', borderRadius: '2px', cursor: 'pointer', fontWeight: '500', fontSize: '8px' }}>Review Policy</button>
                        <button style={{ padding: '2px 8px', backgroundColor: '#ffffff', color: '#d97706', border: '1px solid #d97706', borderRadius: '2px', cursor: 'pointer', fontWeight: '500', fontSize: '8px' }}>View Details</button>
                      </div>
                    </div>
                    <button style={{ color: '#9ca3af', cursor: 'pointer' }}>✕</button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', padding: '11px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '4px' }}>
                    <div style={{ color: '#2563eb', marginTop: '1px' }}>🔔</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1px' }}>
                        <h4 style={{ fontWeight: '600', color: '#111827', fontSize: '12px' }}>System Maintenance Scheduled</h4>
                        <span style={{ fontSize: '6px', color: '#6b7280' }}>3 days ago</span>
                      </div>
                      <p style={{ fontSize: '8px', color: '#6b7280', marginBottom: '6px' }}>Planned system maintenance on April 20, 2024 from 10:00 PM to 2:00 AM. Service may be temporarily unavailable.</p>
                      <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                        <span style={{ backgroundColor: '#dbeafe', color: '#1d4ed8', padding: '2px 4px', borderRadius: '9999px', fontSize: '6px' }}>Notice</span>
                        <span style={{ fontSize: '6px', color: '#6b7280' }}>System Admin</span>
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button style={{ padding: '2px 8px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '2px', cursor: 'pointer', fontWeight: '500', fontSize: '8px' }}>Acknowledge</button>
                        <button style={{ padding: '2px 8px', backgroundColor: '#ffffff', color: '#2563eb', border: '1px solid #2563eb', borderRadius: '2px', cursor: 'pointer', fontWeight: '500', fontSize: '8px' }}>More Info</button>
                      </div>
                    </div>
                    <button style={{ color: '#9ca3af', cursor: 'pointer' }}>✕</button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Post Notices Tab */}
          {activeTab === 'notices' && (
            <div>
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-4 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden -mt-5">
                <EnhancedEducationIllustration />
                <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute top-4 right-4 w-7 h-7 bg-white/10 rotate-45"></div>
                <div className="absolute top-1/3 left-1/4 w-7 h-7 bg-white/5 rounded-full"></div>
                <div className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-white/10 rotate-12"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-[13px] font-bold text-white mb-1.5">Notice Management Dashboard</h2>
                    <p className="text-[10px] text-blue-100 mb-2">Create and manage important notices for students and staff</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">{teacherData.school}</span>
                      </div>
                      <div className="flex items-center bg-white/10 rounded-full px-2.5 py-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
                        <span className="text-[10px] text-white font-medium">Notice Board</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 rounded-md p-2">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-[14px] font-bold text-blue-700">Post New Notice</h2>
                  <p className="text-[10px] text-gray-600 mt-1">Create and manage important notices for students and staff</p>
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
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <h3 className="text-[10px] font-bold text-gray-900 mb-3">Compose Notice</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Notice Title</label>
                    <input
                      type="text"
                      name="title"
                      value={newNotice.title}
                      onChange={handleNewNoticeChange}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[10px]"
                      placeholder="Enter notice title"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Notice Content</label>
                    <textarea
                      name="content"
                      value={newNotice.content}
                      onChange={handleNewNoticeChange}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[10px]"
                      placeholder="Enter notice content"
                      rows="4"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Target Audience</label>
                    <select
                      name="audience"
                      value={newNotice.audience}
                      onChange={handleNewNoticeChange}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[10px]"
                    >
                      <option value="All Classes">All Classes</option>
                      {teacherData.classes.map((cls, index) => (
                        <option key={index} value={cls.name}>{cls.name}</option>
                      ))}
                      <option value="Staff Only">Staff Only</option>
                      <option value="Parents">Parents</option>
                    </select>
                  </div >

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setNewNotice({ title: "", content: "", audience: "All Classes", priority: "Normal" })}
                      className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-all text-[10px] font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addNewNotice}
                      className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow text-[10px] font-medium"
                    >
                      Post Notice
                    </button>
                  </div>
                </div >
              </div >

              {/* Notices List */}
              < div className="space-y-4" >
                <h3 className="text-[10px] font-bold text-gray-900">Recent Notices</h3>
                {
                  notices.map((notice) => (
                    <div key={notice.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 relative overflow-hidden group hover:shadow-md transition-all">
                      <div className={`absolute top-0 left-0 w-1 h-full ${getPriorityBadgeClass(notice.priority).replace('text-', 'bg-').replace('100', '500')}`}></div>
                      <div className="flex justify-between items-start mb-2 pl-2">
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{notice.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${getPriorityBadgeClass(notice.priority)}`}>
                              {notice.priority}
                            </span>
                            <span className="text-[9px] text-gray-500 flex items-center gap-1">
                              <Users className="w-2.5 h-2.5" />
                              {notice.audience}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] text-gray-500">{new Date().toLocaleDateString()}</p>
                          <p className="text-[9px] text-gray-400">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-[10px] pl-2 mb-3">{notice.content}</p>
                      <div className="flex justify-end gap-2 pl-2">
                        <button className="text-blue-600 hover:text-blue-800 text-[10px] font-medium flex items-center gap-1">
                          <Edit className="w-2.5 h-2.5" /> Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-[10px] font-medium flex items-center gap-1">
                          <Trash2 className="w-2.5 h-2.5" /> Delete
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div >
            </div >
          )}

          {/* Chatbot Tab */}
          {
            activeTab === 'chatbot' && (
              <div className="h-full flex flex-col">
                <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-md p-4 mb-4 shadow-sm backdrop-blur-sm border border-white/20 relative overflow-hidden -mt-5 flex-shrink-0">
                  <EnhancedEducationIllustration />
                  <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"></div>
                  <div className="absolute top-4 right-4 w-7 h-7 bg-white/10 rotate-45"></div>

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <h2 className="text-base font-bold text-white mb-1.5">AI Assistant</h2>
                      <p className="text-[10px] text-blue-100 mb-2">Get help with class management, lesson planning, and more</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-white/20 rounded-md p-2">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-grow bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <RoleChatbot role="teacher" />
                </div>
              </div>
            )
          }

          {/* Settings Tab */}
          {
            activeTab === 'settings' && (
              <div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="flex border-b border-gray-200">
                    <button
                      onClick={() => setSettingsTab('profile')}
                      className={`flex-1 py-3 text-[11px] font-medium text-center transition-colors ${settingsTab === 'profile' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      Profile Settings
                    </button>
                    <button
                      onClick={() => setSettingsTab('notifications')}
                      className={`flex-1 py-3 text-[11px] font-medium text-center transition-colors ${settingsTab === 'notifications' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      Notifications
                    </button>
                    <button
                      onClick={() => setSettingsTab('security')}
                      className={`flex-1 py-3 text-[11px] font-medium text-center transition-colors ${settingsTab === 'security' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      Security
                    </button>
                  </div>

                  <div className="p-6">
                    {settingsTab === 'profile' && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={teacherAvatar}
                              alt="Profile"
                              className="w-20 h-20 rounded-full object-cover border-4 border-blue-50"
                            />
                            <button
                              onClick={() => setShowAvatarModal(true)}
                              className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 transition-colors shadow-sm"
                            >
                              <Edit className="w-3 h-3" />
                            </button>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{teacherData.name}</h3>
                            <p className="text-gray-500 text-xs">{teacherData.subject} Teacher</p>
                            <p className="text-gray-500 text-xs">{teacherData.school}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Full Name</label>
                            <input
                              type="text"
                              value={profileData.name}
                              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[10px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Email Address</label>
                            <input
                              type="email"
                              value={profileData.email}
                              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[10px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-gray-700 mb-1.5">Subject</label>
                            <input
                              type="text"
                              value={profileData.subject}
                              onChange={(e) => setProfileData({ ...profileData, subject: e.target.value })}
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[10px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-gray-700 mb-1.5">School</label>
                            <input
                              type="text"
                              value={profileData.school}
                              onChange={(e) => setProfileData({ ...profileData, school: e.target.value })}
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[10px]"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs font-medium shadow-sm">
                            Save Changes
                          </button>
                        </div>
                      </div>
                    )}

                    {settingsTab === 'notifications' && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 mb-4">Notification Preferences</h3>
                        {['Email Notifications', 'Push Notifications', 'Weekly Reports', 'Student Alerts'].map((item, index) => (
                          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                            <div>
                              <p className="text-[11px] font-medium text-gray-900">{item}</p>
                              <p className="text-[9px] text-gray-500">Receive updates about {item.toLowerCase()}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    )}

                    {settingsTab === 'security' && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 mb-4">Security Settings</h3>
                        <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-between group">
                          <div>
                            <p className="text-[11px] font-medium text-gray-900">Change Password</p>
                            <p className="text-[9px] text-gray-500">Update your account password</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                        </button>
                        <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-between group">
                          <div>
                            <p className="text-[11px] font-medium text-gray-900">Two-Factor Authentication</p>
                            <p className="text-[9px] text-gray-500">Add an extra layer of security</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          }
        </div >
      </div >

      {/* Modals */}
      < AnimatePresence >
        {showAddStudentForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="font-bold text-gray-900">Add New Student</h3>
                <button onClick={closeAddStudentForm} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Student Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newStudent.name}
                    onChange={handleNewStudentChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                    placeholder="Enter student name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Roll Number</label>
                  <input
                    type="text"
                    name="roll"
                    value={newStudent.roll}
                    onChange={handleNewStudentChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                    placeholder="Enter roll number"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Class</label>
                  <select
                    name="class"
                    value={newStudent.class}
                    onChange={handleNewStudentChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  >
                    <option value="">Select Class</option>
                    {teacherData.classes.map((cls, index) => (
                      <option key={index} value={cls.name}>{cls.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Attendance Method</label>
                  <select
                    name="method"
                    value={newStudent.method}
                    onChange={handleNewStudentChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  >
                    <option value="Manual">Manual</option>
                    <option value="Face Scan">Face Scan</option>
                  </select>
                </div>
                <button
                  onClick={addNewStudent}
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs font-medium shadow-sm mt-2"
                >
                  Add Student
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {
          showAddClassForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50">
                  <h3 className="font-bold text-gray-900">Add New Class</h3>
                  <button onClick={() => setShowAddClassForm(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Class Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newClass.name}
                      onChange={handleNewClassChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                      placeholder="e.g., Class 10-A"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={newClass.subject}
                      onChange={handleNewClassChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                      placeholder="e.g., Mathematics"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Theme Color</label>
                    <select
                      name="color"
                      value={newClass.color}
                      onChange={handleNewClassChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                    >
                      <option value="blue">Blue</option>
                      <option value="purple">Purple</option>
                      <option value="green">Green</option>
                      <option value="orange">Orange</option>
                      <option value="pink">Pink</option>
                      <option value="cyan">Cyan</option>
                    </select>
                  </div>
                  <button
                    onClick={addNewClass}
                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs font-medium shadow-sm mt-2"
                  >
                    Create Class
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )
        }

        {
          showAddAssignmentForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50">
                  <h3 className="font-bold text-gray-900">Post New Assignment</h3>
                  <button onClick={() => setShowAddAssignmentForm(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Assignment Title</label>
                    <input
                      type="text"
                      name="title"
                      value={newAssignment.title}
                      onChange={handleNewAssignmentChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                      placeholder="Enter title"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={newAssignment.subject}
                      onChange={handleNewAssignmentChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                      placeholder="Enter subject"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Class</label>
                    <select
                      name="class"
                      value={newAssignment.class}
                      onChange={handleNewAssignmentChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                    >
                      <option value="">Select Class</option>
                      {teacherData.classes.map((cls, index) => (
                        <option key={index} value={cls.name}>{cls.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Due Date</label>
                    <input
                      type="date"
                      name="dueDate"
                      value={newAssignment.dueDate}
                      onChange={handleNewAssignmentChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={newAssignment.description}
                      onChange={handleNewAssignmentChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                      rows="3"
                      placeholder="Enter instructions"
                    />
                  </div>
                  <button
                    onClick={addNewAssignment}
                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs font-medium shadow-sm mt-2"
                  >
                    Post Assignment
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )
        }

        {
          showAvatarModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50">
                  <h3 className="font-bold text-gray-900">Choose Avatar</h3>
                  <button onClick={() => setShowAvatarModal(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-4 gap-4">
                    {['James', 'Sarah', 'Robert', 'Emily', 'Michael', 'Jessica', 'David', 'Jennifer'].map((seed, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setTeacherAvatar(`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`);
                          setShowAvatarModal(false);
                        }}
                        className="aspect-square rounded-full overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all"
                      >
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
                          alt={seed}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        }
      </AnimatePresence >
    </div >
  );
};

export default TeacherDashboard;
