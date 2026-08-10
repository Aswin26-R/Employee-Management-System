import { Edit, Trash2, Eye } from 'lucide-react';
import Button from '../common/Button';
import { formatDate } from '../../utils/helpers';

const EmployeeTable = ({ employees = [], onEdit, onDelete, onView }) => {
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Role</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Joining Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                No employees found matching parameters.
              </td>
            </tr>
          ) : (
            employees.map((emp) => {
              const name = emp.first_name
                ? `${emp.first_name} ${emp.last_name || ''}`
                : emp.username;

              return (
                <tr key={emp.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {emp.email}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-primary">{emp.role || 'Employee'}</span>
                  </td>
                  <td>{emp.department_name || emp.department || 'N/A'}</td>
                  <td>{emp.designation || 'Staff'}</td>
                  <td>{formatDate(emp.joining_date || emp.date_joined)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {onView && (
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={Eye}
                          onClick={() => onView(emp)}
                        />
                      )}
                      {onEdit && (
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={Edit}
                          onClick={() => onEdit(emp)}
                        />
                      )}
                      {onDelete && (
                        <Button
                          variant="danger"
                          size="sm"
                          icon={Trash2}
                          onClick={() => onDelete(emp.id)}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
