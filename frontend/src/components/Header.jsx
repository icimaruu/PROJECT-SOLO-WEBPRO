function Header({ halamanAktif, onGantiHalaman }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container">
        <a
          className="navbar-brand"
          href="#dashboard"
          onClick={(e) => {
            e.preventDefault();
            onGantiHalaman('dashboard');
          }}
        >
          <span className="brand-icon">
            <i className="bi bi-check2-square"></i>
          </span>
          TaskFlow
        </a>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list fs-2 text-dark"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3">
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link ${halamanAktif === 'dashboard' ? 'active' : ''}`}
                onClick={() => onGantiHalaman('dashboard')}
              >
                <i className="bi bi-grid-1x2"></i> Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link ${halamanAktif === 'tugas' ? 'active' : ''}`}
                onClick={() => onGantiHalaman('tugas')}
              >
                <i className="bi bi-card-checklist"></i> Daftar Tugas
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link ${halamanAktif === 'tambah' ? 'active' : ''}`}
                onClick={() => onGantiHalaman('tambah')}
              >
                <i className="bi bi-plus-circle"></i> Tambah Tugas
              </button>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            <button
              type="button"
              onClick={() => onGantiHalaman('tambah')}
              className="btn btn-primary d-none d-sm-inline-flex align-items-center gap-2"
            >
              <i className="bi bi-plus-lg"></i> Tugas Baru
            </button>

            <div className="dropdown">
              <a
                href="#user"
                onClick={(e) => e.preventDefault()}
                className="d-flex align-items-center text-decoration-none dropdown-toggle text-dark ps-2"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://ui-avatars.com/api/?name=Mahasiswa+Webpro&background=4f46e5&color=fff&rounded=true"
                  alt="User"
                  width="36"
                  height="36"
                  className="rounded-circle me-2"
                />
                <span className="d-none d-md-inline fw-semibold small">Mahasiswa</span>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end shadow-sm border-0"
                aria-labelledby="userDropdown"
              >
                <li>
                  <h6 className="dropdown-header">Akun Terhubung</h6>
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => onGantiHalaman('dashboard')}
                  >
                    <i className="bi bi-person me-2"></i> Profil
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => onGantiHalaman('dashboard')}
                  >
                    <i className="bi bi-gear me-2"></i> Pengaturan
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item text-danger"
                    onClick={() => onGantiHalaman('login')}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i> Keluar
                  </button>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onGantiHalaman('login')}
              className="btn btn-outline-secondary btn-sm ms-2"
              title="Halaman Login"
            >
              <i className="bi bi-box-arrow-in-right"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;