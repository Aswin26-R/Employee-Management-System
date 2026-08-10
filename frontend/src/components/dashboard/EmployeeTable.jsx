import { formatDate } from '../../utils/helpers';

const DashboardEmployeeTable = ({ employees = [] }) => {
  return (
    <div className="card">
      <h3
        style={{
          fontSize: '1rem',
          fontWeight: 600,
          marginBottom: '16px',
          color: 'var(--text-main)'
        }}
      >
        Recent Joiners & Team Overview
      </h3>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Joining Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  No employees found
                </td>
              </tr>
            ) : (
              employees.slice(0, 5).map((emp) => (
                <tr key={emp.id || emp.employee_id}>
                  <td style={{ fontWeight: 600 }}>{emp.employee_id || `#EMP-${emp.id}`}</td>
                  <td>
                    <div style={{ fontWeight: 500 }}>
                      {emp.first_name ? `${emp.first_name} ${emp.last_name || ''}` : emp.name || emp.username}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {emp.email}
                    </div>
                  </td>
                  <td>{emp.department_name || emp.department || 'N/A'}</td>
                  <td>{emp.designation || 'Staff'}</td>
                  <td>{formatDate(emp.joining_date || emp.date_joined)}</td>
                  <td>
                    <span
                      className={`badge ${
                        emp.is_active !== false ? 'badge-success' : 'badge-danger'
                      }`}
                    >
                      {emp.is_active !== false ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardEmployeeTable;