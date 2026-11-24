function RingkasanTugas({ daftarTugas }) {
  const totalTugas = daftarTugas.length;
  const sedangBerjalan = daftarTugas.filter((t) => t.status === 'In Progress').length;
  const tugasSelesai = daftarTugas.filter((t) => t.status === 'Completed').length;
  const prioritasTinggi = daftarTugas.filter(
    (t) => t.prioritas === 'High' && t.status !== 'Completed'
  ).length;

  const persentaseSelesai =
    totalTugas > 0 ? Math.round((tugasSelesai / totalTugas) * 100) : 0;

  return (
    <div className="row g-3 mb-4">
      {/* Card 1: Total Tugas */}
      <div className="col-12 col-sm-6 col-xl-3">
        <div className="card card-hover h-100 p-3">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <p className="text-muted small fw-semibold text-uppercase mb-1">Total Tugas</p>
              <h3 className="fw-bold mb-0 text-dark">{totalTugas}</h3>
              <small className="text-muted">
                <i className="bi bi-clock me-1"></i>Semester 5
              </small>
            </div>
            <div className="stat-icon-wrapper bg-primary-subtle-custom">
              <i className="bi bi-journal-text"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Sedang Berjalan */}
      <div className="col-12 col-sm-6 col-xl-3">
        <div className="card card-hover h-100 p-3">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <p className="text-muted small fw-semibold text-uppercase mb-1">Sedang Berjalan</p>
              <h3 className="fw-bold mb-0 text-primary">{sedangBerjalan}</h3>
              <small className="text-info">
                <i className="bi bi-arrow-repeat me-1"></i>Sedang dikerjakan
              </small>
            </div>
            <div className="stat-icon-wrapper bg-primary-subtle-custom">
              <i className="bi bi-hourglass-split"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Tugas Selesai */}
      <div className="col-12 col-sm-6 col-xl-3">
        <div className="card card-hover h-100 p-3">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <p className="text-muted small fw-semibold text-uppercase mb-1">Tugas Selesai</p>
              <h3 className="fw-bold mb-0 text-success">{tugasSelesai}</h3>
              <small className="text-success">
                <i className="bi bi-check-circle me-1"></i>
                {persentaseSelesai}% terselesaikan
              </small>
            </div>
            <div className="stat-icon-wrapper bg-success-subtle-custom">
              <i className="bi bi-check2-circle"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Card 4: Prioritas Tinggi */}
      <div className="col-12 col-sm-6 col-xl-3">
        <div className="card card-hover h-100 p-3">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <p className="text-muted small fw-semibold text-uppercase mb-1">Prioritas Tinggi</p>
              <h3 className="fw-bold mb-0 text-danger">{prioritasTinggi}</h3>
              <small className="text-danger">
                <i className="bi bi-exclamation-triangle me-1"></i>Perlu perhatian
              </small>
            </div>
            <div className="stat-icon-wrapper bg-danger-subtle-custom">
              <i className="bi bi-fire"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RingkasanTugas;