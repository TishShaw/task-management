import { Controller, Get, Post, Body, NotFoundException, Param, Delete, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskEntity } from './task.entity';

@Controller('tasks')
export class TasksController {

  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks(): Promise<TaskEntity[]> {
    return await this.taskService.findAllTasks();
  }

  @Get(':taskId')
  async getTaskById(@Param('taskId') id: number): Promise<TaskEntity> {
    const task = await this.taskService.findTaskById(id);

    if (!task) {
      throw new NotFoundException(`Task with Id ${id} not found`);
    }

    return task;
  }

  @Post()
  async createTask(@Body() newTask: TaskEntity): Promise<TaskEntity> {
    return await this.taskService.addNewTask(newTask);
  }

  @Put(':taskId')
  async updateTask(@Param('taskId') id: number, @Body() updatedTask: TaskEntity): Promise<TaskEntity> {
    return await this.taskService.updateTask(id, updatedTask);
  }

  @Delete(':taskId')
  async deleteTask(@Param('taskId') id: number): Promise<void> {
    await this.taskService.deleteTask(id);
  }
}
