import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
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
import ErrorBoundary from './components/common/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import HotelDetails from './components/hotel/HotelDetails';
import ChangePasswordPage from './components/auth/ChangePasswordPage';
import ForgetPasswordPage from './components/auth/ForgetPasswordPage';
import ConfirmRegistrationPage from './components/auth/ConfirmRegistrationPage';

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/search" element={<Searchs />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin-auth" element={<AdminAuth />} />
          <Route path="/webhook" element={<Webhook />} />
          <Route path="/forget-password" element={<ForgetPasswordPage onNavigate={undefined} />} />
          <Route path="/change-password" element={<ChangePasswordPage onNavigate={undefined} />} />
          <Route path="/confirm-registration" element={<ConfirmRegistrationPage onNavigate={undefined} />} />
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
      <Toaster position='top-center' theme='dark' />
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
};

export default App;