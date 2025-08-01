import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';

export class VerifyUserDto {
 

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;
}
