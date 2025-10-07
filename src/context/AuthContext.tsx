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
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);


  const login = async (username: string, password: string): Promise<boolean> => {

    try {

      const result = await loginAPI({username , password });

     
      return result;

    } catch (error) {

      console.warn(error);
      return false
    }

  }

  const verifyToken = async (): Promise<boolean> => {

    try {

      const result = await verifyTokenAPI();
      window.localStorage.setItem("userId",result.data?.userId);
      window.localStorage.setItem("userId",result.data?.role);
      window.localStorage.setItem("userId",result.data?.email);
      window.localStorage.setItem("userId",JSON.stringify(result.data?.profile));

      return result;

    } catch (error) {

      console.warn(error);
      return false
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
    localStorage.removeItem('currentUser');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
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