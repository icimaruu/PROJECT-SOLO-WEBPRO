function Footer() {
  return (
    <footer className="mt-auto">
      <div className="container d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
        <div className="text-center text-sm-start">
          <span className="fw-bold text-dark">
            <i className="bi bi-check2-square text-primary me-1"></i>TaskFlow
          </span>{' '}
          &copy; 2026 - Tugas Kuliah Pemrograman Web
        </div>
        <div className="text-muted small">
          Dibangun dengan <span className="text-primary fw-semibold">React</span> &amp; Bootstrap 5.3
        </div>
      </div>
    </footer>
  );
}

export default Footer;