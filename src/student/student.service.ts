import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Student } from '@prisma/client';

@Injectable()
export class StudentService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  // Auto-seed data awal ke PostgreSQL jika tabel masih kosong
  async onModuleInit() {
    const count = await this.prisma.student.count();
    if (count === 0) {
      await this.prisma.student.createMany({
        data: [
          {
            nim: '103022400132',
            nama: 'Farizqy',
            jurusan: 'Rekayasa Perangkat Lunak',
            email: 'farizqyakhramnugraha@student.telkomuniversity.ac.id',
          },
          {
            nim: '220101001',
            nama: 'Budi Santoso',
            jurusan: 'Informatika',
            email: 'budi.santoso@student.telkomuniversity.ac.id',
          },
          {
            nim: '220101002',
            nama: 'Siti Aminah',
            jurusan: 'Sistem Informasi',
            email: 'siti.aminah@student.telkomuniversity.ac.id',
          },
          {
            nim: '220101003',
            nama: 'Ahmad Fauzi',
            jurusan: 'Teknik Komputer',
            email: 'ahmad.fauzi@student.telkomuniversity.ac.id',
          },
        ],
      });
      console.log('✅ Auto-seed data Student ke PostgreSQL berhasil dibuat.');
    }
  }

  // 1. Create (Tambah Student)
  async create(data: {
    nim: string;
    nama: string;
    jurusan: string;
    email: string;
  }): Promise<Student> {
    return await this.prisma.student.create({ data });
  }

  // 2. Read All (Lihat Seluruh Student / Filter by Jurusan jika ada query)
  async findAll(jurusan?: string): Promise<Student[]> {
    if (jurusan) {
      return await this.prisma.student.findMany({
        where: {
          jurusan: {
            contains: jurusan,
            mode: 'insensitive',
          },
        },
      });
    }
    return await this.prisma.student.findMany({
      orderBy: { id: 'asc' },
    });
  }

  // 3. Read One (Lihat Detail Student berdasarkan ID)
  async findOne(id: number): Promise<Student> {
    const student = await this.prisma.student.findUnique({
      where: { id },
    });
    if (!student) {
      throw new NotFoundException(`Student dengan ID ${id} tidak ditemukan`);
    }
    return student;
  }

  // 4. Update (Edit Data Student)
  async update(
    id: number,
    data: Partial<{
      nim: string;
      nama: string;
      jurusan: string;
      email: string;
    }>,
  ): Promise<Student> {
    await this.findOne(id); // Pastikan student ada
    return await this.prisma.student.update({
      where: { id },
      data,
    });
  }

  // 5. Delete (Hapus Data Student)
  async remove(id: number): Promise<Student> {
    await this.findOne(id); // Pastikan student ada
    return await this.prisma.student.delete({
      where: { id },
    });
  }

  // 6. [NILAI TAMBAH / OPSIONAL] Statistik Sederhana (count)
  async getStatistics() {
    const totalStudents = await this.prisma.student.count();
    const countByJurusan = await this.prisma.student.groupBy({
      by: ['jurusan'],
      _count: {
        id: true,
      },
    });

    return {
      total: totalStudents,
      perJurusan: countByJurusan.map((item) => ({
        jurusan: item.jurusan,
        total: item._count.id,
      })),
    };
  }
}
