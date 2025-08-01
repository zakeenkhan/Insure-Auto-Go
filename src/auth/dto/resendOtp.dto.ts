import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class ResendOtpDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
