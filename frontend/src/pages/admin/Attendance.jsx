import { useState, useEffect, useCallback } from 'react';
import AttendanceTable from '../../components/attendance/AttendanceTable';
import AttendanceCalendar from '../../components/attendance/AttendanceCalendar';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { attendanceService } from '../../services/attendanceService';
import { Calendar, List, Download } from 'lucide-react';
import { exportToCSV } from '../../utils/helpers';
import toast from 'react-hot-toast';

const AdminAttendance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list');

  const fetchAttendance = useCallback(async () => {
    setLoading(true);
    try {
      const data = await attendanceService.getAll();
      const list = Array.isArray(data) ? data : data.results || [];
      setRecords(list);
    } catch {
      toast.error('Failed to load attendance records');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  const handleExport = () => {
    exportToCSV(
      `attendance_report_${new Date().toISOString().slice(0, 10)}.csv`,
      records,
      {
        date: 'Date',
        employee_name: 'Employee',
        check_in: 'Check In',
        check_out: 'Check Out',
        status: 'Status'
      }
    );
    toast.success('Attendance CSV downloaded');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Attendance Tracking</h1>
          <p className="page-subtitle">Monitor check-in times and monthly attendance logs</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="secondary" icon={Download} onClick={handleExport}>
            Export CSV
          </Button>
          <div style={{ display: 'flex', gap: '4px' }}>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'secondary'}
              icon={List}
              onClick={() => setViewMode('list')}
            >
              Table View
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'primary' : 'secondary'}
              icon={Calendar}
              onClick={() => setViewMode('calendar')}
            >
              Calendar View
            </Button>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader message="Loading attendance logs..." />
      ) : viewMode === 'list' ? (
        <AttendanceTable records={records} />
      ) : (
        <AttendanceCalendar attendanceRecords={records} />
      )}
    </div>
  );
};

export default AdminAttendance;
