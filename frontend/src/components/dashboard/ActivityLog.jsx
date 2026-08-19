const dummyActivities = [
  { id: 1, text: 'Aswin checked in at 09:02 AM', time: '10 mins ago' },
  { id: 2, text: 'Leave request approved for Sarah Connor', time: '45 mins ago' },
  { id: 3, text: 'New employee LeoDas added to Engineering', time: '2 hours ago' },
  { id: 4, text: 'June Payroll generated for 48 employees', time: 'Yesterday' }
];

const ActivityLog = ({ activities = dummyActivities }) => {
  return (
    <div className="card">
      <h3
        style={{
          fontSize: '1rem',
          fontWeight: 600,
          marginBottom: '16px',
          color: 'var(--text-main)'
        }}
      >
        Recent System Activity
      </h3>
      <div className="activity-list">
        {activities.map((act) => (
          <div key={act.id} className="activity-item">
            <div className="activity-dot" />
            <div className="activity-content">
              <p className="activity-text">{act.text}</p>
              <span className="activity-time">{act.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;