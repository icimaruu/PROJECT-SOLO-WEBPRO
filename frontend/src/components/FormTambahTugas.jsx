import { useState } from 'react';

function FormTambahTugas({ onTambahTugas, onGantiHalaman }) {
  const [judul, setJudul] = useState('');
  const [mataKuliah, setMataKuliah] = useState('');
  const [kategori, setKategori] = useState('Individu');
  const [prioritas, setPrioritas] = useState('Medium');
  const [status, setStatus] = useState('Pending');
  const [tenggat, setTenggat] = useState('');
  const [jam, setJam] = useState('23:59');
  const [deskripsi, setDeskripsi] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const formatTanggalIndo = (isoDate) => {
    if (!isoDate) return '';
    const bulan = [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
    ];
    const [tahun, bln, tgl] = isoDate.split('-');
    return `${parseInt(tgl, 10)} ${bulan[parseInt(bln, 10) - 1]} ${tahun}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!judul.trim() || !mataKuliah || !tenggat) {
      setErrorMsg('Nama tugas, mata kuliah, dan tenggat waktu wajib diisi.');
      return;
    }

    onTambahTugas({
      judul: judul.trim(),
      mataKuliah,
      kategori,
      prioritas,
      status,
      tenggat: formatTanggalIndo(tenggat),
      jam,
      deskripsi: deskripsi.trim() || 'Tidak ada catatan tambahan.',
    });

    setJudul('');
    setMataKuliah('');
    setKategori('Individu');
    setPrioritas('Medium');
    setStatus('Pending');
    setTenggat('');
    setJam('23:59');
    setDeskripsi('');
    setErrorMsg('');
  };

  return (
    <div className="container">
      {/* Breadcrumb & Header */}
      <div className="mb-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-1 small">
            <li className="breadcrumb-item">
              <a
                href="#home"
                className="text-decoration-none"
                onClick={(e) => {
                  e.preventDefault();
                  onGantiHalaman('dashboard');
                }}
              >
                Home
              </a>
            </li>
            <li className="breadcrumb-item">
              <a
                href="#tugas"
                className="text-decoration-none"
                onClick={(e) => {
                  e.preventDefault();
                  onGantiHalaman('tugas');
                }}
              >
                Daftar Tugas
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Tambah Tugas
            </li>
          </ol>
        </nav>
        <h2 className="fw-bold text-dark mb-0">Formulir Tambah Tugas</h2>
        <p className="text-muted small mb-0">
          Masukkan rincian penugasan baru untuk melacak perkembangan studi Anda.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3 border-bottom d-flex align-items-center gap-2">
              <i className="bi bi-pencil-square text-primary fs-5"></i>
              <h5 className="card-title mb-0 fw-bold">Informasi Detail Tugas</h5>
            </div>

            <div className="card-body p-4">
              {errorMsg && (
                <div className="alert alert-danger py-2 small" role="alert">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Judul Tugas */}
                <div className="mb-3">
                  <label htmlFor="taskTitle" className="form-label">
                    Nama / Judul Tugas <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="taskTitle"
                    placeholder="Contoh: Modul 6 React Komponen & State"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    required
                  />
                </div>

                {/* Grid Row 1: Mata Kuliah & Kategori */}
                <div className="row g-3 mb-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="courseSelect" className="form-label">
                      Mata Kuliah <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      id="courseSelect"
                      value={mataKuliah}
                      onChange={(e) => setMataKuliah(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Pilih Mata Kuliah...
                      </option>
                      <option value="Pemrograman Web">Pemrograman Web</option>
                      <option value="Rekayasa Web">Rekayasa Web</option>
                      <option value="Proyek Fullstack">Proyek Fullstack</option>
                      <option value="Basis Data Lanjut">Basis Data Lanjut</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="categorySelect" className="form-label">
                      Kategori Tugas
                    </label>
                    <select
                      className="form-select"
                      id="categorySelect"
                      value={kategori}
                      onChange={(e) => setKategori(e.target.value)}
                    >
                      <option value="Individu">Tugas Individu</option>
                      <option value="Kelompok">Tugas Kelompok / Proyek Tim</option>
                      <option value="Praktikum">Laporan Praktikum</option>
                      <option value="Ujian">Persiapan Ujian / Kuis</option>
                    </select>
                  </div>
                </div>

                {/* Grid Row 2: Prioritas & Status Awal */}
                <div className="row g-3 mb-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label d-block">
                      Tingkat Prioritas <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex gap-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="priorityRadio"
                          id="prioLow"
                          value="Low"
                          checked={prioritas === 'Low'}
                          onChange={(e) => setPrioritas(e.target.value)}
                        />
                        <label className="form-check-label text-secondary" htmlFor="prioLow">
                          Low
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="priorityRadio"
                          id="prioMed"
                          value="Medium"
                          checked={prioritas === 'Medium'}
                          onChange={(e) => setPrioritas(e.target.value)}
                        />
                        <label
                          className="form-check-label text-warning fw-semibold"
                          htmlFor="prioMed"
                        >
                          Medium
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="priorityRadio"
                          id="prioHigh"
                          value="High"
                          checked={prioritas === 'High'}
                          onChange={(e) => setPrioritas(e.target.value)}
                        />
                        <label
                          className="form-check-label text-danger fw-semibold"
                          htmlFor="prioHigh"
                        >
                          High
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="statusSelect" className="form-label">
                      Status Awal
                    </label>
                    <select
                      className="form-select"
                      id="statusSelect"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Pending">Pending (Belum Dikerjakan)</option>
                      <option value="In Progress">In Progress (Sedang Dikerjakan)</option>
                      <option value="Completed">Completed (Sudah Selesai)</option>
                    </select>
                  </div>
                </div>

                {/* Grid Row 3: Tenggat Waktu (Tanggal & Jam) */}
                <div className="row g-3 mb-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="dueDate" className="form-label">
                      Tenggat Waktu (Deadline) <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dueDate"
                      value={tenggat}
                      onChange={(e) => setTenggat(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="dueTime" className="form-label">
                      Jam Batas Pengumpulan
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="dueTime"
                      value={jam}
                      onChange={(e) => setJam(e.target.value)}
                    />
                  </div>
                </div>

                {/* Deskripsi / Catatan Tugas */}
                <div className="mb-4">
                  <label htmlFor="taskNotes" className="form-label">
                    Deskripsi atau Catatan Tambahan
                  </label>
                  <textarea
                    className="form-control"
                    id="taskNotes"
                    rows="3"
                    placeholder="Tuliskan instruksi tugas, kriteria penilaian, atau catatan penting..."
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                  />
                </div>

                <hr className="my-4" />

                {/* Tombol Aksi Form */}
                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    onClick={() => onGantiHalaman('tugas')}
                    className="btn btn-light px-4"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary px-4 d-inline-flex align-items-center gap-2"
                  >
                    <i className="bi bi-plus-lg"></i> Tambah
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormTambahTugas;