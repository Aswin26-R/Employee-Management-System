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

  // Fetch employees
  const fetchEmployees = useCallback(async () => {
    setLoading(true);

    try {
      const data = await employeeService.getAll();

      const list = Array.isArray(data)
        ? data
        : data?.results || [];

      setEmployees(list);
    } catch (err) {
      console.error('Fetch employees error:', err);
      toast.error('Failed to load employee list');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Search employees
  const filteredEmployees = employees.filter((emp) => {
    const fullName = `${emp.first_name || ''} ${emp.last_name || ''}`
      .toLowerCase();

    const query = search.toLowerCase().trim();

    return (
      fullName.includes(query) ||
      emp.email?.toLowerCase().includes(query) ||
      emp.username?.toLowerCase().includes(query) ||
      emp.employee_id?.toLowerCase().includes(query) ||
      emp.department_name?.toLowerCase().includes(query) ||
      emp.designation?.toLowerCase().includes(query)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / pageSize);

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Create employee
  const handleCreate = async (formData) => {
    setSubmitting(true);

    try {
      await employeeService.create(formData);

      toast.success('Employee created successfully');

      setIsModalOpen(false);
      setSelectedEmployee(null);

      await fetchEmployees();
    } catch (err) {
      console.error('Create employee error:', err);

      const message =
        err.response?.data?.message ||
        err.response?.data?.detail ||
        'Failed to create employee';

      toast.error(
        typeof message === 'string'
          ? message
          : 'Failed to create employee'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Update employee
  const handleUpdate = async (formData) => {
    if (!selectedEmployee) return;

    setSubmitting(true);

    try {
      await employeeService.update(
        selectedEmployee.id,
        formData
      );

      toast.success('Employee updated successfully');

      setIsModalOpen(false);
      setSelectedEmployee(null);

      await fetchEmployees();
    } catch (err) {
      console.error('Update employee error:', err);

      const message =
        err.response?.data?.message ||
        err.response?.data?.detail ||
        'Failed to update employee';

      toast.error(
        typeof message === 'string'
          ? message
          : 'Failed to update employee'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Delete employee
  const handleDelete = async () => {
    if (deleteId === null) return;

    setSubmitting(true);

    try {
      await employeeService.delete(deleteId);

      toast.success('Employee removed successfully');

      setDeleteId(null);

      await fetchEmployees();

      // Prevent invalid page after deletion
      if (
        currentPage > 1 &&
        paginatedEmployees.length === 1
      ) {
        setCurrentPage((prev) => prev - 1);
      }
    } catch (err) {
      console.error('Delete employee error:', err);
      toast.error('Failed to delete employee');
    } finally {
      setSubmitting(false);
    }
  };

  // Open create modal
  const openCreateModal = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  // Close employee modal
  const closeModal = () => {
    if (submitting) return;

    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="page-container">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Employee Directory
          </h1>

          <p className="page-subtitle">
            Manage organization staff, roles, and profiles
          </p>
        </div>

        <Button
          variant="primary"
          icon={UserPlus}
          onClick={openCreateModal}
        >
          Add Employee
        </Button>
      </div>

      {/* Search and View Controls */}
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
          placeholder="Search by name, email, ID, or department..."
        />

        <div
          style={{
            display: 'flex',
            gap: '8px'
          }}
        >
          <Button
            variant={
              viewMode === 'table'
                ? 'primary'
                : 'secondary'
            }
            size="sm"
            icon={List}
            onClick={() => setViewMode('table')}
          />

          <Button
            variant={
              viewMode === 'grid'
                ? 'primary'
                : 'secondary'
            }
            size="sm"
            icon={LayoutGrid}
            onClick={() => setViewMode('grid')}
          />
        </div>
      </div>

      {/* Employee Content */}
      {loading ? (
        <Loader message="Loading employees..." />
      ) : (
        <>
          {paginatedEmployees.length === 0 ? (
            <div
              className="card"
              style={{
                textAlign: 'center',
                padding: '40px'
              }}
            >
              <h3>No employees found</h3>

              <p>
                {search
                  ? 'Try a different search term.'
                  : 'No employee records are available.'}
              </p>
            </div>
          ) : viewMode === 'table' ? (
            <EmployeeTable
              employees={paginatedEmployees}
              onEdit={openEditModal}
              onDelete={(id) => setDeleteId(id)}
            />
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px'
              }}
            >
              {paginatedEmployees.map((emp) => (
                <EmployeeCard
                  key={emp.id}
                  employee={emp}
                  onEdit={openEditModal}
                  onDelete={(id) => setDeleteId(id)}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

      {/* Create / Update Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          selectedEmployee
            ? 'Edit Employee Profile'
            : 'Onboard New Employee'
        }
      >
        <EmployeeForm
          initialValues={selectedEmployee}
          onSubmit={
            selectedEmployee
              ? handleUpdate
              : handleCreate
          }
          onCancel={closeModal}
          loading={submitting}
        />
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => {
          if (!submitting) {
            setDeleteId(null);
          }
        }}
        onConfirm={handleDelete}
        title="Delete Employee Record"
        message="Are you sure you want to delete this employee? All linked attendance and payroll records will be permanently removed."
        loading={submitting}
      />

    </div>
  );
};

export default AdminEmployees;