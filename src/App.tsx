import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Toaster } from "sonner";

// Pages
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import AdminAuth from './pages/AdminAuth';
import RoomDetails from './pages/RoomDetails';
import { UserDashboard } from './pages/dashboard/user/UserDashboard';
import { AdminDashboard } from './pages/dashboard/admin/AdminDashboard';
import Searchs from './pages/Search';
import Webhook from './pages/Webhook';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRole?: 'user' | 'admin' }> = ({
  children,
  requiredRole
}) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const mountRef = useRef(true);
  const { getCSRFToken } = useAuth();

  useEffect(() => {
    if (mountRef.current) {
      getCSRFToken();
    }

    return () => {
      mountRef.current = false
    }
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/search" element={<Searchs />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin-auth" element={<AdminAuth />} />
          <Route path="/webhook" element={<Webhook />} />

          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute requiredRole="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Toaster />
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;