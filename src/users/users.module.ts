import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],  // Asegúrate de esta línea
  providers: [UsersService],
  controllers:[UsersController],
  exports: [UsersService],
})
export class UsersModule {}
