const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="app-footer" role="contentinfo">
      <span>
        © {year} <span className="app-footer-brand">WorkforceHR Inc.</span> — All Rights Reserved
      </span>
      <span>v2.0.0 · Enterprise Edition</span>
    </footer>
  );
};

export default Footer;