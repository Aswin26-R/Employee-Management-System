import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel = 'vs last month',
  bgColor = '#eff6ff',
  iconColor = '#2563eb'
}) => {
  const isPositive = trend > 0;

  return (
    <div className="stats-card">
      <div>
        <span
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            fontWeight: 500
          }}
        >
          {title}
        </span>
        <h3
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            margin: '6px 0',
            color: 'var(--text-main)'
          }}
        >
          {value}
        </h3>
        {trend !== undefined && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              color: isPositive ? 'var(--success)' : 'var(--danger)'
            }}
          >
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>
              {isPositive ? `+${trend}%` : `${trend}%`} {trendLabel}
            </span>
          </div>
        )}
      </div>

      <div
        className="stats-icon-wrapper"
        style={{ backgroundColor: bgColor, color: iconColor }}
      >
        {Icon && <Icon size={24} />}
      </div>
    </div>
  );
};

export default StatsCard;