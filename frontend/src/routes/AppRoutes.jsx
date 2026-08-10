import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../components/layout/MainLayout';

// Auth Page
import Login from '../pages/auth/Login';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import AdminEmployees from '../pages/admin/Employees';
import AdminDepartments from '../pages/admin/Departments';
import AdminAttendance from '../pages/admin/Attendance';
import AdminLeave from '../pages/admin/Leave';
import AdminPayroll from '../pages/admin/Payroll';
import AdminReports from '../pages/admin/Reports';
import AdminSettings from '../pages/admin/Settings';

// HR Pages
import HRDashboard from '../pages/hr/Dashboard';
import HREmployees from '../pages/hr/Employees';
import HRAttendance from '../pages/hr/Attendance';
import HRLeave from '../pages/hr/Leave';
import HRPayroll from '../pages/hr/Payroll';

// Employee Pages
import EmployeeDashboard from '../pages/employee/Dashboard';
import EmployeeProfile from '../pages/employee/Profile';
import EmployeeAttendance from '../pages/employee/Attendance';
import EmployeeLeave from '../pages/employee/Leave';
import EmployeeSalarySlip from '../pages/employee/SalarySlip';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Auth Route */}
      <Route path="/" element={<Login />} />

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
        <Route element={<MainLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/employees" element={<AdminEmployees />} />
          <Route path="/admin/departments" element={<AdminDepartments />} />
          <Route path="/admin/attendance" element={<AdminAttendance />} />
          <Route path="/admin/leave" element={<AdminLeave />} />
          <Route path="/admin/payroll" element={<AdminPayroll />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Route>

      {/* HR Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['HR', 'Admin']} />}>
        <Route element={<MainLayout />}>
          <Route path="/hr/dashboard" element={<HRDashboard />} />
          <Route path="/hr/employees" element={<HREmployees />} />
          <Route path="/hr/attendance" element={<HRAttendance />} />
          <Route path="/hr/leave" element={<HRLeave />} />
          <Route path="/hr/payroll" element={<HRPayroll />} />
        </Route>
      </Route>

      {/* Employee Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['Employee', 'HR', 'Admin']} />}>
        <Route element={<MainLayout />}>
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/profile" element={<EmployeeProfile />} />
          <Route path="/employee/attendance" element={<EmployeeAttendance />} />
          <Route path="/employee/leave" element={<EmployeeLeave />} />
          <Route path="/employee/salary-slip" element={<EmployeeSalarySlip />} />
        </Route>
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;