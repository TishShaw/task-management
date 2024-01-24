import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';
import { TaskEntity } from './todo/task.entity';

@Module({
  imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [TaskEntity],
      synchronize: true,
    }),
      TodoModule,
      TypeOrmModule.forFeature([TaskEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}