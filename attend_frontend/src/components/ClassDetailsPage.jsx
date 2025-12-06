import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, User, FileText, Play, MousePointerClick, Image, Volume2, Presentation, HelpCircle, ExternalLink, Calendar, Clock } from 'lucide-react';
import UltraModernHeader from './UltraModernHeader';

const ClassDetailsPage = () => {
  const navigate = useNavigate();
  const { classId } = useParams();
  const [classData, setClassData] = useState(null);
  
  // Mock class data - in a real app, this would come from an API or context
  const mockClasses = [
    { 
      id: '0',
      name: 'Class 10-A', 
      subject: 'History', 
      color: 'blue',
      teacher: 'Mr. Anderson',
      teacherAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Anderson&backgroundColor=4f46e5&radius=50`,
      resources: [
        { name: 'History Textbook Chapter 1-5', type: 'PDF', url: '#' },
        { name: 'World War II Documentary', type: 'Video', url: '#' },
        { name: 'Ancient Civilizations Quiz', type: 'Interactive', url: '#' },
        { name: 'Historical Maps Collection', type: 'Image', url: '#' }
      ]
    },
    { 
      id: '1',
      name: 'Class 11-B', 
      subject: 'Geography', 
      color: 'green',
      teacher: 'Ms. Roberts',
      teacherAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Roberts&backgroundColor=10b981&radius=50`,
      resources: [
        { name: 'Physical Geography Notes', type: 'PDF', url: '#' },
        { name: 'Climate Change Presentation', type: 'Slides', url: '#' },
        { name: 'Topographic Map Analysis', type: 'Interactive', url: '#' },
        { name: 'World Geography Quiz', type: 'Quiz', url: '#' }
      ]
    },
    { 
      id: '2',
      name: 'Class 12-C', 
      subject: 'Science', 
      color: 'purple',
      teacher: 'Dr. Chen',
      teacherAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Chen&backgroundColor=8b5cf6&radius=50`,
      resources: [
        { name: 'Chemistry Lab Manual', type: 'PDF', url: '#' },
        { name: 'Physics Equations Sheet', type: 'Document', url: '#' },
        { name: 'Biology Cell Structure', type: 'Interactive', url: '#' },
        { name: 'Science Fair Project Ideas', type: 'Guide', url: '#' }
      ]
    },
    { 
      id: '3',
      name: 'Class 9-D', 
      subject: 'English', 
      color: 'indigo',
      teacher: 'Mrs. Johnson',
      teacherAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Johnson&backgroundColor=6366f1&radius=50`,
      resources: [
        { name: 'Shakespeare Study Guide', type: 'PDF', url: '#' },
        { name: 'Grammar Rules Handbook', type: 'Document', url: '#' },
        { name: 'Poetry Analysis Techniques', type: 'Interactive', url: '#' },
        { name: 'Creative Writing Prompts', type: 'Guide', url: '#' }
      ]
    },
    { 
      id: '4',
      name: 'Class 8-E', 
      subject: 'Art', 
      color: 'cyan',
      teacher: 'Mr. Williams',
      teacherAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Williams&backgroundColor=06b6d4&radius=50`,
      resources: [
        { name: 'Color Theory Basics', type: 'PDF', url: '#' },
        { name: 'Famous Artists Gallery', type: 'Image', url: '#' },
        { name: 'Drawing Techniques Tutorial', type: 'Video', url: '#' },
        { name: 'Art History Timeline', type: 'Interactive', url: '#' }
      ]
    },
    { 
      id: '5',
      name: 'Class 7-F', 
      subject: 'Music', 
      color: 'amber',
      teacher: 'Ms. Davis',
      teacherAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Davis&backgroundColor=f59e0b&radius=50`,
      resources: [
        { name: 'Music Theory Fundamentals', type: 'PDF', url: '#' },
        { name: 'Instrument Families Guide', type: 'Document', url: '#' },
        { name: 'Classical Music Playlist', type: 'Audio', url: '#' },
        { name: 'Musical Notation Practice', type: 'Interactive', url: '#' }
      ]
    }
  ];
  
  useEffect(() => {
    // Find the class data based on the classId parameter
    const foundClass = mockClasses.find(cls => cls.id === classId);
    if (foundClass) {
      setClassData(foundClass);
    } else {
      // If class not found, redirect to home
      navigate('/');
    }
  }, [classId, navigate]);
  
  if (!classData) {
    return <div>Loading...</div>;
  }
  // Mock data for class schedule and upcoming assignments
  const classSchedule = [
    { day: 'Monday', time: '9:00 AM - 10:30 AM', room: 'Room 201' },
    { day: 'Wednesday', time: '11:00 AM - 12:30 PM', room: 'Room 201' },
    { day: 'Friday', time: '2:00 PM - 3:30 PM', room: 'Room 201' }
  ];

  const upcomingAssignments = [
    { title: 'Chapter 5 Exercises', dueDate: '2024-04-17', priority: 'high' },
    { title: 'Research Paper', dueDate: '2024-04-22', priority: 'medium' },
    { title: 'Group Project', dueDate: '2024-04-30', priority: 'low' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-0 md:p-4">
      <div className="max-w-full mx-auto h-screen flex flex-col">
        {/* Ultra Modern Header */}
        <div className="flex-shrink-0">
          <UltraModernHeader 
            dashboardTitle={`${classData.subject} - ${classData.name}`}
            userType="Class Details"
            userName={classData.teacher}
            userRole={`${classData.subject} Teacher`}
            onLogout={() => navigate('/')}
          />
        </div>
        
        {/* Back Button - Hidden in full screen mode, visible in popup */}
        <button 
          onClick={() => window.close()}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 m-4 md:m-6 self-start"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Close Window</span>
        </button>

        {/* Class Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600 rounded-none md:rounded-xl p-6 mb-6 shadow-lg backdrop-blur-sm border border-white/20 relative overflow-hidden flex-grow-0">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-xl p-3">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{classData.subject}</h1>
                <p className="text-blue-100 text-lg">{classData.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 ml-auto">
              <img 
                src={classData.teacherAvatar} 
                alt={classData.teacher} 
                className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
              />
              <div>
                <p className="text-white font-medium">{classData.teacher}</p>
                <p className="text-blue-100 text-sm">Instructor</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow px-4 md:px-0">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Class Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Class Overview</h2>
              <p className="text-sm text-gray-600 mb-6">
                Welcome to {classData.subject}! This course covers fundamental concepts and practical applications 
                in the field. Throughout this semester, you'll explore key topics, engage in hands-on activities, 
                and develop critical thinking skills essential for your academic journey.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-900">Schedule</span>
                  </div>
                  <p className="text-sm text-gray-600">3 sessions per week</p>
                </div>
                
                <div className="bg-indigo-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <span className="font-medium text-gray-900">Duration</span>
                  </div>
                  <p className="text-sm text-gray-600">90 minutes per session</p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-gray-900">Students</span>
                  </div>
                  <p className="text-sm text-gray-600">28 enrolled</p>
                </div>
              </div>
            </div>

            {/* Study Resources */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Study Resources</h2>
              <p className="text-sm text-gray-600 mb-4">Access materials, videos, and interactive content for this subject.</p>
              
              <div className="space-y-4">
                {classData.resources.map((resource, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                          {resource.type === 'PDF' && <FileText className="w-6 h-6 text-blue-600" />}
                          {resource.type === 'Video' && <Play className="w-6 h-6 text-blue-600" />}
                          {resource.type === 'Interactive' && <MousePointerClick className="w-6 h-6 text-blue-600" />}
                          {resource.type === 'Image' && <Image className="w-6 h-6 text-blue-600" />}
                          {resource.type === 'Audio' && <Volume2 className="w-6 h-6 text-blue-600" />}
                          {resource.type === 'Document' && <FileText className="w-6 h-6 text-blue-600" />}
                          {resource.type === 'Slides' && <Presentation className="w-6 h-6 text-blue-600" />}
                          {resource.type === 'Quiz' && <HelpCircle className="w-6 h-6 text-blue-600" />}
                          {resource.type === 'Guide' && <BookOpen className="w-6 h-6 text-blue-600" />}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{resource.name}</h3>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{resource.type}</span>
                        </div>
                      </div>
                      <button 
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                        onClick={() => window.open(resource.url, '_blank')}
                      >
                        Open <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Class Schedule */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-md font-bold text-gray-900 mb-4">Class Schedule</h2>
              <div className="space-y-4">
                {classSchedule.map((schedule, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-blue-100 text-blue-800 rounded-lg px-3 py-1 text-sm font-medium">
                      {schedule.day}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{schedule.time}</p>
                      <p className="text-xs text-gray-500">{schedule.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Assignments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-md font-bold text-gray-900 mb-4">Upcoming Assignments</h2>
              <div className="space-y-3">
                {upcomingAssignments.map((assignment, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-900 text-sm">{assignment.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">Due: {assignment.dueDate}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        assignment.priority === 'high' ? 'bg-red-100 text-red-800' :
                        assignment.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {assignment.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailsPage;