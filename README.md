# NestJS Student API (TUGAS BAB 10 - PostgreSQL + Prisma ORM)

Implementasi REST API berbasis **NestJS** yang terhubung ke database **PostgreSQL** menggunakan **Prisma ORM**.

---

## 📌 Rincian Tugas BAB 10 (Sesuai Soal)

1. **Server PostgreSQL Lokal**: Terhubung ke database `db_student` di PostgreSQL lokal (Port 5432).
2. **Model Prisma (`prisma/schema.prisma`)**: Model `Student` dengan atribut `id`, `nim`, `nama`, `jurusan`, `email`, `createdAt`, `updatedAt`.
3. **Migrasi Awal**: Telah dilakukan migrasi dengan `npx prisma migrate dev --name init`.
4. **PrismaService sebagai Provider**: Terhubung ke `StudentService` menggantikan penyimpanan sebelumnya.
5. **Operasi CRUD Dasar**: Telah diimplementasikan penuh (Create, Read All, Read One, Update, Delete).
6. **(Nilai Tambah / Opsional)**:
   - **Filter Query (`where`)**: Pencarian berdasarkan jurusan (`GET /students?jurusan=...`).
   - **Statistik Sederhana (`count`)**: Menghitung total mahasiswa dan per jurusan (`GET /students/stats/count`).

---

## 🚀 Panduan Menjalankan Project

### 1. Pastikan PostgreSQL Berjalan
Service `postgresql-x64-18` aktif di port `5432`.
Konfigurasi koneksi tersimpan di file `.env`:
```env
DATABASE_URL="postgresql://postgres:Farizqy0211@localhost:5432/db_student?schema=public"
```

### 2. Jalankan Server NestJS
```bash
npm run start:dev
```
Server akan aktif di: `http://localhost:3000`.

---

## 📡 Daftar Endpoint API (Untuk Postman & Screenshot)

| Method | Endpoint | Deskripsi | Status |
| :--- | :--- | :--- | :--- |
| **GET** | `/students` | Melihat seluruh data mahasiswa | **[CRUD - Read All]** |
| **GET** | `/students/stats/count` | Statistik total mahasiswa & per jurusan | **[Nilai Tambah - Count]** |
| **GET** | `/students?jurusan=Informatika` | Filter mahasiswa berdasarkan jurusan | **[Nilai Tambah - Where]** |
| **GET** | `/students/:id` | Melihat detail mahasiswa berdasarkan ID | **[CRUD - Read One]** |
| **POST** | `/students` | Menambahkan data mahasiswa baru | **[CRUD - Create]** |
| **PATCH**| `/students/:id` | Mengupdate data mahasiswa | **[CRUD - Update]** |
| **DELETE**| `/students/:id` | Menghapus data mahasiswa | **[CRUD - Delete]** |

---

### Contoh Payload Request Body

#### 1. POST `/students` (Tambah Data):
```json
{
  "nim": "103022400132",
  "nama": "Farizqy Testing",
  "jurusan": "Rekayasa Perangkat Lunak",
  "email": "test@student.telkomuniversity.ac.id"
}
```

#### 2. PATCH `/students/:id` (Update Data):
```json
{
  "nama": "Farizqy (Updated)",
  "jurusan": "Rekayasa Perangkat Lunak"
}
```
