import { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { departmentService } from '../../services/departmentService';
import toast from 'react-hot-toast';

const EmployeeForm = ({
  initialValues = null,
  onSubmit,
  onCancel,
  loading = false
}) => {
  const [formData, setFormData] = useState({
    username: initialValues?.username || '',
    email: initialValues?.email || '',
    first_name: initialValues?.first_name || '',
    last_name: initialValues?.last_name || '',
    employee_id: initialValues?.employee_id || '',
    phone: initialValues?.phone || '',
    role: initialValues?.role || 'Employee',
    department: initialValues?.department?.id || '',
    address: initialValues?.address || '',
    designation: initialValues?.designation || '',
    salary: initialValues?.salary || '',
    date_of_birth: initialValues?.date_of_birth || '',
    date_joined: initialValues?.date_joined || '',
    password: ''
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchDepts = async () => {
      try {
        const data = await departmentService.getAll();

        if (isMounted) {
          setDepartments(
            Array.isArray(data)
              ? data
              : data.results || []
          );
        }
      } catch {
        toast.error('Failed to load departments');
      }
    };

    fetchDepts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.email ||
      !formData.first_name ||
      !formData.employee_id ||
      !formData.address ||
      !formData.designation ||
      !formData.salary ||
      !formData.date_of_birth ||
      !formData.date_joined
    ) {
      toast.error('Please fill all required fields');
      return;
    }

    if (!initialValues && !formData.password) {
      toast.error('Password is required');
      return;
    }
    console.log("Sending Employee:",formData);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px'
        }}
      >

        <Input
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />

        <Input
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />

        <Input
          label="Employee ID"
          name="employee_id"
          value={formData.employee_id}
          onChange={handleChange}
          required
        />

        <Input
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <Input
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <Input
          label="Designation"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          required
        />

        <Input
          label="Salary"
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />

        <Input
          label="Date of Birth"
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          required
        />

        <Input
          label="Date Joined"
          type="date"
          name="date_joined"
          value={formData.date_joined}
          onChange={handleChange}
          required
        />

        <div>
          <label>Role</label>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Employee">Employee</option>
            <option value="HR">HR</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div>
          <label>Department</label>

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>

            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {!initialValues && (
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        )}

      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          marginTop: '24px'
        }}
      >
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button type="submit" loading={loading}>
          {initialValues ? 'Update Employee' : 'Save Employee'}
        </Button>
      </div>
    </form>
  );
};

export default EmployeeForm;