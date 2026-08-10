import { useState, useEffect, useCallback } from 'react';
import DepartmentTable from '../../components/department/DepartmentTable';
import DepartmentForm from '../../components/department/DepartmentForm';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Loader from '../../components/common/Loader';
import { departmentService } from '../../services/departmentService';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchDepartments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await departmentService.getAll();
      const list = Array.isArray(data) ? data : data.results || [];
      setDepartments(list);
    } catch {
      toast.error('Failed to load departments');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const handleCreate = async (formData) => {
    setSubmitting(true);
    try {
      await departmentService.create(formData);
      toast.success('Department created successfully');
      setIsModalOpen(false);
      fetchDepartments();
    } catch {
      toast.error('Failed to create department');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (formData) => {
    setSubmitting(true);
    try {
      await departmentService.update(selectedDept.id, formData);
      toast.success('Department updated');
      setIsModalOpen(false);
      setSelectedDept(null);
      fetchDepartments();
    } catch {
      toast.error('Failed to update department');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setSubmitting(true);
    try {
      await departmentService.delete(deleteId);
      toast.success('Department deleted');
      setDeleteId(null);
      fetchDepartments();
    } catch {
      toast.error('Failed to delete department');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Departments</h1>
          <p className="page-subtitle">Configure organizational departments & teams</p>
        </div>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => {
            setSelectedDept(null);
            setIsModalOpen(true);
          }}
        >
          Add Department
        </Button>
      </div>

      {loading ? (
        <Loader message="Loading departments..." />
      ) : (
        <DepartmentTable
          departments={departments}
          onEdit={(dept) => {
            setSelectedDept(dept);
            setIsModalOpen(true);
          }}
          onDelete={(id) => setDeleteId(id)}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedDept ? 'Edit Department' : 'Create New Department'}
      >
        <DepartmentForm
          initialValues={selectedDept}
          onSubmit={selectedDept ? handleUpdate : handleCreate}
          onCancel={() => setIsModalOpen(false)}
          loading={submitting}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Department"
        message="Are you sure you want to remove this department?"
        loading={submitting}
      />
    </div>
  );
};

export default AdminDepartments;
