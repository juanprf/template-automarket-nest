import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsInt, Min, IsPositive } from 'class-validator';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  make: string;

  @Column()
  @IsString()
  model: string;

  @Column()
  @IsInt()
  @Min(1900)
  year: number;

  @Column()
  @IsPositive()
  price: number;
}
