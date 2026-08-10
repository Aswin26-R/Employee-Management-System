import { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import { User, Lock, Bell, Moon } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const { user, updateUser } = useAuth();
  const [profileData, setProfileData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || ''
  });

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    leaveNotifications: true
  });

  const [loading, setLoading] = useState(false);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateUser(profileData);
    toast.success('Profile settings updated successfully!');
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }
    setLoading(true);
    try {
      await authService.changePassword({
        old_password: passwords.oldPassword,
        new_password: passwords.newPassword
      });
      toast.success('Password changed successfully');
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: '900px' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">System & Profile Settings</h1>
          <p className="page-subtitle">Configure account profile, change password, and notification preferences</p>
        </div>
      </div>

      {/* Account Profile Card */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <User size={20} style={{ color: 'var(--primary)' }} /> Profile Information
        </h3>
        <form onSubmit={handleProfileSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Input
              label="First Name"
              value={profileData.first_name}
              onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })}
            />
            <Input
              label="Last Name"
              value={profileData.last_name}
              onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
            />
          </div>
          <Input
            label="Email Address"
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button type="submit">Update Profile</Button>
          </div>
        </form>
      </div>

      {/* Password Change Card */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Lock size={20} style={{ color: 'var(--primary)' }} /> Security & Password
        </h3>
        <form onSubmit={handlePasswordSubmit}>
          <Input
            label="Current Password"
            type="password"
            value={passwords.oldPassword}
            onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
            required
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Input
              label="New Password"
              type="password"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              required
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
              required
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button type="submit" loading={loading}>
              Change Password
            </Button>
          </div>
        </form>
      </div>

      {/* Preferences Card */}
      <div className="card">
        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Bell size={20} style={{ color: 'var(--primary)' }} /> System Preferences
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Email Notifications</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Receive daily digests of pending leaves & attendance checks
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifications.emailAlerts}
              onChange={(e) =>
                setNotifications({ ...notifications, emailAlerts: e.target.checked })
              }
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
            />
          </label>
          <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Theme Mode</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                SaaS Blue Theme (Default Active)
              </div>
            </div>
            <Moon size={20} style={{ color: 'var(--text-muted)' }} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
