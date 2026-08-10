import { FileText } from 'lucide-react';
import Button from '../common/Button';
import { formatCurrency } from '../../utils/helpers';

const PayrollTable = ({ records = [], onViewSlip }) => {
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Month / Year</th>
            <th>Basic Salary</th>
            <th>Allowances</th>
            <th>Deductions</th>
            <th>Net Salary</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                No payroll statements generated yet.
              </td>
            </tr>
          ) : (
            records.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 600 }}>
                  {item.employee_name || item.employee?.first_name || 'Employee'}
                </td>
                <td>{item.month_year || `${item.month || ''} ${item.year || ''}`}</td>
                <td>{formatCurrency(item.basic_salary)}</td>
                <td style={{ color: 'var(--success)' }}>
                  +{formatCurrency(item.allowances || 0)}
                </td>
                <td style={{ color: 'var(--danger)' }}>
                  -{formatCurrency(item.deductions || 0)}
                </td>
                <td style={{ fontWeight: 700, color: 'var(--primary)' }}>
                  {formatCurrency(item.net_salary)}
                </td>
                <td>
                  <span
                    className={`badge ${
                      item.status === 'Paid' ? 'badge-success' : 'badge-warning'
                    }`}
                  >
                    {item.status || 'Paid'}
                  </span>
                </td>
                <td>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={FileText}
                    onClick={() => onViewSlip(item)}
                  >
                    Slip
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollTable;
