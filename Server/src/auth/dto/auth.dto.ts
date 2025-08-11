import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString ,IsOptional} from 'class-validator';
export class loginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class AuthDto extends loginDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  cnic: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fullName: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @ApiProperty()
  @Type(() => Date)
  dob: Date;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  cnicPhoto: string;
}
