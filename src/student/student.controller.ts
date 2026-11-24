import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // 1) Endpoint Utama: View (Data Student) & Filter by Jurusan
  // GET http://localhost:3000/students
  // GET http://localhost:3000/students?jurusan=Informatika
  @Get()
  async findAll(@Query('jurusan') jurusan?: string) {
    const students = await this.studentService.findAll(jurusan);
    return {
      statusCode: 200,
      message: 'Data student berhasil didapatkan',
      total: students.length,
      data: students,
    };
  }

  // 6) [NILAI TAMBAH / OPSIONAL] Endpoint Statistik Sederhana (count)
  // GET http://localhost:3000/students/stats/count
  @Get('stats/count')
  async getStatistics() {
    const stats = await this.studentService.getStatistics();
    return {
      statusCode: 200,
      message: 'Statistik data student berhasil didapatkan',
      data: stats,
    };
  }

  // GET http://localhost:3000/students/:id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const student = await this.studentService.findOne(id);
    return {
      statusCode: 200,
      message: `Detail student ID ${id} berhasil didapatkan`,
      data: student,
    };
  }

  // POST http://localhost:3000/students
  @Post()
  async create(
    @Body()
    body: {
      nim: string;
      nama: string;
      jurusan: string;
      email: string;
    },
  ) {
    const newStudent = await this.studentService.create(body);
    return {
      statusCode: 201,
      message: 'Data student berhasil ditambahkan ke PostgreSQL',
      data: newStudent,
    };
  }

  // PATCH http://localhost:3000/students/:id
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: Partial<{
      nim: string;
      nama: string;
      jurusan: string;
      email: string;
    }>,
  ) {
    const updatedStudent = await this.studentService.update(id, body);
    return {
      statusCode: 200,
      message: `Data student ID ${id} berhasil diupdate`,
      data: updatedStudent,
    };
  }

  // DELETE http://localhost:3000/students/:id
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deletedStudent = await this.studentService.remove(id);
    return {
      statusCode: 200,
      message: `Data student ID ${id} berhasil dihapus`,
      data: deletedStudent,
    };
  }
}
