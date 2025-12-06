import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { School } from 'lucide-react';

const RegistrationPage = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [language, setLanguage] = useState('english');
    const [isAnimating, setIsAnimating] = useState(true);
    const [formData, setFormData] = useState({
        schoolName: '',
        schoolEmail: '',
        password: '',
        location: '',
        totalStudents: '',
        totalClasses: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        const totalStudents = parseInt(formData.totalStudents);
        const totalClasses = parseInt(formData.totalClasses);

        if (totalStudents < 1 || totalStudents > 600) {
            alert('Total number of students must be between 1 and 600');
            return;
        }
        if (totalClasses < 2 || totalClasses > 20) {
            alert('Total number of classes must be between 2 and 20');
            return;
        }

        register(formData);
    };

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #E3F2FD, #ffffff)' }}>
            <header className="shadow-sm" style={{ backgroundColor: '#0E61E7' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
                        <School className="w-8 h-8 text-white" />
                        <span className="text-2xl font-bold text-white">SchoolHub</span>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className={`${isAnimating ? 'animate-fadeInUp' : ''}`}>
                    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                        <div className="text-center mb-8">
                            <School className="w-16 h-16 mx-auto mb-4" style={{ color: '#0E61E7' }} />
                            <h1 className="text-4xl font-bold mb-2" style={{ color: '#0E61E7' }}>School Registration</h1>
                            <p className="text-gray-600 text-lg">Join SchoolHub and transform your school management</p>
                        </div>

                        <form onSubmit={handleSignUp} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ color: '#0E61E7' }}>School Name:</label>
                                <input
                                    type="text"
                                    name="schoolName"
                                    value={formData.schoolName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2"
                                    style={{ borderColor: '#0E61E7', color: '#0E61E7' }}
                                    placeholder="Enter school name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ color: '#0E61E7' }}>School Email:</label>
                                <input
                                    type="email"
                                    name="schoolEmail"
                                    value={formData.schoolEmail}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2"
                                    style={{ borderColor: '#0E61E7', color: '#0E61E7' }}
                                    placeholder="Enter school email"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ color: '#0E61E7' }}>Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2"
                                    style={{ borderColor: '#0E61E7', color: '#0E61E7' }}
                                    placeholder="Enter password"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ color: '#0E61E7' }}>Location:</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2"
                                    style={{ borderColor: '#0E61E7', color: '#0E61E7' }}
                                    placeholder="Enter school location"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ color: '#0E61E7' }}>Total No. of Students:</label>
                                <input
                                    type="number"
                                    name="totalStudents"
                                    value={formData.totalStudents}
                                    onChange={handleInputChange}
                                    required
                                    min="1"
                                    max="600"
                                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2"
                                    style={{ borderColor: '#0E61E7', color: '#0E61E7' }}
                                    placeholder="Enter total number of students (1-600)"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ color: '#0E61E7' }}>Total No. of Classes:</label>
                                <input
                                    type="number"
                                    name="totalClasses"
                                    value={formData.totalClasses}
                                    onChange={handleInputChange}
                                    required
                                    min="2"
                                    max="20"
                                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2"
                                    style={{ borderColor: '#0E61E7', color: '#0E61E7' }}
                                    placeholder="Enter total number of classes (2-20)"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 text-white font-semibold text-lg rounded-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
                                style={{ backgroundColor: '#0E61E7' }}
                            >
                                Sign Up
                            </button>

                            <div className="text-center py-3">
                                <p className="text-gray-600">
                                    Already registered?{' '}
                                    <button
                                        type="button"
                                        onClick={() => navigate('/login')}
                                        className="text-blue-600 font-semibold hover:underline"
                                    >
                                        Login Here
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
        </div>
    );
};

export default RegistrationPage;
