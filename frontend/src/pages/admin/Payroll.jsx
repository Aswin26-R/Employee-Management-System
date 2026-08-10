import { useState, useEffect } from 'react';
import PayrollTable from '../../components/payroll/PayrollTable';
import SalarySlip from '../../components/payroll/SalarySlip';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Loader from '../../components/common/Loader';
import { payrollService } from '../../services/payrollService';
import { Play } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminPayroll = () => {
  const [payrollRecords, setPayrollRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlip, setSelectedSlip] = useState(null);
  const [generating, setGenerating] = useState(false);

  const fetchPayroll = async () => {
    setLoading(true);
    try {
      const data = await payrollService.getAll();
      const list = Array.isArray(data) ? data : data.results || [];
      setPayrollRecords(list);
    } catch (err) {
      toast.error('Failed to load payroll list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayroll();
  }, []);

  const handleGeneratePayroll = async () => {
    setGenerating(true);
    try {
      await payrollService.generatePayroll({
        month: new Date().toLocaleString('default', { month: 'long' }),
        year: new Date().getFullYear()
      });
      toast.success('Monthly payroll generated successfully!');
      fetchPayroll();
    } catch (err) {
      toast.error('Failed to generate payroll');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Payroll Management</h1>
          <p className="page-subtitle">Generate monthly salary statements and download payslips</p>
        </div>
        <Button
          variant="primary"
          icon={Play}
          loading={generating}
          onClick={handleGeneratePayroll}
        >
          Generate Monthly Payroll
        </Button>
      </div>

      {loading ? (
        <Loader message="Fetching payroll statements..." />
      ) : (
        <PayrollTable
          records={payrollRecords}
          onViewSlip={(item) => setSelectedSlip(item)}
        />
      )}

      {/* Salary Slip Modal */}
      <Modal
        isOpen={!!selectedSlip}
        onClose={() => setSelectedSlip(null)}
        title="Employee Salary Slip"
      >
        <SalarySlip slipData={selectedSlip} />
      </Modal>
    </div>
  );
};

export default AdminPayroll;
