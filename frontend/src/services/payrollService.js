import api from '../api/axios';

export const payrollService = {
  getAll: async (params) => {
    const response = await api.get('payroll/', { params });
    return response.data;
  },

  generatePayroll: async (data) => {
    const response = await api.post('payroll/generate/', data);
    return response.data;
  },

  getSalarySlip: async (id) => {
    const response = await api.get(`payroll/${id}/salary-slip/`);
    return response.data;
  },

  getMyPayroll: async () => {
    const response = await api.get('payroll/my-payroll/');
    return response.data;
  }
};
