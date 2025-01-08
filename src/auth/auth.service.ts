import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Validar usuario al hacer login
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  // Iniciar sesión
  async login({ email, password }: { email: string, password: string }) {
    const user = await this.validateUser(email, password);
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Registro con validación
  async register(createUserDto: CreateUserDto) {
    const { email, password, confirmPassword, ...rest } = createUserDto;
  
    // Validar si el email ya existe
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
  
    // Validar formato de email
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Invalid email format');
    }
  
    if (!this.validatePassword(password)) {
      throw new BadRequestException(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.',
      );
    }
  
    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
  
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User();
    Object.assign(user, rest);
    user.password = hashedPassword;
    user.email = email;  // Aseguramos que email no sea null
  
    const newUser = await this.usersService.create(user);
  
    const { password: _, ...result } = newUser;
    return result;
  }
  
  

  // Método para validar formato de contraseña
  private validatePassword(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);
    return password.length >= minLength && hasUpperCase && hasNumber && hasSpecialChar;
  }

  // Renovar token
  async refreshToken(token: string) {
    const decoded = this.jwtService.decode(token) as any;
    const payload = { username: decoded.username, sub: decoded.sub };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
