import { useState, useEffect } from 'react';
import Button from '../../components/common/Button';

import AttendanceChart from '../../components/dashboard/AttendanceChart';
import SalaryChart from '../../components/dashboard/SalaryChart';
import DepartmentChart from '../../components/dashboard/DepartmentChart';

import { Download, FileText } from 'lucide-react';
import { exportToCSV, printElement, formatCurrency } from '../../utils/helpers';
import toast from 'react-hot-toast';

import api from '../../api/axios';

const AdminReports = () => {
  const [reportType, setReportType] = useState('attendance');

  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [payroll, setPayroll] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    setLoading(true);

    try {
      const [
        employeesResponse,
        attendanceResponse,
        payrollResponse,
        departmentsResponse
      ] = await Promise.all([
        api.get('employees/'),
        api.get('attendance/'),
        api.get('payroll/'),
        api.get('departments/')
      ]);

      setEmployees(
        Array.isArray(employeesResponse.data)
          ? employeesResponse.data
          : employeesResponse.data.results || []
      );

      setAttendance(
        Array.isArray(attendanceResponse.data)
          ? attendanceResponse.data
          : attendanceResponse.data.results || []
      );

      setPayroll(
        Array.isArray(payrollResponse.data)
          ? payrollResponse.data
          : payrollResponse.data.results || []
      );

      setDepartments(
        Array.isArray(departmentsResponse.data)
          ? departmentsResponse.data
          : departmentsResponse.data.results || []
      );

    } catch (error) {
      console.error('Failed to load report data:', error);
      toast.error('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // ATTENDANCE REPORT
  // --------------------------------

  const getAttendanceRate = (employee) => {
    const employeeAttendance = attendance.filter(
      (record) =>
        record.employee === employee.id ||
        record.employee_id === employee.id
    );

    if (employeeAttendance.length === 0) {
      return 0;
    }

    const presentDays = employeeAttendance.filter(
      (record) =>
        record.status?.toLowerCase() === 'present'
    ).length;

    return Math.round(
      (presentDays / employeeAttendance.length) * 100
    );
  };

  // --------------------------------
  // PAYROLL REPORT
  // --------------------------------

  const getPayrollForEmployee = (employee) => {
    return payroll.find(
      (record) =>
        record.employee === employee.id ||
        record.employee_id === employee.id
    );
  };

  // --------------------------------
  // CSV DATA
  // --------------------------------

  const getReportData = () => {
    if (reportType === 'attendance') {
      return employees.map((employee) => ({
        name:
          employee.user?.first_name ||
          employee.first_name ||
          employee.employee_name ||
          'Employee',

        employee_id: employee.employee_id,

        department:
          employee.department_name ||
          employee.department?.name ||
          'N/A',

        attendanceRate: `${getAttendanceRate(employee)}%`
      }));
    }

    if (reportType === 'payroll') {
      return payroll.map((record) => ({
        name: record.employee_name || 'Employee',

        employee_id:
          record.employee_id || 'N/A',

        department:
          record.department || 'N/A',

        basic_salary: formatCurrency(record.basic_salary),

        hra: formatCurrency(record.hra),

        allowance: formatCurrency(record.allowance),

        deductions: formatCurrency(record.deductions),

        net_salary: formatCurrency(record.net_salary),

        month: `${record.month || ''} ${record.year || ''}`.trim()
      }));
    }

    if (reportType === 'department') {
      return departments.map((department) => {
        const departmentEmployees = employees.filter(
          (employee) =>
            employee.department === department.id ||
            employee.department?.id === department.id
        );

        return {
          department:
            department.name || 'Department',

          employeeCount:
            departmentEmployees.length,

          totalSalary:
            formatCurrency(
              departmentEmployees.reduce(
                (total, employee) =>
                  total + Number(employee.salary || 0),
                0
              )
            )
        };
      });
    }

    return [];
  };

  // --------------------------------
  // DOWNLOAD CSV
  // --------------------------------

  const handleDownloadCSV = () => {
    const data = getReportData();

    if (data.length === 0) {
      toast.error('No report data available');
      return;
    }

    let headers = {};

    if (reportType === 'attendance') {
      headers = {
        name: 'Employee Name',
        employee_id: 'Employee ID',
        department: 'Department',
        attendanceRate: 'Attendance Rate'
      };
    }

    if (reportType === 'payroll') {
      headers = {
        name: 'Employee Name',
        employee_id: 'Employee ID',
        department: 'Department',
        basic_salary: 'Basic Salary',
        hra: 'HRA',
        allowance: 'Allowance',
        deductions: 'Deductions',
        net_salary: 'Net Salary',
        month: 'Pay Period'
      };
    }

    if (reportType === 'department') {
      headers = {
        department: 'Department',
        employeeCount: 'Employee Count',
        totalSalary: 'Total Salary'
      };
    }

    exportToCSV(
      `system_${reportType}_report.csv`,
      data,
      headers
    );

    toast.success(
      `${reportType.toUpperCase()} report downloaded`
    );
  };

  // --------------------------------
  // ATTENDANCE TABLE
  // --------------------------------

  const renderAttendanceReport = () => {
    if (employees.length === 0) {
      return (
        <tr>
          <td colSpan="4" style={{ textAlign: 'center' }}>
            No employees found.
          </td>
        </tr>
      );
    }

    return employees.map((employee) => (
      <tr key={employee.id}>

        <td style={{ fontWeight: 600 }}>
          {employee.user?.first_name
            ? `${employee.user.first_name} ${
                employee.user.last_name || ''
              }`
            : employee.first_name
              ? `${employee.first_name} ${
                  employee.last_name || ''
                }`
              : employee.employee_name || 'Employee'}
        </td>

        <td>
          {employee.employee_id}
        </td>

        <td>
          {employee.department_name ||
            employee.department?.name ||
            'N/A'}
        </td>

        <td>
          <span className="badge badge-success">
            {getAttendanceRate(employee)}%
          </span>
        </td>

      </tr>
    ));
  };

  // --------------------------------
  // PAYROLL TABLE
  // --------------------------------

  const renderPayrollReport = () => {
    if (payroll.length === 0) {
      return (
        <tr>
          <td colSpan="7" style={{ textAlign: 'center' }}>
            No payroll records found.
          </td>
        </tr>
      );
    }

    return payroll.map((record) => (
      <tr key={record.id}>

        <td style={{ fontWeight: 600 }}>
          {record.employee_name || 'Employee'}
        </td>

        <td>
          {record.employee_id || 'N/A'}
        </td>

        <td>
          {record.department || 'N/A'}
        </td>

        <td>
          {formatCurrency(record.basic_salary)}
        </td>

        <td>
          {formatCurrency(record.deductions)}
        </td>

        <td style={{ fontWeight: 700 }}>
          {formatCurrency(record.net_salary)}
        </td>

        <td>
          {record.month} {record.year}
        </td>

      </tr>
    ));
  };

  // --------------------------------
  // DEPARTMENT TABLE
  // --------------------------------

  const renderDepartmentReport = () => {
    if (departments.length === 0) {
      return (
        <tr>
          <td colSpan="3" style={{ textAlign: 'center' }}>
            No departments found.
          </td>
        </tr>
      );
    }

    return departments.map((department) => {

      const departmentEmployees = employees.filter(
        (employee) =>
          employee.department === department.id ||
          employee.department?.id === department.id
      );

      const totalSalary =
        departmentEmployees.reduce(
          (total, employee) =>
            total + Number(employee.salary || 0),
          0
        );

      return (
        <tr key={department.id}>

          <td style={{ fontWeight: 600 }}>
            {department.name}
          </td>

          <td>
            {departmentEmployees.length}
          </td>

          <td>
            {formatCurrency(totalSalary)}
          </td>

        </tr>
      );
    });
  };

  return (
    <div className="page-container">

      {/* HEADER */}

      <div className="page-header">

        <div>

          <h1 className="page-title">
            Executive Analytics & Reports
          </h1>

          <p className="page-subtitle">
            View employee attendance, payroll and department analytics
          </p>

        </div>

        <div
          style={{
            display: 'flex',
            gap: '12px'
          }}
        >

          <Button
            variant="secondary"
            icon={Download}
            onClick={handleDownloadCSV}
          >
            Download CSV
          </Button>

          <Button
            variant="primary"
            icon={FileText}
            onClick={() =>
              printElement('report-preview')
            }
          >
            Download PDF Report
          </Button>

        </div>

      </div>

      {/* REPORT TYPE */}

      <div
        className="card"
        style={{
          marginBottom: '24px',
          display: 'flex',
          gap: '8px'
        }}
      >

        <button
          className={`btn ${
            reportType === 'attendance'
              ? 'btn-primary'
              : 'btn-secondary'
          } btn-sm`}
          onClick={() =>
            setReportType('attendance')
          }
        >
          Attendance Report
        </button>

        <button
          className={`btn ${
            reportType === 'payroll'
              ? 'btn-primary'
              : 'btn-secondary'
          } btn-sm`}
          onClick={() =>
            setReportType('payroll')
          }
        >
          Payroll Summary
        </button>

        <button
          className={`btn ${
            reportType === 'department'
              ? 'btn-primary'
              : 'btn-secondary'
          } btn-sm`}
          onClick={() =>
            setReportType('department')
          }
        >
          Department Analytics
        </button>

      </div>

      {/* CHARTS */}

      <div
        className="charts-grid"
        style={{ marginBottom: '24px' }}
      >

        {reportType === 'attendance' && (
          <AttendanceChart />
        )}

        {reportType === 'payroll' && (
          <SalaryChart />
        )}

        {reportType === 'department' && (
          <DepartmentChart />
        )}

      </div>

      {/* REPORT TABLE */}

      <div
        id="report-preview"
        className="card"
      >

        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            marginBottom: '16px'
          }}
        >
          {reportType === 'attendance' &&
            'Employee Attendance Report'}

          {reportType === 'payroll' &&
            'Employee Payroll Summary'}

          {reportType === 'department' &&
            'Department Analytics'}
        </h3>

        {loading ? (

          <p>Loading report data...</p>

        ) : (

          <table className="custom-table">

            {reportType === 'attendance' && (
              <>
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Employee ID</th>
                    <th>Department</th>
                    <th>Attendance Rate</th>
                  </tr>
                </thead>

                <tbody>
                  {renderAttendanceReport()}
                </tbody>
              </>
            )}

            {reportType === 'payroll' && (
              <>
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Employee ID</th>
                    <th>Department</th>
                    <th>Basic Salary</th>
                    <th>Deductions</th>
                    <th>Net Salary</th>
                    <th>Pay Period</th>
                  </tr>
                </thead>

                <tbody>
                  {renderPayrollReport()}
                </tbody>
              </>
            )}

            {reportType === 'department' && (
              <>
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Employees</th>
                    <th>Total Salary</th>
                  </tr>
                </thead>

                <tbody>
                  {renderDepartmentReport()}
                </tbody>
              </>
            )}

          </table>

        )}

      </div>

    </div>
  );
};

export default AdminReports;