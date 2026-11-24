# Student Management REST API

## 📋 Informasi Proyek

* **Nama Proyek**: Student Management REST API (NestJS + PostgreSQL + Prisma ORM)
* **Deskripsi**: Aplikasi backend REST API untuk pengelolaan data mahasiswa (*Student Data Management*) yang dibangun menggunakan framework **NestJS**, terhubung secara  ke basis data **PostgreSQL** melalui **Prisma ORM**. Aplikasi ini mendukung operasi CRUD lengkap (Create, Read, Update, Delete) serta fitur pencarian filter (*where*) dan agregasi statistik data (*count*).

---

## 📌 Rincian Tugas BAB 10

1. **Server PostgreSQL Lokal**: Terhubung ke database `db_student` di PostgreSQL lokal (Port 5432).
2. **Model Prisma (`prisma/schema.prisma`)**: Model `Student` dengan atribut `id`, `nim`, `nama`, `jurusan`, `email`, `createdAt`, `updatedAt`.
3. **Migrasi Awal**: Telah dilakukan migrasi dengan `npx prisma migrate dev --name init`.
4. **PrismaService sebagai Provider**: Terhubung ke `StudentService` menggantikan penyimpanan sebelumnya.
5. **Operasi CRUD Dasar**: Telah diimplementasikan penuh (Create, Read All, Read One, Update, Delete).
6. **(Nilai Tambah / Opsional)**:
   - **Filter Query (`where`)**: Pencarian berdasarkan jurusan (`GET /students?jurusan=...`).
   - **Statistik Sederhana (`count`)**: Menghitung total mahasiswa dan per jurusan (`GET /students/stats/count`).

---

## 📡 Daftar Endpoint API (Untuk Postman & Pengujian)

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
  "nim": "103022400999",
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
