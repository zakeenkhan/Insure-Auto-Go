import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, UpdateUserDto, VerifyUserDto,VerifySignUpDto, loginDto } from './dto';
import { RoleGuard, isVerifiedUserGuard, JwtAuthGuard } from '../guards';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ResendOtpDto } from './dto/resendOtp.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }
  @Post('signin')
  signIn(@Body() dto: loginDto) {
    return this.authService.signin(dto);
  }

  @Get('validate-token')
  @UseGuards(JwtAuthGuard, isVerifiedUserGuard)
  @ApiBearerAuth()
  getUser(@Request() req) {
    return req.user;
  }

  @Post('verify-signUp')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard, isVerifiedUserGuard, RoleGuard(['admin','appUser']))
  async verifySignUp(@Request() req, @Body() dto: VerifySignUpDto) {
    return await this.authService.VerifySignUp(dto.email, dto.otp);
  }

  @Post('verify-user')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, isVerifiedUserGuard, RoleGuard(['admin','appUser']))
  async verifyUser(@Request() req, @Body() dto: VerifyUserDto) {
    return await this.authService.VerifyUser(dto.userId);
  }
  @Put('update-user-profile')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard(['admin', 'appUser']))
  async updateUser(@Request() req, @Body() dto: UpdateUserDto) {
    req.user.id;
    const user = await this.authService.updateUser(req.user.id, dto);
    return user;
  }
  @Post('resend/otp')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard, RoleGuard(['admin', 'appUser']))
  async sendOtp(@Request() req, @Body() dto: ResendOtpDto) {
    const user = await this.authService.resendOtp(dto.email);
    return user;
  }
}
