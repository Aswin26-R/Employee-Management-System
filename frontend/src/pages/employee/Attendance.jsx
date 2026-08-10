import { useState, useEffect } from 'react';
import AttendanceTable from '../../components/attendance/AttendanceTable';
import AttendanceCalendar from '../../components/attendance/AttendanceCalendar';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { attendanceService } from '../../services/attendanceService';
import { Calendar, List } from 'lucide-react';

const EmployeeAttendance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list');

  useEffect(() => {
    const fetchMyLogs = async () => {
      try {
        const data = await attendanceService.getMyAttendance();
        const list = Array.isArray(data) ? data : data.results || [];
        setRecords(list);
      } catch (err) {
        console.error('Failed to load my attendance', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyLogs();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Attendance History</h1>
          <p className="page-subtitle">Inspect your daily check-in times and monthly status logs</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
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

export default EmployeeAttendance;
