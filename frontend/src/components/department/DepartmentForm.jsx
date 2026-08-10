import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const DepartmentForm = ({ initialValues = null, onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState(() => ({
    name: initialValues?.name || '',
    description: initialValues?.description || ''
  }));

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
      <Input
        label="Department Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="e.g. Engineering, Sales, Finance"
      />
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          className="input-field"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief description of responsibilities..."
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
          {initialValues ? 'Update Department' : 'Create Department'}
        </Button>
      </div>
    </form>
  );
};

export default DepartmentForm;
