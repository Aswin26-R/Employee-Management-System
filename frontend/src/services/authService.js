import api from '../api/axios';
import { storage } from '../utils/storage';

export const authService = {
  login: async (username, password) => {
    const response = await api.post('token/', { username, password });
    const { access, refresh } = response.data;
    storage.setAccessToken(access);
    if (refresh) storage.setRefreshToken(refresh);
    
    // Fetch profile right after login to get user details & role
    const profileRes = await api.get('accounts/profile/');
    const user = profileRes.data;
    storage.setUser(user);
    return { token: access, user };
  },

  logout: () => {
    storage.clearAuth();
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('accounts/profile/');
      storage.setUser(response.data);
      return response.data;
    } catch {
      return storage.getUser();
    }
  },

  changePassword: async (data) => {
    const response = await api.post('accounts/change-password/', data);
    return response.data;
  }
};