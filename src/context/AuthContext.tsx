import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User } from '../types';
import { loginAPI } from '../api/loginAPI';
import { verifyTokenAPI } from '../api/verifyTokenAPI';
import { registerAPI } from '../api/registerAPI';
import { getCSRFTokenAPI } from '../api/getCSRFTokenAPI';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [user, setUser] = useState<any | null>({});

  useEffect(() => {
    const savedUser = JSON.parse(window.localStorage.getItem('currentUser') || '{}');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);


  const login = async (username: string, password: string): Promise<string | undefined> => {

    try {

      const token = await loginAPI({username , password });

     
      return token as string;

    } catch (error) {

      console.warn(error);
      return;
    }

  }

  const verifyToken = async (token:string) => {

    try {

      const result = await verifyTokenAPI(token);
      window.localStorage.setItem("userId",result.data?.userId);
      window.localStorage.setItem("role",result.data?.role);
      window.localStorage.setItem("email",result.data?.email);
      window.localStorage.setItem("profile",JSON.stringify(result.data?.profile));

      return result.data;

    } catch (error) {

      console.warn(error);
      return;
    }

  }


  const register = async function register(data: any) {
    try {
      const userData = await registerAPI(data);
      if (userData) {

        return true
      }

      return false
    } catch (error) {
      console.warn(error);

      return false
    }
  }

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem('currentUser');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      window.localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const getCSRFToken = async function getCSRFToken() {
    try {
      await getCSRFTokenAPI();
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      verifyToken,
      setUser,
      getCSRFToken,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};