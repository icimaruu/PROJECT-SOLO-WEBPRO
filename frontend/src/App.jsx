import { useState, useEffect } from 'react';
import Header from './components/Header';
import RingkasanTugas from './components/RingkasanTugas';
import DaftarTugas from './components/DaftarTugas';
import FormTambahTugas from './components/FormTambahTugas';
import Footer from './components/Footer';
import './App.css';

const API_URL = 'http://localhost:3000/tasks';

function App() {
  const [daftarTugas, setDaftarTugas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorApi, setErrorApi] = useState('');
  const [halamanAktif, setHalamanAktif] = useState('dashboard');
  const [kataKunci, setKataKunci] = useState('');
  const [filterMatkul, setFilterMatkul] = useState('Semua');
  const [filterPrioritas, setFilterPrioritas] = useState('Semua');
  const [tugasDetail, setTugasDetail] = useState(null);

  // 1. READ ALL: Ambil data tugas dari Backend NestJS + Prisma
  const fetchTugas = async () => {
    try {
      setLoading(true);
      setErrorApi('');
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Gagal mengambil data dari server');
      const data = await res.json();
      setDaftarTugas(data);
    } catch (err) {
      setErrorApi('Tidak dapat terhubung ke Backend (http://localhost:3000). Pastikan server NestJS aktif.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTugas();
  }, []);

  // 2. CREATE: Tambah tugas baru ke PostgreSQL via POST /tasks
  const handleTambahTugas = async (tugasBaru) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tugasBaru),
      });
      if (!res.ok) throw new Error('Gagal menyimpan tugas');
      const created = await res.json();
      setDaftarTugas((prev) => [created, ...prev]);
      setHalamanAktif('tugas');
    } catch (err) {
      alert('Gagal menambahkan tugas ke database.');
    }
  };

  // 3. UPDATE: Ubah status selesai/belum via PATCH /tasks/:id
  const handleToggleStatus = async (id) => {
    const target = daftarTugas.find((t) => t.id === id);
    if (!target) return;

    const statusBaru = target.status === 'Completed' ? 'In Progress' : 'Completed';
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: statusBaru }),
      });
      if (!res.ok) throw new Error('Gagal memperbarui status');
      const updated = await res.json();
      setDaftarTugas((prev) =>
        prev.map((item) => (item.id === id ? updated : item))
      );
    } catch (err) {
      alert('Gagal mengubah status tugas.');
    }
  };

  // 4. DELETE: Hapus tugas dari PostgreSQL via DELETE /tasks/:id
  const handleHapusTugas = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Gagal menghapus tugas');
      setDaftarTugas((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert('Gagal menghapus tugas.');
    }
  };

  const resetFilter = () => {
    setKataKunci('');
    setFilterMatkul('Semua');
    setFilterPrioritas('Semua');
  };

  const tugasTerfilter = daftarTugas.filter((item) => {
    const cocokCari =
      item.judul.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(kataKunci.toLowerCase());
    const cocokMatkul =
      filterMatkul === 'Semua' || item.mataKuliah === filterMatkul;
    const cocokPrioritas =
      filterPrioritas === 'Semua' || item.prioritas === filterPrioritas;
    return cocokCari && cocokMatkul && cocokPrioritas;
  });

  const totalSelesai = daftarTugas.filter((t) => t.status === 'Completed').length;
  const persentaseProgres =
    daftarTugas.length > 0 ? Math.round((totalSelesai / daftarTugas.length) * 100) : 0;

  if (halamanAktif === 'login') {
    return (
      <div className="bg-light d-flex flex-column min-vh-100 justify-content-between">
        <nav className="navbar navbar-light bg-white border-bottom">
          <div className="container">
            <a
              className="navbar-brand"
              href="#dashboard"
              onClick={(e) => {
                e.preventDefault();
                setHalamanAktif('dashboard');
              }}
            >
              <span className="brand-icon">
                <i className="bi bi-check2-square"></i>
              </span>
              TaskFlow
            </a>
            <button
              type="button"
              onClick={() => setHalamanAktif('dashboard')}
              className="btn btn-sm btn-outline-secondary"
            >
              <i className="bi bi-arrow-left me-1"></i> Kembali ke Dashboard
            </button>
          </div>
        </nav>

        <main className="container my-auto py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
              <div className="card auth-card border-0 shadow-sm p-4 p-md-5">
                <div className="text-center mb-4">
                  <span
                    className="brand-icon mx-auto mb-3"
                    style={{ width: '50px', height: '50px', fontSize: '1.5rem' }}
                  >
                    <i className="bi bi-shield-lock"></i>
                  </span>
                  <h3 className="fw-bold text-dark mb-1">Selamat Datang</h3>
                  <p className="text-muted small">
                    Masuk dengan akun mahasiswa untuk mengelola tugas perkuliahan Anda.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setHalamanAktif('dashboard');
                  }}
                >
                  <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label">
                      Email Kampus / NIM
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted border-end-0">
                        <i className="bi bi-envelope"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0 ps-0"
                        id="loginEmail"
                        defaultValue="mahasiswa@student.telkomuniversity.ac.id"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">
                      Kata Sandi
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted border-end-0">
                        <i className="bi bi-key"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control border-start-0 ps-0"
                        id="loginPassword"
                        defaultValue="password123"
                        required
                      />
                    </div>
                  </div>

                  <div className="d-grid mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                    >
                      <i className="bi bi-box-arrow-in-right"></i> Masuk ke TaskFlow
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <>
      <Header halamanAktif={halamanAktif} onGantiHalaman={setHalamanAktif} />

      <main className="py-4">
        {errorApi && (
          <div className="container mb-3">
            <div className="alert alert-warning d-flex justify-content-between align-items-center">
              <span>
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {errorApi}
              </span>
              <button className="btn btn-sm btn-outline-dark" onClick={fetchTugas}>
                Coba Lagi
              </button>
            </div>
          </div>
        )}

        {halamanAktif === 'dashboard' && (
          <div className="container">
            <div className="hero-banner">
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <span className="badge bg-light text-primary mb-2 px-3 py-2 rounded-pill fw-semibold">
                    <i className="bi bi-stars"></i> Fullstack Task Management System
                  </span>
                  <h1 className="h2 fw-bold text-white mb-2">
                    Kelola Tugas Perkuliahan Anda Lebih Mudah!
                  </h1>
                  <p className="text-white-50 mb-3 fs-6">
                    Terhubung langsung dengan NestJS REST API &amp; PostgreSQL melalui Prisma ORM.
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setHalamanAktif('tambah')}
                      className="btn btn-light text-primary fw-bold"
                    >
                      <i className="bi bi-plus-lg me-1"></i> Buat Tugas Baru
                    </button>
                    <button
                      type="button"
                      onClick={() => setHalamanAktif('tugas')}
                      className="btn btn-outline-light fw-semibold"
                    >
                      <i className="bi bi-list-task me-1"></i> Lihat Semua Tugas
                    </button>
                  </div>
                </div>
                <div className="col-lg-4 d-none d-lg-flex justify-content-center">
                  <i
                    className="bi bi-calendar2-check text-white opacity-25"
                    style={{ fontSize: '8rem' }}
                  ></i>
                </div>
              </div>
            </div>

            <RingkasanTugas daftarTugas={daftarTugas} />

            <div className="row g-4">
              <div className="col-12 col-lg-8">
                <div className="card h-100">
                  <div className="card-header bg-white py-3 border-bottom d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-list-task text-primary fs-5"></i>
                      <h5 className="card-title mb-0 fw-bold">Tugas Aktif &amp; Prioritas</h5>
                    </div>
                    <button
                      type="button"
                      onClick={() => setHalamanAktif('tugas')}
                      className="btn btn-sm btn-outline-primary"
                    >
                      Selengkapnya <i className="bi bi-arrow-right ms-1"></i>
                    </button>
                  </div>

                  <div className="card-body p-0">
                    {loading ? (
                      <div className="text-center py-5 text-muted">Memuat data dari server...</div>
                    ) : (
                      <DaftarTugas daftarTugas={daftarTugas.slice(0, 4)} mode="dashboard" />
                    )}
                  </div>

                  <div className="card-footer bg-white text-muted small py-3 d-flex justify-content-between align-items-center">
                    <span>
                      Menampilkan {Math.min(4, daftarTugas.length)} dari {daftarTugas.length} tugas
                    </span>
                    <button
                      type="button"
                      onClick={() => setHalamanAktif('tambah')}
                      className="btn btn-link p-0 text-primary text-decoration-none fw-semibold small"
                    >
                      <i className="bi bi-plus-circle me-1"></i> Tambah tugas baru
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-4">
                <div className="card mb-4 p-3">
                  <h6 className="fw-bold text-dark mb-3">
                    <i className="bi bi-speedometer2 text-primary me-2"></i>Target Mingguan
                  </h6>
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="small text-muted">Progres Penyelesaian</span>
                    <span className="fw-bold small text-primary">{persentaseProgres}%</span>
                  </div>
                  <div className="progress mb-3" style={{ height: '10px' }}>
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: `${persentaseProgres}%` }}
                    ></div>
                  </div>
                  <p className="small text-muted mb-0">
                    <i className="bi bi-info-circle text-info me-1"></i> {totalSelesai} dari{' '}
                    {daftarTugas.length} tugas telah selesai.
                  </p>
                </div>

                <div className="card p-3">
                  <h6 className="fw-bold text-dark mb-3">
                    <i className="bi bi-lightning-charge text-warning me-2"></i>Aksi Cepat
                  </h6>
                  <div className="d-grid gap-2">
                    <button
                      type="button"
                      onClick={() => setHalamanAktif('tambah')}
                      className="btn btn-outline-primary text-start d-flex align-items-center justify-content-between"
                    >
                      <span>
                        <i className="bi bi-file-earmark-plus me-2"></i> Form Entri Tugas Baru
                      </span>
                      <i className="bi bi-chevron-right small"></i>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHalamanAktif('tugas')}
                      className="btn btn-outline-secondary text-start d-flex align-items-center justify-content-between"
                    >
                      <span>
                        <i className="bi bi-table me-2"></i> Kelola Seluruh Data Tabel
                      </span>
                      <i className="bi bi-chevron-right small"></i>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHalamanAktif('login')}
                      className="btn btn-outline-dark text-start d-flex align-items-center justify-content-between"
                    >
                      <span>
                        <i className="bi bi-shield-lock me-2"></i> Halaman Autentikasi Login
                      </span>
                      <i className="bi bi-chevron-right small"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {halamanAktif === 'tugas' && (
          <div className="container">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
              <div>
                <h2 className="fw-bold text-dark mb-0">Semua Data Tugas</h2>
                <p className="text-muted small mb-0">
                  Data tersimpan secara permanen di database PostgreSQL melalui Prisma.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setHalamanAktif('tambah')}
                className="btn btn-primary d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-plus-lg"></i> Tambah Tugas
              </button>
            </div>

            <div className="card mb-4 p-3 border-0 shadow-sm">
              <div className="row g-2 align-items-center">
                <div className="col-12 col-md-4">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0 text-muted">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0 ps-0"
                      placeholder="Cari nama tugas atau materi..."
                      value={kataKunci}
                      onChange={(e) => setKataKunci(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <select
                    className="form-select"
                    value={filterMatkul}
                    onChange={(e) => setFilterMatkul(e.target.value)}
                  >
                    <option value="Semua">Semua Mata Kuliah</option>
                    <option value="Pemrograman Web">Pemrograman Web</option>
                    <option value="Rekayasa Web">Rekayasa Web</option>
                    <option value="Proyek Fullstack">Proyek Fullstack</option>
                    <option value="Basis Data Lanjut">Basis Data Lanjut</option>
                  </select>
                </div>
                <div className="col-6 col-md-3">
                  <select
                    className="form-select"
                    value={filterPrioritas}
                    onChange={(e) => setFilterPrioritas(e.target.value)}
                  >
                    <option value="Semua">Semua Prioritas</option>
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
                <div className="col-12 col-md-2 d-grid">
                  <button
                    type="button"
                    onClick={resetFilter}
                    className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2"
                  >
                    <i className="bi bi-funnel"></i> Reset Filter
                  </button>
                </div>
              </div>
            </div>

            <div className="card shadow-sm border-0 overflow-hidden">
              <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
                <span className="fw-bold text-dark">
                  <i className="bi bi-table text-primary me-2"></i>Tabel Data Tugas Kuliah
                </span>
                <span className="badge bg-light text-secondary border">
                  Total: {tugasTerfilter.length} Tugas Ditampilkan
                </span>
              </div>

              {loading ? (
                <div className="text-center py-5 text-muted">Memuat data dari server...</div>
              ) : (
                <DaftarTugas
                  daftarTugas={tugasTerfilter}
                  mode="tabel-lengkap"
                  onToggleStatus={handleToggleStatus}
                  onHapusTugas={handleHapusTugas}
                  onLihatDetail={(tugas) => setTugasDetail(tugas)}
                />
              )}

              <div className="card-footer bg-white py-3 border-top">
                <small className="text-muted">
                  Menampilkan {tugasTerfilter.length} dari {daftarTugas.length} entri data tugas
                </small>
              </div>
            </div>
          </div>
        )}

        {halamanAktif === 'tambah' && (
          <FormTambahTugas
            onTambahTugas={handleTambahTugas}
            onGantiHalaman={setHalamanAktif}
          />
        )}
      </main>

      {tugasDetail && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)' }}
          tabIndex="-1"
          onClick={() => setTugasDetail(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 shadow">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold">
                  <i className="bi bi-info-circle text-primary me-2"></i>Detail Informasi Tugas
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setTugasDetail(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <span className="badge bg-primary-subtle text-primary mb-2">
                    {tugasDetail.mataKuliah}
                  </span>
                  <h4 className="fw-bold text-dark">{tugasDetail.judul}</h4>
                  <p className="text-muted small">{tugasDetail.deskripsi}</p>
                </div>
                <div className="row g-2 p-2 bg-light rounded">
                  <div className="col-6">
                    <small className="text-muted d-block">Tingkat Prioritas</small>
                    <strong className="text-dark small">{tugasDetail.prioritas} Priority</strong>
                  </div>
                  <div className="col-6">
                    <small className="text-muted d-block">Status Penyelesaian</small>
                    <strong className="text-dark small">{tugasDetail.status}</strong>
                  </div>
                  <div className="col-6 mt-2">
                    <small className="text-muted d-block">Tenggat Waktu</small>
                    <strong className="text-dark small">
                      {tugasDetail.tenggat}, {tugasDetail.jam || '23:59'} WIB
                    </strong>
                  </div>
                  <div className="col-6 mt-2">
                    <small className="text-muted d-block">Kategori</small>
                    <strong className="text-dark small">{tugasDetail.kategori}</strong>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-top">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setTugasDetail(null)}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default App;