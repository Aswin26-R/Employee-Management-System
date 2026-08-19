import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import logo from '../../assets/icons/logo2.png';
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarCheck,
  CalendarDays,
  CreditCard,
  FileBarChart,
  Settings,
  LogOut,
  UserCheck,
  FileText,
} from "lucide-react";

const NAV_CONFIG = {
  Admin: [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Employees", path: "/admin/employees", icon: Users },
    { label: "Departments", path: "/admin/departments", icon: Building2},
    { label: "Attendance", path: "/admin/attendance", icon: CalendarCheck },
    { label: "Leave", path: "/admin/leave", icon: CalendarDays },
    { label: "Payroll", path: "/admin/payroll", icon: CreditCard },
    { label: "Reports", path: "/admin/reports", icon: FileBarChart },
    { label: "Settings", path: "/admin/settings", icon: Settings },
  ],
  HR: [
    { label: "Dashboard", path: "/hr/dashboard", icon: LayoutDashboard },
    { label: "Employees", path: "/hr/employees", icon: Users },
    { label: "Attendance", path: "/hr/attendance", icon: CalendarCheck },
    { label: "Leave", path: "/hr/leave", icon: CalendarDays },
    { label: "Payroll", path: "/hr/payroll", icon: CreditCard },
  ],
  Employee: [
    { label: "Dashboard", path: "/employee/dashboard", icon: LayoutDashboard },
    { label: "My Profile", path: "/employee/profile", icon: UserCheck },
    { label: "Attendance", path: "/employee/attendance", icon: CalendarCheck },
    { label: "My Leave", path: "/employee/leave", icon: CalendarDays },
    { label: "Salary Slip", path: "/employee/salary-slip", icon: FileText },
  ],
};

const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const Sidebar = ({ isOpen, onClose }) => {
  const { user, role, logout } = useAuth();
  const navItems = NAV_CONFIG[role] || NAV_CONFIG.Employee;

  const displayName = user?.first_name
    ? `${user.first_name} ${user.last_name || ""}`.trim()
    : user?.username || "User";

  const handleLogout = () => {
    logout();
    onClose?.();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`sidebar ${isOpen ? "mobile-open" : ""}`}
        aria-label="Main navigation"
      >
        {/* Header */}
        <div className="sidebar-header">
          <div className="logo-container">
            <img src={logo} alt="WorkBalance Suite" className="sidebar-logo" />
          </div>

          <div style={{ minWidth: 0 }}>
            <div className="logo-text">WorkBalance Suite</div>
            <div className="logo-tagline">People. Growth. Success.</div>
          </div>
        </div>
        {/* Role badge */}
        <div className="role-badge-container">
          <span className="role-badge">
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--accent)",
                display: "inline-block",
              }}
            />
            {role} Portal
          </span>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav" role="navigation">
          <div className="sidebar-section-label">Main Menu</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""}`
                }
                onClick={onClose}
                title={item.label}
              >
                <span className="nav-item-icon">
                  <Icon size={18} />
                </span>
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer: user info + logout */}
        <div className="sidebar-footer">
          <div className="sidebar-user-info">
            <div className="sidebar-user-avatar">
              {getInitials(displayName)}
            </div>
            <div style={{ minWidth: 0 }}>
              <div className="sidebar-user-name">{displayName}</div>
              <div className="sidebar-user-email">{user?.email || role}</div>
            </div>
          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
            aria-label="Sign out"
          >
            <LogOut size={17} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
