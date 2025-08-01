import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { isVerifiedUserGuard } from 'src/guards/isVerifyUser.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { GetDriverDto } from './dto/get-driver.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, isVerifiedUserGuard, RoleGuard(['admin', 'appUser']))
@ApiTags('Driver')
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  create(@Request() req, @Body() createDriverDto: CreateDriverDto) {
    const userId = req.user.id;
    return this.driverService.create({ ...createDriverDto, userId });
  }

  @Get()
  findAll(@Query() getDriverDto: GetDriverDto) {
    return this.driverService.findAll(getDriverDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.driverService.findOne(id);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDriverDto: UpdateDriverDto,
  ) {
    const userId = req.user.id;
    return this.driverService.update(userId, id, updateDriverDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverService.remove(+id);
  }
}
