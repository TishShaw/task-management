import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { TaskEntity } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async addNewTask(newTask: TaskEntity): Promise<TaskEntity> {
    if (!newTask.description) {
      throw new Error('Task description cannot be null or undefined');
    }
    return await this.taskRepository.save(newTask);
  }

  async updateTask(id: number, updatedTask: TaskEntity): Promise<TaskEntity> {
    const existingTask = await this.findTaskById(id);
    existingTask.description = updatedTask.description || existingTask.description;

    return await this.taskRepository.save(existingTask);
  }

  async deleteTask(id: number): Promise<void> {
    const existingTask = await this.findTaskById(id);
    await this.taskRepository.remove(existingTask);
  }

  async findAllTasks(): Promise<TaskEntity[]> {
    return await this.taskRepository.find();
  }

  async findTaskById(id: number): Promise<TaskEntity> {
    const options: FindOneOptions<TaskEntity> = { where: { id } };

    const task = await this.taskRepository.findOne(options);

    if (!task) {
      throw new NotFoundException(`Task with Id ${id} not found`);
    }

    return task;
  }
}
