import { useState, useEffect, useCallback } from 'react';
import AttendanceTable from '../../components/attendance/AttendanceTable';
import AttendanceCalendar from '../../components/attendance/AttendanceCalendar';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import SearchBar from '../../components/common/SearchBar';
import { attendanceService } from '../../services/attendanceService';
import { Calendar, List, Download, UserCheck, Clock, AlertCircle } from 'lucide-react';
import { exportToCSV } from '../../utils/helpers';
import toast from 'react-hot-toast';

const HRAttendance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list');
  const [search, setSearch] = useState('');

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

  const filtered = records.filter((r) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (r.employee_name || '').toLowerCase().includes(q) ||
      (r.date || '').includes(q) ||
      (r.status || '').toLowerCase().includes(q)
    );
  });

  const stats = {
    total: records.length,
    present: records.filter((r) => r.status === 'Present').length,
    absent: records.filter((r) => r.status === 'Absent').length,
    late: records.filter((r) => r.status === 'Late' || r.status === 'Half Day').length
  };

  const handleExport = () => {
    exportToCSV(
      `hr_attendance_${new Date().toISOString().slice(0, 10)}.csv`,
      records,
      { date: 'Date', employee_name: 'Employee', check_in: 'Check In', check_out: 'Check Out', status: 'Status' }
    );
    toast.success('Attendance exported to CSV');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Attendance Management</h1>
          <p className="page-subtitle">Monitor employee check-in times and daily attendance logs</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="secondary" icon={Download} onClick={handleExport}>Export CSV</Button>
          <Button
            variant={viewMode === 'list' ? 'primary' : 'secondary'}
            icon={List}
            onClick={() => setViewMode('list')}
          >
            Table
          </Button>
          <Button
            variant={viewMode === 'calendar' ? 'primary' : 'secondary'}
            icon={Calendar}
            onClick={() => setViewMode('calendar')}
          >
            Calendar
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      {!loading && (
        <div className="stats-grid" style={{ marginBottom: '20px', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {[
            { label: 'Total Records', val: stats.total, icon: List, bg: '#eff6ff', ic: 'var(--primary)' },
            { label: 'Present', val: stats.present, icon: UserCheck, bg: '#dcfce7', ic: 'var(--success)' },
            { label: 'Absent', val: stats.absent, icon: AlertCircle, bg: '#fee2e2', ic: 'var(--danger)' },
            { label: 'Late / Half Day', val: stats.late, icon: Clock, bg: '#fef3c7', ic: 'var(--warning)' }
          ].map(({ label, val, icon: Icon, bg, ic }) => (
            <div key={label} className="stats-card">
              <div>
                <div className="stats-card-label">{label}</div>
                <div className="stats-card-value">{val}</div>
              </div>
              <div className="stats-icon-wrapper" style={{ backgroundColor: bg, color: ic }}>
                <Icon size={22} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Search */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by employee name, date, or status..."
        />
      </div>

      {loading ? (
        <Loader message="Loading attendance records..." />
      ) : viewMode === 'list' ? (
        <AttendanceTable records={filtered} />
      ) : (
        <AttendanceCalendar attendanceRecords={filtered} />
      )}
    </div>
  );
};

export default HRAttendance;
