import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async findAll(mataKuliah?: string, prioritas?: string) {
    return this.prisma.task.findMany({
      where: {
        ...(mataKuliah && mataKuliah !== 'Semua' ? { mataKuliah } : {}),
        ...(prioritas && prioritas !== 'Semua' ? { prioritas } : {}),
      },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Tugas dengan ID ${id} tidak ditemukan`);
    }
    return task;
  }

  async create(data: {
    judul: string;
    deskripsi?: string;
    mataKuliah: string;
    kategori?: string;
    prioritas?: string;
    tenggat: string;
    jam?: string;
    status?: string;
  }) {
    return this.prisma.task.create({
      data: {
        judul: data.judul,
        deskripsi: data.deskripsi || 'Tidak ada catatan tambahan.',
        mataKuliah: data.mataKuliah,
        kategori: data.kategori || 'Individu',
        prioritas: data.prioritas || 'Medium',
        tenggat: data.tenggat,
        jam: data.jam || '23:59',
        status: data.status || 'Pending',
      },
    });
  }

  async getStats() {
  const [total, selesai, berjalan, pending] = await Promise.all([
    this.prisma.task.count(),
    this.prisma.task.count({ where: { status: 'Completed' } }),
    this.prisma.task.count({ where: { status: 'In Progress' } }),
    this.prisma.task.count({ where: { status: 'Pending' } }),
  ]);
  return { total, selesai, berjalan, pending };
}

  async update(
    id: number,
    data: Partial<{
      judul: string;
      deskripsi: string;
      mataKuliah: string;
      kategori: string;
      prioritas: string;
      tenggat: string;
      jam: string;
      status: string;
    }>,
  ) {
    await this.findOne(id);
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.task.delete({
      where: { id },
    });
  }
}