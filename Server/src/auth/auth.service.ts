import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, UpdateUserDto, loginDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signUp(dto: AuthDto) {
    // generate the password hash
    const password = await argon.hash(dto.password);
    delete dto.password
    // save the new user in db
    try {
      const otp = Math.floor(1000 + Math.random() * 9000);
      const user = await this.prisma.user.create({
        data: {
          ...dto,
          password,
          isVerified: false,
          otp: otp,
        },
      });

      delete user.password;
      await this.sendOtp(dto.fullName, otp);
      return {
        user,
        // accessToken: await this.signToken(user)
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('credentials taken');
        }
      }
      throw error;
    }
  }
  async signin(dto: loginDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('credential incorrect');
    if (user.isSignUpVerified == false)
      throw new ForbiddenException('user not verified');
    // compare passwords
    const pwMatch = await argon.verify(user.password, dto.password);

    // if password incorrect throw exception
    if (!pwMatch) throw new ForbiddenException('credential incorrect');
    // send back the user
    // return user; step-1 for creating without jwt token
    // step-2 we are using jwt
    delete user.password;
    return { user, accessToken: await this.signToken(user) };
  }
  async signToken(user: any): Promise<string> {
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(user, {
      expiresIn: '240min',
      secret: secret,
    });
    return token;
  }

  async VerifyUser(userId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
      id:userId
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isVerified) {
      throw new BadRequestException('User already verified');
    }

      const verifyUser = await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isVerified: true,
          isSignUpVerified:true,
          otp:null
        },
      });

      delete verifyUser.password;
      return {
        user: verifyUser,
        message: 'account verified ',
      };
    
  }

  async VerifySignUp(email: string, otp: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isVerified) {
      throw new BadRequestException('User already verified');
    }

    if (user.otp != null && user.otp != otp) {
      throw new BadRequestException('incorrect otp');
    }
    if (user.otp == otp) {
      const verifyUser = await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isSignUpVerified: true,
          otp: null,
        },
      });

      delete verifyUser.password;
      return {
        user: verifyUser,
        accessToken: await this.signToken(verifyUser),
        message: 'account verified ',
      };
    } else {
      throw new BadRequestException('incorrect otp');
    }
  }
  async updateUser(userId: number, dto: UpdateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }
    const updateUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete updateUser.password;
    return updateUser;
  }
  async sendOtp(name: string, otp: number) {
    const accountSid = process.env.TWILLIO_ACC_ID;
    const authToken = process.env.TWILLIO_AUTH_ID; // replace with your actual auth token
    const client = new Twilio(accountSid, authToken);
    // const client = require('twilio')(accountSid, authToken)
    await client.messages.create({
      body: `Hello ${name} welcome to InsureAuto your otp is ${otp}`,
      from: `${process.env.TWILLIO_SENDER}`,
      to: `${process.env.TWILLIO_VERIFY_NO}`,
    });
  }

  async resendOtp(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isSignUpVerified) {
      throw new BadRequestException('User already verified');
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    await this.prisma.user.update({
      where:{id: user.id},
      data:{
        otp: otp
      }
    })
    await this.sendOtp(user.fullName, otp);
    return { message: 'otp resend successfully' };
  }
}
