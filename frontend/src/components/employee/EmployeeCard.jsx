import { Mail, Phone, Building2, Edit, Trash2 } from 'lucide-react';
import Button from '../common/Button';

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  const name = employee.first_name
    ? `${employee.first_name} ${employee.last_name || ''}`
    : employee.username;

  return (
    <div className="card" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          style={{
            width: '54px',
            height: '54px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            fontWeight: 700
          }}
        >
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>
            {name}
          </h4>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {employee.designation || 'Staff Member'}
          </span>
          <div style={{ marginTop: '4px' }}>
            <span className="badge badge-primary">{employee.role || 'Employee'}</span>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Mail size={16} style={{ color: 'var(--text-muted)' }} />
          <span>{employee.email}</span>
        </div>
        {employee.phone && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Phone size={16} style={{ color: 'var(--text-muted)' }} />
            <span>{employee.phone}</span>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Building2 size={16} style={{ color: 'var(--text-muted)' }} />
          <span>{employee.department_name || 'No Dept'}</span>
        </div>
      </div>

      <div
        style={{
          marginTop: '16px',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '8px'
        }}
      >
        <Button variant="secondary" size="sm" icon={Edit} onClick={() => onEdit(employee)}>
          Edit
        </Button>
        <Button variant="danger" size="sm" icon={Trash2} onClick={() => onDelete(employee.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default EmployeeCard;
