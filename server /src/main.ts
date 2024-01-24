import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from 'cors';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')

  // Define CORS options
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3001', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
    allowedHeaders: ['Authorization', 'Content-Type'],
  };

  // Enable CORS with options
  app.enableCors(corsOptions);
  await app.listen(3000);
}

bootstrap();
