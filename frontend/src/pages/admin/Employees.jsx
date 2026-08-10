import { useState, useEffect, useCallback } from 'react';
import EmployeeTable from '../../components/employee/EmployeeTable';
import EmployeeCard from '../../components/employee/EmployeeCard';
import EmployeeForm from '../../components/employee/EmployeeForm';
import SearchBar from '../../components/common/SearchBar';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Loader from '../../components/common/Loader';
import Pagination from '../../components/common/Pagination';
import { employeeService } from '../../services/employeeService';
import { UserPlus, LayoutGrid, List } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const data = await employeeService.getAll();
      const list = Array.isArray(data) ? data : data.results || [];
      setEmployees(list);
    } catch (err) {
      toast.error('Failed to load employee list');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const filteredEmployees = employees.filter((emp) => {
    const fullName = `${emp.first_name || ''} ${emp.last_name || ''}`.toLowerCase();
    const query = search.toLowerCase();
    return (
      fullName.includes(query) ||
      emp.email?.toLowerCase().includes(query) ||
      emp.username?.toLowerCase().includes(query) ||
      emp.department_name?.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredEmployees.length / pageSize);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleCreate = async (formData) => {
    setSubmitting(true);
    try {
      await employeeService.create(formData);
      toast.success('Employee created successfully');
      setIsModalOpen(false);
      fetchEmployees();
    } catch (err) {
      const message = err.response?.data?.message || err.response?.data || 'Failed to create employee';
      toast.error(typeof message === 'string' ? message : 'Failed to create employee');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (formData) => {
    if (!selectedEmployee) return;

    setSubmitting(true);
    try {
      await employeeService.update(selectedEmployee.id, formData);
      toast.success('Employee updated successfully');
      setIsModalOpen(false);
      setSelectedEmployee(null);
      fetchEmployees();
    } catch (err) {
      const message = err.response?.data?.message || err.response?.data || 'Failed to update employee';
      toast.error(typeof message === 'string' ? message : 'Failed to update employee');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setSubmitting(true);
    try {
      await employeeService.delete(deleteId);
      toast.success('Employee removed successfully');
      setDeleteId(null);
      fetchEmployees();
    } catch {
      toast.error('Failed to delete employee');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Employee Directory</h1>
          <p className="page-subtitle">Manage organization staff, roles, and profiles</p>
        </div>
        <Button
          variant="primary"
          icon={UserPlus}
          onClick={() => {
            setSelectedEmployee(null);
            setIsModalOpen(true);
          }}
        >
          Add Employee
        </Button>
      </div>

      <div
        className="card"
        style={{
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap'
        }}
      >
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by name, email, or department..."
        />

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            variant={viewMode === 'table' ? 'primary' : 'secondary'}
            size="sm"
            icon={List}
            onClick={() => setViewMode('table')}
          />
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'secondary'}
            size="sm"
            icon={LayoutGrid}
            onClick={() => setViewMode('grid')}
          />
        </div>
      </div>

      {loading ? (
        <Loader message="Loading employees..." />
      ) : viewMode === 'table' ? (
        <>
          <EmployeeTable
            employees={paginatedEmployees}
            onEdit={(emp) => {
              setSelectedEmployee(emp);
              setIsModalOpen(true);
            }}
            onDelete={(id) => setDeleteId(id)}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px'
            }}
          >
            {paginatedEmployees.map((emp) => (
              <EmployeeCard
                key={emp.id}
                employee={emp}
                onEdit={(employee) => {
                  setSelectedEmployee(employee);
                  setIsModalOpen(true);
                }}
                onDelete={(id) => setDeleteId(id)}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedEmployee ? 'Edit Employee Profile' : 'Onboard New Employee'}
      >
        <EmployeeForm
          initialValues={selectedEmployee}
          onSubmit={selectedEmployee ? handleUpdate : handleCreate}
          onCancel={() => setIsModalOpen(false)}
          loading={submitting}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Employee Record"
        message="Are you sure you want to delete this employee? All linked attendance and payroll records will be permanently removed."
        loading={submitting}
      />
    </div>
  );
};

export default AdminEmployees;
