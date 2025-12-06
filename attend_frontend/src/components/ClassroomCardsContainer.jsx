import React from 'react';
import ClassroomCard from './ClassroomCard';
import { Plus } from 'lucide-react';

// Custom CSS for hiding scrollbar and animations
const customStyles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  .animate-pulse {
    animation: pulse 2s infinite;
  }
`;

// Inject custom styles
const styleSheet = document.createElement("style");
styleSheet.innerText = customStyles;
document.head.appendChild(styleSheet);

const ClassroomCardsContainer = ({ classrooms = [], onAddClass, onCardClick, onMenuClick }) => {
  // Default classroom data if none provided
  const defaultClassrooms = [
    {
      id: 1,
      title: "Mathematics",
      subtitle: "Class 10-A • 2024-25",
      teacher: "Dr. James Wilson",
      theme: "blue"
    },
    {
      id: 2,
      title: "Science",
      subtitle: "Class 10-A • 2024-25",
      teacher: "Dr. James Wilson",
      theme: "green"
    },
    {
      id: 3,
      title: "English",
      subtitle: "Class 10-A • 2024-25",
      teacher: "Dr. James Wilson",
      theme: "teal"
    },
    {
      id: 4,
      title: "History",
      subtitle: "Class 10-A • 2024-25",
      teacher: "Dr. James Wilson",
      theme: "purple"
    },
    {
      id: 5,
      title: "Art",
      subtitle: "Class 10-A • 2024-25",
      teacher: "Dr. James Wilson",
      theme: "indigo"
    },
    {
      id: 6,
      title: "Physical Education",
      subtitle: "Class 10-A • 2024-25",
      teacher: "Dr. James Wilson",
      theme: "amber"
    }
  ];

  const classroomData = classrooms.length > 0 ? classrooms : defaultClassrooms;

  return (
    <div className="relative">
      {/* Classroom cards container */}
      <div className="overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
        <div className="flex gap-5 min-w-max md:grid md:grid-cols-2 lg:grid-cols-3 md:min-w-full md:gap-6">
          {classroomData.map((classroom) => (
            <ClassroomCard
              key={classroom.id}
              title={classroom.title}
              subtitle={classroom.subtitle}
              teacher={classroom.teacher}
              theme={classroom.theme}
              onClick={() => onCardClick && onCardClick(classroom)}
              onMenuClick={() => onMenuClick && onMenuClick(classroom)}
            />
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={onAddClass}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg hover:shadow-xl flex items-center justify-center text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 z-10 animate-pulse"
        aria-label="Add new class"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ClassroomCardsContainer;