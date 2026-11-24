/*
  Warnings:

  - You are about to drop the `students` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tasks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "students";

-- DropTable
DROP TABLE "tasks";

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jurusan" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL DEFAULT 'Tidak ada catatan tambahan.',
    "mataKuliah" TEXT NOT NULL,
    "kategori" TEXT NOT NULL DEFAULT 'Individu',
    "prioritas" TEXT NOT NULL DEFAULT 'Medium',
    "tenggat" TEXT NOT NULL,
    "jam" TEXT NOT NULL DEFAULT '23:59',
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_nim_key" ON "Student"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
