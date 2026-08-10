import { useState, useEffect, useCallback } from 'react';
import LeaveTable from '../../components/leave/LeaveTable';
import Loader from '../../components/common/Loader';
import { leaveService } from '../../services/leaveService';
import toast from 'react-hot-toast';

const AdminLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  const fetchLeaves = useCallback(async () => {
    setLoading(true);
    try {
      const data = await leaveService.getAll();
      const list = Array.isArray(data) ? data : data.results || [];
      setLeaves(list);
    } catch {
      toast.error('Failed to load leave requests');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  const handleApprove = async (id) => {
    try {
      await leaveService.approveLeave(id);
      toast.success('Leave application approved');
      fetchLeaves();
    } catch {
      toast.error('Failed to approve leave');
    }
  };

  const handleReject = async (id) => {
    try {
      await leaveService.rejectLeave(id, 'Rejected by Administrator');
      toast.success('Leave application rejected');
      fetchLeaves();
    } catch {
      toast.error('Failed to reject leave');
    }
  };

  const filteredLeaves =
    filter === 'ALL'
      ? leaves
      : leaves.filter((l) => l.status?.toUpperCase() === filter);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Leave Management</h1>
          <p className="page-subtitle">Approve or reject employee leave applications</p>
        </div>
      </div>

      <div
        className="card"
        style={{
          marginBottom: '24px',
          display: 'flex',
          gap: '8px'
        }}
      >
        {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((status) => (
          <button
            key={status}
            className={`btn ${filter === status ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setFilter(status)}
          >
            {status} LEAVES
          </button>
        ))}
      </div>

      {loading ? (
        <Loader message="Loading leave applications..." />
      ) : (
        <LeaveTable
          leaves={filteredLeaves}
          onApprove={handleApprove}
          onReject={handleReject}
          showActions={true}
        />
      )}
    </div>
  );
};

export default AdminLeave;
