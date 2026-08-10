import api from '../api/axios';

export const dashboardService = {
  getTotalEmployees: async () => {
    const response = await api.get('dashboard/total-employees/');
    return response.data;
  },

  getTotalDepartments: async () => {
    const response = await api.get('dashboard/total-departments/');
    return response.data;
  },

  getPresentToday: async () => {
    const response = await api.get('dashboard/present-today/');
    return response.data;
  },

  getPendingLeaves: async () => {
    const response = await api.get('dashboard/pending-leaves/');
    return response.data;
  },

  getPayrollSummary: async () => {
    const response = await api.get('dashboard/payroll-summary/');
    return response.data;
  }
};
