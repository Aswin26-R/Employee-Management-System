import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

const dummySalaryData = [
  { month: 'Jan', expense: 42000 },
  { month: 'Feb', expense: 43500 },
  { month: 'Mar', expense: 45000 },
  { month: 'Apr', expense: 44000 },
  { month: 'May', expense: 48000 },
  { month: 'Jun', expense: 51000 }
];

const SalaryChart = ({ data = dummySalaryData }) => {
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
        Monthly Salary Expense ($)
      </h3>
      <div style={{ flex: 1, width: '100%', minHeight: '260px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip
              formatter={(value) => [`$${value.toLocaleString()}`, 'Expense']}
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
            <Bar dataKey="expense" fill="#10b981" radius={[6, 6, 0, 0]} barSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalaryChart;