import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';

const dummyDeptData = [
  { name: 'Engineering', value: 24 },
  { name: 'Human Resources', value: 8 },
  { name: 'Sales & Marketing', value: 14 },
  { name: 'Finance', value: 6 }
];

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6'];

const DepartmentChart = ({ data = dummyDeptData }) => {
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
        Department Distribution
      </h3>
      <div style={{ flex: 1, width: '100%', minHeight: '260px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DepartmentChart;