import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, MapPin, Eye, EyeOff, Building } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { verifyTokenAPI } from '../api/verifyTokenAPI';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, register, verifyToken, setUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    phone: '',
    address: '',
    localGovt: '',
    state: '',
    country: 'Nigeria'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        const token = await login(formData.username, formData.password);
        console.log(token);
        if (token) {
          toast("User authenticated. Wailting for verification...");
          // const user = await verifyToken(token);
          const user = await verifyTokenAPI(token);

          console.log(user);

          if (user) {
            setUser(user);
            window.localStorage.setItem('currentUser', JSON.stringify(user));
            toast("User verified successfully.");

            navigate('/user-dashboard');
          } else {
            // alert('Invalid verification credentials');
            toast("Invalid verification credentials.")
          }
        } else {
          // alert('Invalid login credentials.');
          toast("Invalid login credentials.")
        }

      } else {
        const success = await register({
          name: formData.name,
          username: formData.username,
          password: formData.password,
          phone: formData.phone,
          address: formData.address,
          localGovt: formData.localGovt,
          state: formData.state,
          country: formData.country,
          role: 'user',
        });
        if (success === true) {

          toast("Registration successful.");
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast("Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const nigerianStates = [
    'Lagos', 'Abuja', 'Kano', 'Kaduna', 'Rivers', 'Oyo', 'Ogun', 'Imo', 'Anambra', 'Enugu',
    'Delta', 'Edo', 'Cross River', 'Akwa Ibom', 'Bayelsa', 'Benue', 'Kogi', 'Nasarawa',
    'Plateau', 'Taraba', 'Adamawa', 'Bauchi', 'Borno', 'Gombe', 'Yobe', 'Jigawa',
    'Katsina', 'Kebbi', 'Sokoto', 'Zamfara', 'Niger', 'Kwara', 'Ondo', 'Ekiti', 'Osun', 'Abia'
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
            <Building className="h-10 w-10 text-blue-600" />
            <span className="font-bold text-2xl text-gray-900">HostelHub</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin
              ? 'Sign in to access your student dashboard'
              : 'Join thousands of students finding their perfect accommodation'
            }
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-8">
          {/* Toggle Buttons */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${isLogin
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${!isLogin
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Registration Fields */}
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    autoComplete='new-name'
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  autoComplete='new-email'
                  id="username"
                  name="username"
                  type="email"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              {isLogin && (
                <p className="mt-1 text-xs text-gray-500">
                  Try: john@student.edu or admin@hostel.com
                </p>
              )}
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
                  placeholder="Enter your password"
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

            {/* Additional Registration Fields */}
            {!isLogin && (
              <>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        autoComplete='new-phone'
                        id="phone"
                        name="phone"
                        type="tel"
                        required={!isLogin}
                        value={formData.phone}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+234 xxx xxx xxxx"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        autoComplete='new-address'
                        id="address"
                        name="address"
                        type="text"
                        required={!isLogin}
                        value={formData.address}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="localGovt" className="block text-sm font-medium text-gray-700 mb-2">
                        Local Government
                      </label>
                      <input
                        autoComplete='new-local-government'
                        id="localGovt"
                        name="localGovt"
                        type="text"
                        required={!isLogin}
                        value={formData.localGovt}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="LGA"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <select
                        id="state"
                        name="state"
                        required={!isLogin}
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select State</option>
                        {nigerianStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>

            {isLogin && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link
                  to="/admin-auth"
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  Admin Login →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Demo Credentials */}
        {isLogin && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
            <h3 className="font-medium text-blue-900 mb-2">Demo Credentials:</h3>
            <p className="text-blue-700">
              <strong>Student:</strong> john@student.edu<br />
              <strong>Admin:</strong> admin@hostel.com<br />
              <strong>Password:</strong> any password works
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;