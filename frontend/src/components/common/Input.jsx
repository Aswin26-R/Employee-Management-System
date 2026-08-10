import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  error,
  icon: Icon = null,
  required = false,
  className = '',
  disabled = false,
  register = null,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const registerProps = register && name ? register(name, { required }) : {};

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label className="form-label">
          {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
        </label>
      )}
      <div className="input-wrapper">
        {Icon && (
          <span className="input-icon-left">
            <Icon size={18} />
          </span>
        )}
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`input-field ${error ? 'input-error' : ''} ${
            Icon ? 'has-icon-left' : ''
          } ${isPassword ? 'has-icon-right' : ''}`}
          {...registerProps}
          {...props}
        />
        {isPassword && (
          <span
            className="input-icon-right"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        )}
      </div>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default Input;
