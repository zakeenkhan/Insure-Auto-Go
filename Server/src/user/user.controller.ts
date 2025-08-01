import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { isVerifiedUserGuard } from 'src/guards/isVerifyUser.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { GetUserDto } from './dto/get-user.dto';
@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard, isVerifiedUserGuard, RoleGuard(['admin']))
  findAll(@Query() query: GetUserDto) {
    return this.userService.findAll(query);
  }
  @Get('me')
  @UseGuards(JwtAuthGuard)
  findMe(@Request() req) {
    return this.userService.findOne(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, isVerifiedUserGuard, RoleGuard(['admin']))
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, isVerifiedUserGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    if (req.user.id !== id && req.user.role !== 'admin')
      throw new ForbiddenException(
        'You are not authorized to update this user',
      );
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, isVerifiedUserGuard, RoleGuard(['admin']))
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
