# TaskFlow - REST API Manajemen Tugas Kuliah (BAB 10)

## 📋 Informasi Proyek

* **Nama Proyek**: TaskFlow - REST API Manajemen Tugas Kuliah (NestJS + PostgreSQL + Prisma ORM)
* **Deskripsi**: Aplikasi backend REST API untuk sistem manajemen tugas perkuliahan (*Task Management*) yang merupakan kelanjutan langsung dari aplikasi frontend React **TaskFlow (Tugas Pekan 6)**. Dibangun menggunakan framework **NestJS**, terhubung secara persisten ke basis data **PostgreSQL** melalui **Prisma ORM**.
* **Pengembang**: Farizqy Akhram Nugraha (NIM: 103022400132)
* **Entitas Utama**: `Task` (`id`, `title`, `course`, `category`, `priority`, `deadline`, `status`, `description`, `createdAt`, `updatedAt`)

---

## 📌 Keselarasan dengan Tugas Pekan 6 (TaskFlow Frontend)

Proyek backend ini mengimplementasikan skema data yang 100% selaras dengan frontend React di **Pekan 6 (`manajemen-tugas-frontend`)**:

1. **Struktur Data Tugas**:
   * `title`: Judul tugas kuliah.
   * `course`: Mata kuliah terkait (misal: *Pemrograman Web*, *Rekayasa Web*, dll).
   * `category`: Kategori pengerjaan (*Individu*, *Kelompok*, *Praktikum*).
   * `priority`: Tingkat prioritas (*High*, *Medium*, *Low*).
   * `deadline`: Tenggat waktu pengerjaan (format `YYYY-MM-DD`).
   * `status`: Status pengerjaan (*In Progress*, *Pending*, *Completed*).
   * `description`: Catatan / instruksi tugas.

2. **Auto-Seeder Realistis**:
   * Mengisi 6 data tugas inisial otomatis dari tugas W6 saat database pertama kali diinisialisasi.

3. **Statistik Terintegrasi (`/tasks/stats/summary`)**:
   * Menghasilkan metrik ringkasan (*Total*, *In Progress*, *Completed*, *Pending*) yang identik dengan komponen `RingkasanTugas.jsx`.

4. **CORS Diaktifkan**:
   * Backend telah mengizinkan CORS (`app.enableCors()`) sehingga frontend React W6 (di port `5173`) dapat langsung melakukan `fetch` ke backend (port `3000`).

---



### 1. Database PostgreSQL
Pastikan service PostgreSQL berjalan di port `5432`.
Konfigurasi koneksi tersimpan di file `.env`:
```env
DATABASE_URL="postgresql://postgres:Farizqy0211@localhost:5432/db_student?schema=public"
```

### 2. Jalankan Backend NestJS
```bash
npm run start:dev
```
Server akan aktif di: `http://localhost:3000`.

### 3. Cek Data Melalui Prisma Studio (Visual Web UI)
```bash
npx prisma studio
```
Buka di browser: `http://localhost:5555` untuk melihat tabel `tasks` dan `students` secara visual.

---

## 📡 Daftar Endpoint REST API (Untuk Postman)

### 🎯 Endpoint Utama: Task (Tugas Kuliah - Tema W6)

| Method | Endpoint | Deskripsi | Kategori |
| :--- | :--- | :--- | :--- |
| **GET** | `/tasks` | Melihat seluruh data tugas kuliah | **[CRUD - Read All]** |
| **GET** | `/tasks/stats/summary` | Statistik ringkasan tugas (*Total, In Progress, Completed, Pending, Per Mata Kuliah*) | **[Nilai Tambah - Count & Group]** |
| **GET** | `/tasks?course=Pemrograman%20Web` | Filter tugas berdasarkan mata kuliah | **[Nilai Tambah - Where]** |
| **GET** | `/tasks?status=In%20Progress` | Filter tugas berdasarkan status | **[Nilai Tambah - Where]** |
| **GET** | `/tasks/:id` | Melihat detail tugas berdasarkan ID | **[CRUD - Read One]** |
| **POST** | `/tasks` | Menambahkan tugas kuliah baru | **[CRUD - Create]** |
| **PATCH**| `/tasks/:id` | Mengupdate data tugas / status pengerjaan | **[CRUD - Update]** |
| **DELETE**| `/tasks/:id` | Menghapus tugas | **[CRUD - Delete]** |

---

### Contoh Payload Request Body

#### 1. POST `/tasks` (Tambah Tugas Baru):
```json
{
  "title": "Implementasi REST API & Prisma",
  "course": "Pemrograman Web",
  "category": "Individu",
  "priority": "High",
  "deadline": "2026-11-28",
  "status": "In Progress",
  "description": "Menghubungkan NestJS dengan PostgreSQL menggunakan Prisma ORM."
}
```

#### 2. PATCH `/tasks/:id` (Update Status / Data):
```json
{
  "status": "Completed"
}
```

---

