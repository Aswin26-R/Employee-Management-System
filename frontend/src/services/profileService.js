import api from '../api/axios';

export const profileService = {
  getProfile: async () => {
    const response = await api.get('accounts/profile/');
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.patch('accounts/profile/', data);
    return response.data;
  }
};