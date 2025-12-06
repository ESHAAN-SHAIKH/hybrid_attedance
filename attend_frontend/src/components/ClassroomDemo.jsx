import React from 'react';
import ClassroomCardsContainer from './ClassroomCardsContainer';
import UltraModernHeader from './UltraModernHeader';

const ClassroomDemo = () => {
  const handleAddClass = () => {
    alert('Add new class clicked!');
  };

  const handleCardClick = (classroom) => {
    alert(`Clicked on ${classroom.title}`);
  };

  const handleMenuClick = (classroom) => {
    alert(`Menu clicked for ${classroom.title}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <UltraModernHeader 
        dashboardTitle="Classroom Demo"
        userType="Teacher"
        userName="Dr. James Wilson"
        userRole="Mathematics Teacher"
        onLogout={() => console.log('Logout clicked')}
      />
      
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Classes</h1>
          <p className="text-gray-600">Browse and manage your classroom subjects</p>
        </div>
        
        <ClassroomCardsContainer 
          onAddClass={handleAddClass}
          onCardClick={handleCardClick}
          onMenuClick={handleMenuClick}
        />
      </div>
    </div>
  );
};

export default ClassroomDemo;