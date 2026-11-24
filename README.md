# TaskFlow - Fullstack Manajemen Tugas Kuliah (BAB 10)

## 📋 Informasi Proyek

- **Nama Proyek**: TaskFlow - Fullstack Manajemen Tugas Kuliah (React + NestJS + PostgreSQL + Prisma ORM)
- **Deskripsi**: Aplikasi fullstack manajemen tugas perkuliahan (*Task Management*) yang merupakan kelanjutan dari frontend React **TaskFlow (Pekan 6)** dan REST API NestJS (Pekan 9). Pada tahap ini, backend terhubung secara persisten ke basis data **PostgreSQL** menggunakan **Prisma ORM**, serta terintegrasi langsung dengan frontend React.
- **Pengembang**: Farizqy Akhram Nugraha (NIM: 103022400132)
- **Entitas Utama**: `Task` (`id`, `judul`, `deskripsi`, `mataKuliah`, `kategori`, `prioritas`, `tenggat`, `jam`, `status`, `createdAt`, `updatedAt`)

---

### Ringkasan Daftar API

| No | Method | Full URL Endpoint | Deskripsi | Kategori Tugas 10 |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **POST** | `http://localhost:3000/tasks` | Menambahkan data tugas kuliah baru | **CRUD - Create** |
| 2 | **GET** | `http://localhost:3000/tasks` | Mengambil seluruh daftar tugas kuliah | **CRUD - Read All** |
| 3 | **GET** | `http://localhost:3000/tasks?mataKuliah=Pemrograman%20Web` | Filter tugas berdasarkan mata kuliah | **Query Lanjutan - Where** |
| 4 | **GET** | `http://localhost:3000/tasks?prioritas=High` | Filter tugas berdasarkan tingkat prioritas | **Query Lanjutan - Where** |
| 5 | **GET** | `http://localhost:3000/tasks/stats/count` | Statistik jumlah tugas berdasarkan status | **Query Lanjutan - Count** |
| 6 | **GET** | `http://localhost:3000/tasks/:id` | Mengambil detail 1 tugas berdasarkan ID | **CRUD - Read One** |
| 7 | **PATCH** | `http://localhost:3000/tasks/:id` | Memperbarui data atau status tugas | **CRUD - Update** |
| 8 | **DELETE** | `http://localhost:3000/tasks/:id` | Menghapus tugas berdasarkan ID | **CRUD - Delete**[cite: 5] |

---

## 📌 Fullstack (Frontend React + Backend Prisma)

1. **Struktur Model Prisma (`prisma/schema.prisma`)**:
   - `judul`: Nama atau judul tugas perkuliahan.
   - `mataKuliah`: Nama mata kuliah terkait (*Pemrograman Web*, *Rekayasa Web*, *Proyek Fullstack*, *Basis Data Lanjut*).
   - `kategori`: Kategori penugasan (*Individu*, *Kelompok*, *Praktikum*, *Ujian*).
   - `prioritas`: Tingkat prioritas (*High*, *Medium*, *Low*).
   - `tenggat`: Tanggal batas pengumpulan tugas (contoh: `28 Nov 2026`).
   - `jam`: Jam batas pengumpulan (default: `23:59`).
   - `status`: Status pengerjaan (*Pending*, *In Progress*, *Completed*).
   - `deskripsi`: Catatan atau instruksi tambahan tugas.

2. **Statistik Terintegrasi (`GET /tasks/stats/count`)**:
   - Menghasilkan ringkasan statistik jumlah tugas (`total`, `selesai`, `berjalan`, `pending`) menggunakan query `count()` Prisma.

3. **CORS & Integrasi Frontend (`http://localhost:5173`)**:
   - Backend telah mengaktifkan CORS untuk `http://localhost:5173` sehingga seluruh operasi CRUD pada komponen React (`App.jsx`, `DaftarTugas.jsx`, `FormTambahTugas.jsx`, `RingkasanTugas.jsx`) tersimpan secara permanen ke PostgreSQL.

---

## 🚀 Cara Menjalankan Aplikasi (Fullstack)

### 1. Konfigurasi Database PostgreSQL & Prisma
Pastikan service PostgreSQL aktif di port `5432`, lalu sesuaikan konfigurasi pada file `.env`:
```env
DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/db_student?schema=public"