import React from 'react';
import EnhancedClassroomCard from './EnhancedClassroomCard';

const EnhancedClassroomCardsDemo = () => {
  const classrooms = [
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

  const handleMenuClick = (classroom) => {
    alert(`Menu options for ${classroom.title}`);
  };

  const handleCardClick = (classroom) => {
    alert(`Opening ${classroom.title} class`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Enhanced Classroom Cards Demo</h1>
        <p className="text-gray-600">Educational card blocks with prominent stationery items</p>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Classes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((classroom) => (
            <EnhancedClassroomCard
              key={classroom.id}
              title={classroom.title}
              subtitle={classroom.subtitle}
              teacher={classroom.teacher}
              theme={classroom.theme}
              onClick={() => handleCardClick(classroom)}
              onMenuClick={() => handleMenuClick(classroom)}
            />
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Single Card Examples</h2>
        <div className="flex flex-wrap gap-6">
          <EnhancedClassroomCard
            title="Mathematics"
            subtitle="Class 10-A • 2024-25"
            teacher="Dr. James Wilson"
            theme="blue"
          />
          <EnhancedClassroomCard
            title="Science Lab"
            subtitle="Class 10-A • 2024-25"
            teacher="Dr. James Wilson"
            theme="green"
          />
          <EnhancedClassroomCard
            title="English Literature"
            subtitle="Class 10-A • 2024-25"
            teacher="Dr. James Wilson"
            theme="teal"
          />
        </div>
      </div>
    </div>
  );
};

export default EnhancedClassroomCardsDemo;