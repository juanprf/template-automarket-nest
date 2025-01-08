import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user@example.com' })
  @Column()
  email: string;

  @ApiProperty({ example: 'hashed_password' })
  @Column()
  password: string;

  @ApiProperty({ example: false })
  @Column({ default: false })
  isAdmin: boolean;
}
