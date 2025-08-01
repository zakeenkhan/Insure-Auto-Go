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
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { isVerifiedUserGuard } from 'src/guards/isVerifyUser.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetRatingDto } from './dto/get-rating.dto';
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, isVerifiedUserGuard, RoleGuard(['admin', 'appUser']))
@ApiTags('Rating')
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  create(@Request() req, @Body() createRatingDto: CreateRatingDto) {
    const userId = req.user.id;
    return this.ratingService.create({ ...createRatingDto, ratedById: userId });
  }

  @Get()
  findAll(@Request() req, @Query() query: GetRatingDto) {
    return this.ratingService.findAll(req.user, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRatingDto: UpdateRatingDto,
  ) {
    const userId = req.user.id;
    return this.ratingService.update(id, {
      ...updateRatingDto,
      ratedById: userId,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingService.remove(+id);
  }
}
