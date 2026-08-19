import { Printer, Download } from 'lucide-react';
import Button from '../common/Button';
import { formatCurrency, formatDate, printElement } from '../../utils/helpers';

const SalarySlip = ({ slipData }) => {
  if (!slipData) return null;

  const employeeName = slipData.employee_name || 'Employee';
  const employeeId = slipData.employee_id || '-';
  const department = slipData.department || '-';
  const designation = slipData.designation || '-';
  const basicSalary = Number(slipData.basic_salary || 0);
  const hra = Number(slipData.hra || 0);
  const allowance = Number(slipData.allowance || 0);
  const tax = Number(slipData.tax || 0);
  const insurance = Number(slipData.insurance || 0);
  const otherDeductions = Number(slipData.other_deductions || 0);
  const deductions = Number(slipData.deductions || 0);
  const netSalary = Number(slipData.net_salary || 0);
  const monthYear = `${slipData.month || '-'} ${slipData.year || '-'}`;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          marginBottom: '16px'
        }}
      >
        <Button
          variant="secondary"
          size="sm"
          icon={Printer}
          onClick={() => printElement('salary-slip-document')}
        >
          Print
        </Button>
        <Button
          variant="primary"
          size="sm"
          icon={Download}
          onClick={() => printElement('salary-slip-document')}
        >
          Download PDF
        </Button>
      </div>

      <div
        id="salary-slip-document"
        className="card"
        style={{ padding: '32px', backgroundColor: '#ffffff' }}
      >
        {/* Company Branding Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid var(--primary)',
            paddingBottom: '16px',
            marginBottom: '24px'
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
              WorkBalance Suite
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              100 Tech Plaza, Suite 400 • HR & Payroll Dept
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
              PAYSLIP STATEMENT
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>
              Period: {monthYear}
            </p>
          </div>
        </div>

        {/* Employee Summary Box */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            backgroundColor: '#f8fafc',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '24px',
            fontSize: '0.875rem'
          }}
        >
          <div>
            <p>
              <strong>Employee Name:</strong> {employeeName}
            </p>
            <p>
              <strong>Employee ID:</strong> {employeeId}
            </p>
            <p>
              <strong>Department:</strong> {department}
            </p>
          </div>
          <div>
            <p>
              <strong>Designation:</strong> {designation}
            </p>
            <p>
              <strong>Pay Date:</strong> {formatDate(slipData.pay_date || slipData.created_at || new Date())}
            </p>
            <p>
              <strong>Payment Status:</strong>{' '}
              <span className="badge badge-success">{slipData.payment_status || 'PAID'}</span>
            </p>
          </div>
        </div>

        {/* Salary Component Table */}
        <table
          className="custom-table"
          style={{ marginBottom: '24px', border: '1px solid var(--border-color)' }}
        >
          <thead>
            <tr>
              <th>Earnings</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
              <th>Deductions</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Basic Salary</td>
              <td style={{ textAlign: 'right' }}>{formatCurrency(basicSalary)}</td>
              <td>Tax (TDS / Income)</td>
              <td style={{ textAlign: 'right' }}>{formatCurrency(tax)}</td>
            </tr>
            <tr>
              <td>House Rent Allowance (HRA)</td>
              <td style={{ textAlign: 'right' }}>{formatCurrency(hra)}</td>
              <td>Health Insurance</td>
              <td style={{ textAlign: 'right' }}>{formatCurrency(insurance)}</td>
            </tr>
            <tr>
              <td>Other Allowance</td>
              <td style={{ textAlign: 'right' }}>{formatCurrency(allowance)}</td>
              <td>Other Deductions</td>
              <td style={{ textAlign: 'right' }}>{formatCurrency(otherDeductions)}</td>
            </tr>
            <tr style={{ fontWeight: 700, backgroundColor: '#f8fafc' }}>
              <td>Total Gross Earnings</td>
              <td style={{ textAlign: 'right', color: 'var(--success)' }}>
                {formatCurrency(basicSalary + hra + allowance)}
              </td>
              <td>Total Deductions</td>
              <td style={{ textAlign: 'right', color: 'var(--danger)' }}>
                {formatCurrency(tax + insurance + otherDeductions + deductions)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Net Salary Highlight Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--primary-light)',
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--primary-border)'
          }}
        >
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Net Take-Home Pay
            </span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
              {formatCurrency(netSalary)}
            </h3>
          </div>
          <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            This is a computer-generated salary slip.<br />
            No physical signature required.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalarySlip;
