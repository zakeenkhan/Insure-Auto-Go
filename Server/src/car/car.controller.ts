import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { isVerifiedUserGuard } from 'src/guards/isVerifyUser.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/utils/dto/pagination.dto';
import { GetCarDto } from './dto/get-car.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, isVerifiedUserGuard, RoleGuard(['admin', 'appUser']))
@ApiTags('Car')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  create(@Request() req, @Body() createCarDto: CreateCarDto) {
    const userId = req.user.id;
    const payload = {
      ...createCarDto,
      ownerId: userId,
    };
    return this.carService.create(payload);
  }

  @Get()
  findAll(@Query() query: GetCarDto) {
    return this.carService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.carService.findOne(id);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    const userId = req.user.id;
    return this.carService.update(userId, id, updateCarDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.carService.remove(+id);
  // }
}
