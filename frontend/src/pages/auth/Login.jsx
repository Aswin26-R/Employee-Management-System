import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import {
  Building2,
  User,
  Lock,
  Users,
  CalendarCheck,
  CreditCard,
  BarChart3,
  Eye,
  EyeOff,
  Shield
} from 'lucide-react';
import toast from 'react-hot-toast';

const FEATURES = [
  { icon: Users, label: 'Employee Management', desc: 'Manage your entire workforce in one place' },
  { icon: CalendarCheck, label: 'Attendance Tracking', desc: 'Real-time punch-in/out and monthly logs' },
  { icon: CreditCard, label: 'Payroll Processing', desc: 'Automated salary generation & payslips' },
  { icon: BarChart3, label: 'Analytics & Reports', desc: 'In-depth HR insights and data exports' }
];

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, role } = useAuth();

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [featureIdx, setFeatureIdx] = useState(0);

  // If already logged in, redirect
  useEffect(() => {
    if (isAuthenticated) {
      if (role === 'Admin') navigate('/admin/dashboard', { replace: true });
      else if (role === 'HR') navigate('/hr/dashboard', { replace: true });
      else navigate('/employee/dashboard', { replace: true });
    }
  }, [isAuthenticated, role, navigate]);

  // Rotate feature highlight
  useEffect(() => {
    const timer = setInterval(() => {
      setFeatureIdx((i) => (i + 1) % FEATURES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.username.trim()) errs.username = 'Username is required';
    if (!formData.password) errs.password = 'Password is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const user = await login(formData.username, formData.password);
      const userRole = user?.role || user?.user_type || 'Employee';
      if (userRole === 'Admin') navigate('/admin/dashboard');
      else if (userRole === 'HR') navigate('/hr/dashboard');
      else navigate('/employee/dashboard');
    } catch {
      // Error already shown by AuthContext
    } finally {
      setLoading(false);
    }
  };

  const FeatureIcon = FEATURES[featureIdx].icon;

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: 'var(--background)',
      fontFamily: 'var(--font-family)'
    }}>
      {/* Left Panel — Branding */}
      <div style={{
        width: '46%',
        background: 'linear-gradient(145deg, #384959 0%, #2e3c4a 50%, #1f2c38 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '48px',
        position: 'relative',
        overflow: 'hidden'
      }} className="login-left-panel">
        {/* Decorative Blobs */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'rgba(106, 137, 167, 0.12)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '-40px', left: '-40px',
          width: '240px', height: '240px', borderRadius: '50%',
          background: 'rgba(136, 205, 242, 0.08)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', top: '40%', right: '-20px',
          width: '120px', height: '120px', borderRadius: '50%',
          background: 'rgba(106, 137, 167, 0.08)', pointerEvents: 'none'
        }} />

        {/* Logo */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '40px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #6A89A7, #88CDF2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(106, 137, 167, 0.4)'
            }}>
              <Building2 size={26} color="white" />
            </div>
            <div>
              <h1 style={{ color: '#fff', fontSize: '1.375rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>
                WorkforceHR
              </h1>
              <p style={{ color: 'rgba(168, 191, 207, 0.8)', fontSize: '0.75rem', marginTop: '2px' }}>
                Enterprise People Management
              </p>
            </div>
          </div>

          <h2 style={{
            color: '#fff', fontSize: '2rem', fontWeight: 800,
            letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '12px', maxWidth: '320px'
          }}>
            Manage People.<br />Grow Together.
          </h2>
          <p style={{ color: 'rgba(168, 191, 207, 0.75)', fontSize: '0.9375rem', lineHeight: 1.6, maxWidth: '300px' }}>
            A comprehensive HR & payroll platform trusted by teams to streamline workforce operations.
          </p>
        </div>

        {/* Animated Feature Card */}
        <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{
            background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)',
            borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)',
            padding: '24px', marginBottom: '28px', animation: 'fadeIn 0.5s ease both'
          }} key={featureIdx}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '10px',
              background: 'rgba(136, 205, 242, 0.15)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', marginBottom: '12px'
            }}>
              <FeatureIcon size={22} color="#88CDF2" />
            </div>
            <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9375rem', marginBottom: '6px' }}>
              {FEATURES[featureIdx].label}
            </div>
            <div style={{ color: 'rgba(168, 191, 207, 0.7)', fontSize: '0.8125rem', lineHeight: 1.5 }}>
              {FEATURES[featureIdx].desc}
            </div>
          </div>

          {/* Dots indicator */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {FEATURES.map((_, i) => (
              <div key={i} style={{
                width: i === featureIdx ? '20px' : '6px',
                height: '6px', borderRadius: '99px',
                background: i === featureIdx ? '#88CDF2' : 'rgba(168,191,207,0.3)',
                transition: 'all 0.4s ease', cursor: 'pointer'
              }} onClick={() => setFeatureIdx(i)} />
            ))}
          </div>
        </div>

        {/* Version tag */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Shield size={14} color="rgba(168,191,207,0.6)" />
          <span style={{ color: 'rgba(168,191,207,0.5)', fontSize: '0.75rem' }}>
            256-bit SSL Encrypted • SOC 2 Compliant
          </span>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 40px',
        backgroundColor: 'var(--background)'
      }}>
        <div style={{ width: '100%', maxWidth: '420px', animation: 'slideInUp 0.4s ease both' }}>
          {/* Header */}
          <div style={{ marginBottom: '36px' }}>
            <h2 style={{
              fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)',
              letterSpacing: '-0.03em', marginBottom: '8px'
            }}>
              Welcome back 👋
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.5 }}>
              Sign in to your WorkforceHR account to continue.
            </p>
          </div>

          {/* Form Card */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)'
          }}>
            <form onSubmit={handleSubmit} noValidate>
              <Input
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                error={errors.username}
                icon={User}
                autoComplete="username"
                autoFocus
              />

              <div className="form-group" style={{ position: 'relative', marginBottom: '24px' }}>
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon-left" style={{ pointerEvents: 'none' }}>
                    <Lock size={16} />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className={`input-field has-icon-left has-icon-right ${errors.password ? 'input-error' : ''}`}
                  />
                  <span
                    className="input-icon-right"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: 'pointer', zIndex: 1 }}
                    role="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </span>
                </div>
                {errors.password && <p className="error-text">{errors.password}</p>}
              </div>

              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: '24px', fontSize: '0.8125rem'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    style={{ accentColor: 'var(--primary)', width: '15px', height: '15px' }}
                  />
                  <span style={{ color: 'var(--text-secondary)' }}>Remember me</span>
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => { e.preventDefault(); toast('Contact your HR administrator to reset your password.'); }}
                  style={{ color: 'var(--primary)', fontWeight: 500 }}
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                style={{ width: '100%', padding: '12px', fontSize: '0.9375rem', justifyContent: 'center' }}
              >
                {loading ? 'Signing In...' : 'Sign In to Dashboard'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div style={{
              marginTop: '20px',
              padding: '12px 16px',
              background: 'var(--background)',
              borderRadius: '8px',
              border: '1px dashed var(--border-color)'
            }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                Demo Credentials
              </p>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>Username: <strong style={{ color: 'var(--text-main)' }}>admin</strong></span>
                <span>Password: <strong style={{ color: 'var(--text-main)' }}>spidey123</strong></span>
              </div>
            </div>
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '24px' }}>
            © {new Date().getFullYear()} WorkforceHR Inc. All rights reserved.
          </p>
        </div>
      </div>

      {/* Responsive: hide left panel on mobile */}
      <style>{`
        @media (max-width: 900px) {
          .login-left-panel { display: none !important; }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Login;