import KartuTugas from './KartuTugas';

function DaftarTugas({
  daftarTugas,
  mode = 'tabel-lengkap',
  onToggleStatus,
  onHapusTugas,
  onLihatDetail,
}) {
  if (daftarTugas.length === 0) {
    return (
      <div className="text-center py-5 px-3">
        <i className="bi bi-inbox text-muted display-4 d-block mb-2"></i>
        <p className="fw-semibold text-muted mb-0">Belum ada data Tugas</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          {mode === 'dashboard' ? (
            <tr>
              <th scope="col" style={{ width: '5%' }}>No</th>
              <th scope="col" style={{ width: '35%' }}>Nama Tugas</th>
              <th scope="col" style={{ width: '20%' }}>Mata Kuliah</th>
              <th scope="col" style={{ width: '15%' }}>Prioritas</th>
              <th scope="col" style={{ width: '15%' }}>Tenggat</th>
              <th scope="col" style={{ width: '10%' }}>Status</th>
            </tr>
          ) : (
            <tr>
              <th scope="col" className="text-center" style={{ width: '5%' }}>No</th>
              <th scope="col" style={{ width: '30%' }}>Judul Tugas & Deskripsi</th>
              <th scope="col" style={{ width: '18%' }}>Mata Kuliah</th>
              <th scope="col" style={{ width: '12%' }}>Prioritas</th>
              <th scope="col" style={{ width: '15%' }}>Tenggat Waktu</th>
              <th scope="col" style={{ width: '10%' }}>Status</th>
              <th scope="col" className="text-end" style={{ width: '10%' }}>Aksi</th>
            </tr>
          )}
        </thead>
        <tbody>
          {daftarTugas.map((tugas, index) => (
            <KartuTugas
              key={tugas.id}
              tugas={tugas}
              index={index}
              mode={mode}
              onToggleStatus={onToggleStatus}
              onHapusTugas={onHapusTugas}
              onLihatDetail={onLihatDetail}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DaftarTugas;