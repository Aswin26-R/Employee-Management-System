import { Printer, Download } from 'lucide-react';
import Button from '../common/Button';
import { formatCurrency, formatDate, printElement } from '../../utils/helpers';

const SalarySlip = ({ slipData }) => {
  if (!slipData) return null;

  const employeeName = slipData.employee_name || 'John Doe';
  const monthYear = slipData.month_year || 'June 2026';
  const basicSalary = slipData.basic_salary || 4500;
  const allowances = slipData.allowances || 500;
  const deductions = slipData.deductions || 200;
  const netSalary = slipData.net_salary || basicSalary + allowances - deductions;

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
              WorkforceHR Inc.
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
              <strong>Employee ID:</strong> {slipData.employee_id || '#EMP-104'}
            </p>
            <p>
              <strong>Department:</strong> {slipData.department || 'Engineering'}
            </p>
          </div>
          <div>
            <p>
              <strong>Designation:</strong> {slipData.designation || 'Software Engineer'}
            </p>
            <p>
              <strong>Pay Date:</strong> {formatDate(slipData.created_at || new Date())}
            </p>
            <p>
              <strong>Payment Status:</strong>{' '}
              <span className="badge badge-success">PAID</span>
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
              <td style={{ textAlign: 'right' }}>{formatCurrency(deductions * 0.6)}</td>
            </tr>
            <tr>
              <td>House Rent Allowance (HRA)</td>
              <td style={{ textAlign: 'right' }}>{formatCurrency(allowances * 0.6)}</td>
              <td>Health Insurance</td>
              <td style={{ textAlign: 'right' }}>{formatCurrency(deductions * 0.4)}</td>
            </tr>
            <tr>
              <td>Special / Conveyance Allowance</td>
              <td style={{ textAlign: 'right' }}>{formatCurrency(allowances * 0.4)}</td>
              <td>-</td>
              <td style={{ textAlign: 'right' }}>$0.00</td>
            </tr>
            <tr style={{ fontWeight: 700, backgroundColor: '#f8fafc' }}>
              <td>Total Gross Earnings</td>
              <td style={{ textAlign: 'right', color: 'var(--success)' }}>
                {formatCurrency(basicSalary + allowances)}
              </td>
              <td>Total Deductions</td>
              <td style={{ textAlign: 'right', color: 'var(--danger)' }}>
                {formatCurrency(deductions)}
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
