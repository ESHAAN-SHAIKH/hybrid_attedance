import React from 'react';
import EnhancedClassroomCardsDemo from './EnhancedClassroomCardsDemo';

const ClassroomCardsShowcase = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Classroom Cards Showcase</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enhanced classroom cards with prominent display of stationery items like books, scales, pens, and rulers
          </p>
        </div>
        
        <EnhancedClassroomCardsDemo />
      </div>
    </div>
  );
};

export default ClassroomCardsShowcase;