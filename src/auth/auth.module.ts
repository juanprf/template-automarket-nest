import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
    imports: [
      UsersModule,
      PassportModule,
      JwtModule.register({
        secret: process.env.JWT_SECRET || 'secretKey',
        signOptions: { expiresIn: '1h' },
      }),
    ],
    providers: [AuthService, JwtStrategy, JwtAuthGuard],
    controllers: [AuthController],
    exports: [AuthService],
  })
  export class AuthModule {}
  