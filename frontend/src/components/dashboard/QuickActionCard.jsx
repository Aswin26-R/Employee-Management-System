const QuickActionCard = ({ title, description, icon: Icon, onClick }) => {
  return (
    <div className="quick-action-card" onClick={onClick}>
      <div
        style={{
          width: '42px',
          height: '42px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--primary-light)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {Icon && <Icon size={20} />}
      </div>
      <div>
        <h4
          style={{
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--text-main)'
          }}
        >
          {title}
        </h4>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default QuickActionCard;