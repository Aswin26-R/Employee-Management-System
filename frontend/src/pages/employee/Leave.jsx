import { useState, useEffect } from 'react';
import LeaveTable from '../../components/leave/LeaveTable';
import LeaveForm from '../../components/leave/LeaveForm';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Loader from '../../components/common/Loader';
import { leaveService } from '../../services/leaveService';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const EmployeeLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchMyLeaves = async () => {
    setLoading(true);
    try {
      const data = await leaveService.getMyLeaves();
      const list = Array.isArray(data) ? data : data.results || [];
      setLeaves(list);
    } catch (err) {
      console.error('Error fetching my leaves', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyLeaves();
  }, []);

  const handleApply = async (formData) => {
    setSubmitting(true);
    try {
      await leaveService.applyLeave(formData);
      toast.success('Leave application submitted successfully');
      setIsModalOpen(false);
      fetchMyLeaves();
    } catch (err) {
      toast.error('Failed to submit leave application');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Leave Applications</h1>
          <p className="page-subtitle">Submit new leave requests and check approval statuses</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={() => setIsModalOpen(true)}>
          Apply for Leave
        </Button>
      </div>

      {loading ? (
        <Loader message="Loading leave applications..." />
      ) : (
        <LeaveTable leaves={leaves} showActions={false} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Submit New Leave Application"
      >
        <LeaveForm
          onSubmit={handleApply}
          onCancel={() => setIsModalOpen(false)}
          loading={submitting}
        />
      </Modal>
    </div>
  );
};

export default EmployeeLeave;
