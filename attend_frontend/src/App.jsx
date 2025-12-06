import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './components/ThemeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LandingPage from './components/landing/LandingPage';
import RegistrationPage from './components/landing/RegistrationPage';
import LoginPage from './components/LoginPage';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import SimplifiedStudentDashboard from './components/teacher/SimplifiedStudentDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import GovernmentDashboard from './components/government/GovernmentDashboard';
import ClassDetailsPage from './components/ClassDetailsPage';
import './i18n';
import './App.css';
import './index.css';

function App() {
    return (
        <Router>
            <GoogleOAuthProvider clientId="590317163674-rrj6uvnklsehhuubnkhho19tno9uff20.apps.googleusercontent.com">
                <AuthProvider>
                    <ThemeProvider>
                        <div className="w-full">
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/register" element={<RegistrationPage />} />
                                <Route path="/login" element={<LoginPage />} />

                                {/* Protected Routes */}
                                <Route
                                    path="/teacher/*"
                                    element={
                                        <ProtectedRoute allowedRoles={['teacher']}>
                                            <TeacherDashboard />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/student/*"
                                    element={
                                        <ProtectedRoute allowedRoles={['student']}>
                                            <SimplifiedStudentDashboard />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/admin/*"
                                    element={
                                        <ProtectedRoute allowedRoles={['admin']}>
                                            <AdminDashboard />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/government/*"
                                    element={
                                        <ProtectedRoute allowedRoles={['government']}>
                                            <GovernmentDashboard />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/class/:classId"
                                    element={
                                        <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                                            <ClassDetailsPage />
                                        </ProtectedRoute>
                                    }
                                />

                                {/* Catch all - redirect to landing */}
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </div>
                    </ThemeProvider>
                </AuthProvider>
            </GoogleOAuthProvider>
        </Router>
    );
}

export default App;
