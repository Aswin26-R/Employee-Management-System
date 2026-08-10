import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLocation, Link } from 'react-router-dom';
import {
  Menu, Bell, ChevronDown, User, LogOut, Settings,
  LayoutDashboard
} from 'lucide-react';

const getInitials = (name) => {
  if (!name) return 'U';
  return name.split(' ').map((p) => p[0]).join('').toUpperCase().slice(0, 2);
};

const ROUTE_LABELS = {
  admin: 'Admin',
  hr: 'HR',
  employee: 'Employee',
  dashboard: 'Dashboard',
  employees: 'Employees',
  departments: 'Departments',
  attendance: 'Attendance',
  leave: 'Leave Management',
  payroll: 'Payroll',
  reports: 'Reports',
  settings: 'Settings',
  profile: 'My Profile',
  'salary-slip': 'Salary Slip'
};

const Topbar = ({ onToggleSidebar }) => {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const pathParts = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathParts.map((part) => ({
    raw: part,
    label: ROUTE_LABELS[part] || part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ')
  }));

  const displayName = user?.first_name
    ? `${user.first_name} ${user.last_name || ''}`.trim()
    : user?.username || 'User';

  const profilePath = role === 'Employee'
    ? '/employee/profile'
    : role === 'HR'
    ? '/hr/dashboard'
    : '/admin/settings';

  const settingsPath = role === 'Admin' ? '/admin/settings' : null;

  return (
    <header className="topbar" role="banner">
      <div className="topbar-left">
        <button
          className="sidebar-toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={22} />
        </button>

        {/* Breadcrumb */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb">
          <Link
            to={
              role === 'Admin'
                ? '/admin/dashboard'
                : role === 'HR'
                ? '/hr/dashboard'
                : '/employee/dashboard'
            }
            style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
          >
            <LayoutDashboard size={14} style={{ marginRight: '4px' }} />
            Home
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="breadcrumb-separator">/</span>
              <span className={idx === breadcrumbs.length - 1 ? 'breadcrumb-active' : ''}>
                {crumb.label}
              </span>
            </span>
          ))}
        </nav>
      </div>

      <div className="topbar-right">
        {/* Notification Bell */}
        <button
          className="topbar-icon-btn"
          aria-label="Notifications"
          onClick={() => {}}
        >
          <Bell size={18} />
          <span className="topbar-badge">3</span>
        </button>

        {/* User Menu */}
        <div
          className="user-profile-menu"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          ref={dropdownRef}
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setDropdownOpen(!dropdownOpen)}
        >
          <div className="user-avatar" aria-hidden="true">
            {getInitials(displayName)}
          </div>
          <div className="user-info">
            <span className="user-name">{displayName}</span>
            <span className="user-role">{role}</span>
          </div>
          <ChevronDown
            size={15}
            style={{
              color: 'var(--text-muted)',
              transform: dropdownOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s ease'
            }}
          />

          {dropdownOpen && (
            <div className="dropdown-menu" role="menu">
              <div style={{ padding: '10px 12px 8px', borderBottom: '1px solid var(--border-color)', marginBottom: '4px' }}>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-main)' }}>
                  {displayName}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {user?.email || role}
                </div>
              </div>

              <Link
                to={profilePath}
                className="dropdown-item"
                onClick={() => setDropdownOpen(false)}
                role="menuitem"
              >
                <User size={15} />
                <span>Profile</span>
              </Link>

              {settingsPath && (
                <Link
                  to={settingsPath}
                  className="dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                  role="menuitem"
                >
                  <Settings size={15} />
                  <span>Settings</span>
                </Link>
              )}

              <div className="dropdown-divider" />

              <div
                className="dropdown-item danger"
                onClick={() => { setDropdownOpen(false); logout(); }}
                role="menuitem"
                style={{ color: 'var(--danger)' }}
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;