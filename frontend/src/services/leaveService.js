import api from '../api/axios';

export const leaveService = {
  getAll: async (params) => {
    const response = await api.get('leave/', { params });
    return response.data;
  },

  applyLeave: async (data) => {
    const response = await api.post('leave/', data);
    return response.data;
  },

  approveLeave: async (id) => {
    const response = await api.patch(`leave/${id}/approve/`);
    return response.data;
  },

  rejectLeave: async (id, reason) => {
    const response = await api.patch(`leave/${id}/reject/`, { reason });
    return response.data;
  },

  getMyLeaves: async () => {
    const response = await api.get('leave/my-leaves/');
    return response.data;
  },

  getLeaveBalance: async () => {
    const response = await api.get('leave/balance/');
    return response.data;
  }
};
