import { Controller, Post, Body, Get, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from '../users/dto/user.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  async login(@Body() body) {
    return this.authService.login(body);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { email, password, confirmPassword } = createUserDto;

    // Validar que el email cumpla con el formato
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Invalid email format');
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    return this.authService.register(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Obtener el perfil del usuario autenticado' })
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refrescar token' })
  async refresh(@Body() body) {
    return this.authService.refreshToken(body.token);
  }
}
