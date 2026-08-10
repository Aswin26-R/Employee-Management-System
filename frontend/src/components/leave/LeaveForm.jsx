import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { LEAVE_TYPES } from '../../utils/constants';

const LeaveForm = ({ onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    leave_type: LEAVE_TYPES[0],
    start_date: '',
    end_date: '',
    reason: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Leave Type</label>
        <select
          name="leave_type"
          className="input-field"
          value={formData.leave_type}
          onChange={handleChange}
        >
          {LEAVE_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Input
          label="Start Date"
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          required
        />
        <Input
          label="End Date"
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Reason for Leave</label>
        <textarea
          name="reason"
          className="input-field"
          rows={3}
          value={formData.reason}
          onChange={handleChange}
          required
          placeholder="Please explain reason for absence..."
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          marginTop: '20px'
        }}
      >
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          Submit Application
        </Button>
      </div>
    </form>
  );
};

export default LeaveForm;
