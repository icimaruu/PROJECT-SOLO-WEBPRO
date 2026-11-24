import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(
    @Query('mataKuliah') mataKuliah?: string,
    @Query('prioritas') prioritas?: string,
  ) {
    return this.taskService.findAll(mataKuliah, prioritas);
  }

  // Harus diletakkan di atas @Get(':id')
  @Get('stats/count')
  getStats() {
    return this.taskService.getStats();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.taskService.create(body);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.taskService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.remove(id);
  }
}