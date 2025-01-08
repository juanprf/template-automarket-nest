import { UsersService } from './users/users.service';
import { CarsController } from './cars/car.controller';
import { CarsModule } from './cars/cars.module';
import { CarsService } from './cars/cars.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CarsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [
  ],
  providers: [
  ],
})
export class AppModule {}

