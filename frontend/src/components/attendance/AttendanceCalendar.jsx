import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AttendanceCalendar = ({ attendanceRecords = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayIndex = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const getRecordForDay = (day) => {
    const formattedDay = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    return attendanceRecords.find((r) => r.date === formattedDay);
  };

  const dayCells = [];
  for (let i = 0; i < firstDayIndex; i++) {
    dayCells.push(<div key={`empty-${i}`} className="calendar-cell empty" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const record = getRecordForDay(day);
    let statusClass = '';
    if (record) {
      if (record.status === 'Present') statusClass = 'status-present';
      else if (record.status === 'Absent') statusClass = 'status-absent';
      else if (record.status === 'Late' || record.status === 'Half Day') statusClass = 'status-warning';
    }

    dayCells.push(
      <div key={`day-${day}`} className={`calendar-cell ${statusClass}`}>
        <span className="day-number">{day}</span>
        {record && <span className="cell-status-dot" />}
      </div>
    );
  }

  return (
    <div className="card">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm" onClick={handlePrevMonth}>
            <ChevronLeft size={16} />
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleNextMonth}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '8px',
          textAlign: 'center'
        }}
      >
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div
            key={d}
            style={{
              fontWeight: 600,
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              paddingBottom: '8px'
            }}
          >
            {d}
          </div>
        ))}
        {dayCells}
      </div>

      <style>{`
        .calendar-cell {
          height: 60px;
          border-radius: var(--radius-sm);
          background-color: var(--background);
          padding: 6px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          font-size: 0.85rem;
          border: 1px solid var(--border-light);
        }
        .calendar-cell.empty {
          background-color: transparent;
          border: none;
        }
        .status-present {
          background-color: var(--success-light);
          border-color: #a7f3d0;
          color: #065f46;
        }
        .status-absent {
          background-color: var(--danger-light);
          border-color: #fecaca;
          color: #991b1b;
        }
        .status-warning {
          background-color: var(--warning-light);
          border-color: #fde68a;
          color: #92400e;
        }
        .cell-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: currentColor;
        }
      `}</style>
    </div>
  );
};

export default AttendanceCalendar;
