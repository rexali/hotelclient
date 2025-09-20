import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building, Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminAuth: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, verifyToken, setUser } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {

      const success = await login(formData.username, formData.password);
      if (success) {
        const user = await verifyToken();
        setUser(user)
        if (user) {
          window.localStorage.setItem('currentUser', JSON.stringify(user))
          navigate('/admin-dashboard');
        } else {
          alert('Invalid verification credentials');
        }
      } else {
        alert('Invalid login credentials.');
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
            <Building className="h-10 w-10 text-white" />
            <span className="font-bold text-2xl text-white">HostelHub</span>
          </Link>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">
            Admin Portal
          </h2>
          <p className="mt-2 text-sm text-blue-100">
            Sign in to access the administrative dashboard
          </p>
        </div>

        <div className="bg-white shadow-2xl rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  autoComplete='new-email'
                  id="username"
                  name="username"
                  type="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter admin email"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Try: admin@hostel.com
              </p>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  autoComplete='new-password'
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-12 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Sign In to Admin Portal'
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center">
            <div className="space-y-2">
              <Link
                to="/auth"
                className="block text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                ← Back to Student Login
              </Link>
              <Link
                to="/"
                className="block text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg p-4 text-sm">
          <div className="flex items-center space-x-2 text-white">
            <Shield className="h-4 w-4" />
            <span className="font-medium">Secure Admin Access</span>
          </div>
          <p className="text-blue-100 mt-2">
            This portal is restricted to authorized administrators only. All activities are monitored and logged.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;