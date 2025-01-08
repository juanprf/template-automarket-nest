import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, IsPositive } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({ example: 'Toyota' })
  @IsString()
  make: string;

  @ApiProperty({ example: 'Corolla' })
  @IsString()
  model: string;

  @ApiProperty({ example: 2022 })
  @IsInt()
  @Min(1900)
  year: number;

  @ApiProperty({ example: 15000 })
  @IsPositive()
  price: number;
}
