import { Edit, Trash2, Building2 } from 'lucide-react';
import Button from '../common/Button';

const DepartmentTable = ({ departments = [], onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Department Name</th>
            <th>Description</th>
            <th>Employee Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                No departments created yet.
              </td>
            </tr>
          ) : (
            departments.map((dept) => (
              <tr key={dept.id}>
                <td style={{ fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Building2 size={18} style={{ color: 'var(--primary)' }} />
                    <span>{dept.name}</span>
                  </div>
                </td>
                <td style={{ color: 'var(--text-secondary)' }}>
                  {dept.description || 'No description provided'}
                </td>
                <td>
                  <span className="badge badge-info">
                    {dept.employee_count ?? dept.total_employees ?? 0} Employees
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Edit}
                      onClick={() => onEdit(dept)}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      icon={Trash2}
                      onClick={() => onDelete(dept.id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
