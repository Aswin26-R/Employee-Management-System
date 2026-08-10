import { useState } from 'react';
import Button from '../../components/common/Button';
import AttendanceChart from '../../components/dashboard/AttendanceChart';
import SalaryChart from '../../components/dashboard/SalaryChart';
import DepartmentChart from '../../components/dashboard/DepartmentChart';
import { Download, FileText } from 'lucide-react';
import { exportToCSV, printElement } from '../../utils/helpers';
import toast from 'react-hot-toast';

const AdminReports = () => {
  const [reportType, setReportType] = useState('attendance');

  const dummyReportData = [
    { id: 1, name: 'John Doe', department: 'Engineering', attendanceRate: '96%', salary: '$4,500' },
    { id: 2, name: 'Sarah Connor', department: 'HR', attendanceRate: '98%', salary: '$4,200' },
    { id: 3, name: 'Marcus Vance', department: 'Sales', attendanceRate: '92%', salary: '$3,800' },
    { id: 4, name: 'Emily Blunt', department: 'Finance', attendanceRate: '100%', salary: '$5,000' }
  ];

  const handleDownloadCSV = () => {
    exportToCSV(`system_${reportType}_report.csv`, dummyReportData, {
      name: 'Employee Name',
      department: 'Department',
      attendanceRate: 'Attendance Rate',
      salary: 'Monthly Salary'
    });
    toast.success(`${reportType.toUpperCase()} report CSV downloaded!`);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Executive Analytics & Reports</h1>
          <p className="page-subtitle">Download consolidated audit logs and export PDF/CSV summary reports</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="secondary" icon={Download} onClick={handleDownloadCSV}>
            Download CSV
          </Button>
          <Button variant="primary" icon={FileText} onClick={() => printElement('report-preview')}>
            Download PDF Report
          </Button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px', display: 'flex', gap: '8px' }}>
        <button
          className={`btn ${reportType === 'attendance' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setReportType('attendance')}
        >
          Attendance Report
        </button>
        <button
          className={`btn ${reportType === 'payroll' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setReportType('payroll')}
        >
          Payroll Summary
        </button>
        <button
          className={`btn ${reportType === 'department' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setReportType('department')}
        >
          Department Analytics
        </button>
      </div>

      {/* Analytics Visualizer Row */}
      <div className="charts-grid" style={{ marginBottom: '24px' }}>
        {reportType === 'attendance' && <AttendanceChart />}
        {reportType === 'payroll' && <SalaryChart />}
        {reportType === 'department' && <DepartmentChart />}
      </div>

      {/* Summary Table for Print / Export */}
      <div id="report-preview" className="card">
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>
          Consolidated {reportType.toUpperCase()} Audit Report
        </h3>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Attendance Rate</th>
              <th>Monthly Salary</th>
            </tr>
          </thead>
          <tbody>
            {dummyReportData.map((row) => (
              <tr key={row.id}>
                <td style={{ fontWeight: 600 }}>{row.name}</td>
                <td>{row.department}</td>
                <td>
                  <span className="badge badge-success">{row.attendanceRate}</span>
                </td>
                <td style={{ fontWeight: 600 }}>{row.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReports;
