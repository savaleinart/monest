import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mysql from 'mysql2';

export const con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: null,
  database: "monest_db"
}).promise();

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);

}
bootstrap();
