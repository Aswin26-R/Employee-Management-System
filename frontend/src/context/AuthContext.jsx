import { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { storage } from '../utils/storage';
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

const normalizeRole = (role) => {
  if (!role) return 'Employee';
  const normalized = role.toString().trim().toUpperCase();
  if (normalized === 'ADMIN') return 'Admin';
  if (normalized === 'HR') return 'HR';
  return 'Employee';
};

const normalizeUser = (userData) => {
  if (!userData) return null;
  return {
    ...userData,
    role: normalizeRole(userData.role || userData.user_type)
  };
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const initAuth = async () => {
      const token = storage.getAccessToken();
      if (token) {
        try {
          const userData = await authService.getCurrentUser();
          if (isMounted) setUser(normalizeUser(userData));
        } catch {
          storage.clearAuth();
          if (isMounted) setUser(null);
        }
      } else {
        if (isMounted) setUser(null);
      }
      if (isMounted) setLoading(false);
    };

    initAuth();
    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (username, password) => {
    try {
      const { user: userData } = await authService.login(username, password);
      const normalizedUser = normalizeUser(userData);
      setUser(normalizedUser);
      toast.success('Successfully logged in!');
      return normalizedUser;
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Invalid username or password';
      toast.error(errorMsg);
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateUser = (updatedData) => {
    setUser((prev) => {
      const newUser = { ...prev, ...updatedData };
      storage.setUser(newUser);
      return newUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || user?.user_type || 'Employee',
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
