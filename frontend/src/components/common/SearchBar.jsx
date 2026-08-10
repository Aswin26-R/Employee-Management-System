import { Search, X } from 'lucide-react';

const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  className = ''
}) => {
  return (
    <div className={`input-wrapper ${className}`} style={{ minWidth: '260px' }}>
      <span className="input-icon-left">
        <Search size={18} />
      </span>
      <input
        type="text"
        className="input-field has-icon-left has-icon-right"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <span
          className="input-icon-right"
          onClick={() => {
            if (onClear) onClear();
            else onChange('');
          }}
        >
          <X size={18} />
        </span>
      )}
    </div>
  );
};

export default SearchBar;
