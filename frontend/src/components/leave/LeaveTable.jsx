import { CheckCircle, XCircle } from 'lucide-react';
import Button from '../common/Button';
import { formatDate } from '../../utils/helpers';

const LeaveTable = ({ leaves = [], onApprove, onReject, showActions = false }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return 'badge-success';
      case 'Rejected':
        return 'badge-danger';
      case 'Pending':
        return 'badge-warning';
      default:
        return 'badge-info';
    }
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Days</th>
            <th>Reason</th>
            <th>Status</th>
            {showActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {leaves.length === 0 ? (
            <tr>
              <td
                colSpan={showActions ? 8 : 7}
                style={{ textAlign: 'center', color: 'var(--text-muted)' }}
              >
                No leave applications recorded.
              </td>
            </tr>
          ) : (
            leaves.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 600 }}>
                  {item.employee_name || item.user?.username || 'Employee'}
                </td>
                <td>
                  <span className="badge badge-primary">{item.leave_type}</span>
                </td>
                <td>{formatDate(item.start_date)}</td>
                <td>{formatDate(item.end_date)}</td>
                <td>{item.total_days || 1}</td>
                <td style={{ color: 'var(--text-secondary)', maxWidth: '200px' }}>
                  {item.reason}
                </td>
                <td>
                  <span className={`badge ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                {showActions && (
                  <td>
                    {item.status === 'Pending' ? (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Button
                          variant="success"
                          size="sm"
                          icon={CheckCircle}
                          onClick={() => onApprove(item.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          icon={XCircle}
                          onClick={() => onReject(item.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Resolved
                      </span>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveTable;
