import api from '../api/axios';

export const attendanceService = {
  getAll: async (params) => {
    const response = await api.get('attendance/', { params });
    return response.data;
  },

  checkIn: async () => {
    const response = await api.post('attendance/check-in/');
    return response.data;
  },

  checkOut: async () => {
    const response = await api.post('attendance/check-out/');
    return response.data;
  },

  getMyAttendance: async () => {
    const response = await api.get('attendance/my-attendance/');
    return response.data;
  }
};
