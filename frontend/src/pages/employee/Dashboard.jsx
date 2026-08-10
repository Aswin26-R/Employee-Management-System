import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatsCard from '../../components/dashboard/StatsCard';
import QuickActionCard from '../../components/dashboard/QuickActionCard';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { useAuth } from '../../hooks/useAuth';
import { attendanceService } from '../../services/attendanceService';
import { leaveService } from '../../services/leaveService';
import { payrollService } from '../../services/payrollService';
import {
  LogIn,
  LogOut,
  CalendarCheck,
  CalendarDays,
  FileText,
  UserCheck
} from 'lucide-react';
import toast from 'react-hot-toast';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [leaveBalance, setLeaveBalance] = useState({ casual: 12, sick: 7 });
  const [myAttendanceCount, setMyAttendanceCount] = useState(21);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchEmployeeDashboard = async () => {
      try {
        const [attRes, leaveRes] = await Promise.allSettled([
          attendanceService.getMyAttendance(),
          leaveService.getLeaveBalance()
        ]);

        if (attRes.status === 'fulfilled') {
          const logs = Array.isArray(attRes.value) ? attRes.value : attRes.value.results || [];
          setMyAttendanceCount(logs.length);
          const todayStr = new Date().toISOString().slice(0, 10);
          const todayRecord = logs.find((r) => r.date === todayStr);
          if (todayRecord && todayRecord.check_in && !todayRecord.check_out) {
            setIsCheckedIn(true);
            setCheckInTime(todayRecord.check_in);
          }
        }

        if (leaveRes.status === 'fulfilled') {
          setLeaveBalance(leaveRes.value);
        }
      } catch (err) {
        console.error('Employee dashboard fetch error', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDashboard();
  }, []);

  const handleCheckIn = async () => {
    setActionLoading(true);
    try {
      await attendanceService.checkIn();
      setIsCheckedIn(true);
      setCheckInTime(new Date().toLocaleTimeString());
      toast.success('Successfully checked in today!');
    } catch (err) {
      toast.error('Check-in failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setActionLoading(true);
    try {
      await attendanceService.checkOut();
      setIsCheckedIn(false);
      toast.success('Successfully checked out today!');
    } catch (err) {
      toast.error('Check-out failed');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <Loader message="Loading Employee Workspace..." />;

  const displayName = user?.first_name ? `${user.first_name} ${user.last_name || ''}` : user?.username;

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Welcome back, {displayName}!</h1>
          <p className="page-subtitle">Track your attendance, manage leaves, and view payslips</p>
        </div>
      </div>

      {/* Check In / Out Hero Card */}
      <div
        className="card"
        style={{
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '28px',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase' }}>
            Daily Punch Clock
          </span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '4px' }}>
            {isCheckedIn
              ? `Checked In at ${checkInTime || '09:00 AM'}`
              : 'You have not checked in today'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '4px' }}>
            Shift Hours: 09:00 AM - 06:00 PM (Standard 9h)
          </p>
        </div>

        <div>
          {isCheckedIn ? (
            <Button
              variant="danger"
              size="lg"
              icon={LogOut}
              loading={actionLoading}
              onClick={handleCheckOut}
            >
              Punch Out Now
            </Button>
          ) : (
            <Button
              variant="success"
              size="lg"
              icon={LogIn}
              loading={actionLoading}
              onClick={handleCheckIn}
            >
              Punch In Now
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatsCard
          title="Days Present This Month"
          value={myAttendanceCount}
          icon={CalendarCheck}
          bgColor="#eff6ff"
          iconColor="#2563eb"
        />
        <StatsCard
          title="Casual Leave Balance"
          value={`${leaveBalance.casual ?? 12} Days`}
          icon={CalendarDays}
          bgColor="#ecfdf5"
          iconColor="#059669"
        />
        <StatsCard
          title="Sick Leave Balance"
          value={`${leaveBalance.sick ?? 7} Days`}
          icon={CalendarDays}
          bgColor="#fef3c7"
          iconColor="#d97706"
        />
      </div>

      {/* Quick Navigation Cards */}
      <div className="quick-actions-grid">
        <QuickActionCard
          title="Apply for Leave"
          description="Submit new leave request"
          icon={CalendarDays}
          onClick={() => navigate('/employee/leave')}
        />
        <QuickActionCard
          title="Attendance Log"
          description="View monthly punch history"
          icon={CalendarCheck}
          onClick={() => navigate('/employee/attendance')}
        />
        <QuickActionCard
          title="Download Salary Slip"
          description="View recent payslip details"
          icon={FileText}
          onClick={() => navigate('/employee/salary-slip')}
        />
        <QuickActionCard
          title="My Profile"
          description="Update personal & bank info"
          icon={UserCheck}
          onClick={() => navigate('/employee/profile')}
        />
      </div>
    </div>
  );
};

export default EmployeeDashboard;