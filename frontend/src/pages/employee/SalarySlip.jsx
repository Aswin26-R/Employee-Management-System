import { useState, useEffect } from 'react';
import SalarySlip from '../../components/payroll/SalarySlip';
import Loader from '../../components/common/Loader';
import { payrollService } from '../../services/payrollService';

const EmployeeSalarySlip = () => {
  const [payrollRecords, setPayrollRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const fetchMyPayroll = async () => {
      try {
        const data = await payrollService.getMyPayroll();
        const list = Array.isArray(data) ? data : data.results || [];
        setPayrollRecords(list);
        if (list.length > 0) setSelectedRecord(list[0]);
      } catch (err) {
        console.error('Failed to load my payroll', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyPayroll();
  }, []);

  if (loading) return <Loader message="Fetching your salary slip..." />;

  const dummySlip = {
    employee_name: 'Alex Johnson',
    employee_id: '#EMP-204',
    department: 'Engineering',
    designation: 'Software Engineer',
    month_year: 'June 2026',
    basic_salary: 4800,
    allowances: 600,
    deductions: 250,
    net_salary: 5150
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Payslips</h1>
          <p className="page-subtitle">View and download your monthly salary statements</p>
        </div>
      </div>

      {payrollRecords.length > 1 && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <label className="form-label">Select Pay Period</label>
          <select
            className="input-field"
            onChange={(e) => {
              const rec = payrollRecords.find((r) => r.id === parseInt(e.target.value));
              if (rec) setSelectedRecord(rec);
            }}
          >
            {payrollRecords.map((r) => (
              <option key={r.id} value={r.id}>
                {r.month_year || `Statement #${r.id}`}
              </option>
            ))}
          </select>
        </div>
      )}

      <SalarySlip slipData={selectedRecord || dummySlip} />
    </div>
  );
};

export default EmployeeSalarySlip;
