import { formatDate, formatTime } from '../../utils/helpers';

const AttendanceTable = ({ records = [] }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Present':
        return 'badge-success';
      case 'Absent':
        return 'badge-danger';
      case 'Late':
      case 'Half Day':
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
            <th>Date</th>
            <th>Employee</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Working Hours</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                No attendance logs recorded for this period.
              </td>
            </tr>
          ) : (
            records.map((rec) => (
              <tr key={rec.id}>
                <td style={{ fontWeight: 500 }}>{formatDate(rec.date)}</td>
                <td>
                  <div style={{ fontWeight: 600 }}>
                    {rec.employee_name || rec.user?.username || 'Employee'}
                  </div>
                </td>
                <td>{formatTime(rec.check_in)}</td>
                <td>{formatTime(rec.check_out)}</td>
                <td>{rec.working_hours ? `${rec.working_hours} hrs` : '-'}</td>
                <td>
                  <span className={`badge ${getStatusBadge(rec.status)}`}>
                    {rec.status || 'Present'}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
