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

        const list = Array.isArray(data)
          ? data
          : data.results || [];

        setPayrollRecords(list);

        if (list.length > 0) {
          setSelectedRecord(list[0]);
        }
      } catch (err) {
        console.error('Failed to load my payroll:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPayroll();
  }, []);

  if (loading) {
    return <Loader message="Fetching your salary slip..." />;
  }

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1 className="page-title">
            My Payslips
          </h1>

          <p className="page-subtitle">
            View and download your monthly salary statements
          </p>
        </div>
      </div>

      {payrollRecords.length === 0 ? (
        <div className="card">
          <p>
            No payroll statements available.
          </p>
        </div>
      ) : (
        <>
          {payrollRecords.length > 1 && (
            <div
              className="card"
              style={{ marginBottom: '24px' }}
            >
              <label className="form-label">
                Select Pay Period
              </label>

              <select
                className="input-field"
                value={selectedRecord?.id || ''}
                onChange={(e) => {
                  const record = payrollRecords.find(
                    (r) => r.id === Number(e.target.value)
                  );

                  setSelectedRecord(record);
                }}
              >
                {payrollRecords.map((record) => (
                  <option
                    key={record.id}
                    value={record.id}
                  >
                    {record.pay_month}
                  </option>
                ))}
              </select>
            </div>
          )}

          <SalarySlip
            slipData={selectedRecord}
          />
        </>
      )}

    </div>
  );
};

export default EmployeeSalarySlip;