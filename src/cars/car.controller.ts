import { Controller, Get, Post, Patch, Delete, Body, Param, Query, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/car.dto';
import { Car } from './car.entity';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los autos' })
  @ApiResponse({ status: 200, description: 'Autos obtenidos correctamente' })
  findAll(): Promise<Car[]> {
    return this.carsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener auto por ID' })
  @ApiResponse({ status: 200, description: 'Auto encontrado' })
  @ApiResponse({ status: 404, description: 'Auto no encontrado' })
  findOne(@Param('id') id: string): Promise<Car> {
    return this.carsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo auto' })
  @ApiResponse({ status: 201, description: 'Auto creado correctamente' })
  create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    const car = new Car();
    Object.assign(car, createCarDto);
    return this.carsService.create(car);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar auto' })
  @ApiResponse({ status: 200, description: 'Auto actualizado correctamente' })
  @ApiResponse({ status: 404, description: 'Auto no encontrado' })
  update(@Param('id') id: string, @Body() updateCarDto: Partial<CreateCarDto>): Promise<Car> {
    return this.carsService.update(+id, updateCarDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar auto' })
  @ApiResponse({ status: 200, description: 'Auto eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Auto no encontrado' })
  remove(@Param('id') id: string): Promise<void> {
    return this.carsService.remove(+id);
  }
}