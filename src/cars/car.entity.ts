import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  price: number;

  @Column({ nullable: true })
  mileage: number;

  @Column({ nullable: true })
  transmission: string;

  @Column({ nullable: true })
  fuelType: string;

  @Column({ nullable: true })
  bodyType: string;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  status: string;

  @Column("text", { array: true })
  images: string[];

  @Column("text", { array: true })
  features: string[];
}
