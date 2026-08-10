const Loader = ({ fullScreen = false, message = 'Loading...' }) => {
  return (
    <div className={`loader-wrapper ${fullScreen ? 'loader-fullscreen' : ''}`} role="status" aria-live="polite">
      <div className="loader-ring" aria-hidden="true" />
      {message && <p className="loader-text">{message}</p>}
    </div>
  );
};

export default Loader;
