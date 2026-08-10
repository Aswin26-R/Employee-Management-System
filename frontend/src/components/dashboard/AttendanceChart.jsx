import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

const dummyAttendanceData = [
  { day: 'Mon', present: 45, absent: 3, leave: 2 },
  { day: 'Tue', present: 47, absent: 1, leave: 2 },
  { day: 'Wed', present: 46, absent: 2, leave: 2 },
  { day: 'Thu', present: 48, absent: 0, leave: 2 },
  { day: 'Fri', present: 44, absent: 4, leave: 2 },
  { day: 'Sat', present: 20, absent: 25, leave: 5 }
];

const AttendanceChart = ({ data = dummyAttendanceData }) => {
  return (
    <div className="card" style={{ height: '360px', display: 'flex', flexDirection: 'column' }}>
      <h3
        style={{
          fontSize: '1rem',
          fontWeight: 600,
          marginBottom: '16px',
          color: 'var(--text-main)'
        }}
      >
        Weekly Attendance Trend
      </h3>
      <div style={{ flex: 1, width: '100%', minHeight: '260px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
            <Area
              type="monotone"
              dataKey="present"
              stroke="#2563eb"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorPresent)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceChart;