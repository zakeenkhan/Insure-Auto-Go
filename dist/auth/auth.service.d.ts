import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, UpdateUserDto, loginDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signUp(dto: AuthDto): Promise<{
        user: {
            id: number;
            fullName: string | null;
            email: string;
            password: string;
            isVerified: boolean;
            role: string;
            profilePicture: string | null;
            cnic: string | null;
            phone: string | null;
            dob: Date | null;
            otp: number | null;
            averageRatingGiven: import("@prisma/client/runtime/library").Decimal | null;
            ratingCount: number | null;
            weightage: import("@prisma/client/runtime/library").Decimal | null;
            cnicPhoto: string | null;
            isSignUpVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    signin(dto: loginDto): Promise<{
        user: {
            id: number;
            fullName: string | null;
            email: string;
            password: string;
            isVerified: boolean;
            role: string;
            profilePicture: string | null;
            cnic: string | null;
            phone: string | null;
            dob: Date | null;
            otp: number | null;
            averageRatingGiven: import("@prisma/client/runtime/library").Decimal | null;
            ratingCount: number | null;
            weightage: import("@prisma/client/runtime/library").Decimal | null;
            cnicPhoto: string | null;
            isSignUpVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        accessToken: string;
    }>;
    signToken(user: any): Promise<string>;
    VerifyUser(userId: number): Promise<{
        user: {
            id: number;
            fullName: string | null;
            email: string;
            password: string;
            isVerified: boolean;
            role: string;
            profilePicture: string | null;
            cnic: string | null;
            phone: string | null;
            dob: Date | null;
            otp: number | null;
            averageRatingGiven: import("@prisma/client/runtime/library").Decimal | null;
            ratingCount: number | null;
            weightage: import("@prisma/client/runtime/library").Decimal | null;
            cnicPhoto: string | null;
            isSignUpVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        message: string;
    }>;
    VerifySignUp(email: string, otp: number): Promise<{
        user: {
            id: number;
            fullName: string | null;
            email: string;
            password: string;
            isVerified: boolean;
            role: string;
            profilePicture: string | null;
            cnic: string | null;
            phone: string | null;
            dob: Date | null;
            otp: number | null;
            averageRatingGiven: import("@prisma/client/runtime/library").Decimal | null;
            ratingCount: number | null;
            weightage: import("@prisma/client/runtime/library").Decimal | null;
            cnicPhoto: string | null;
            isSignUpVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        accessToken: string;
        message: string;
    }>;
    updateUser(userId: number, dto: UpdateUserDto): Promise<{
        id: number;
        fullName: string | null;
        email: string;
        password: string;
        isVerified: boolean;
        role: string;
        profilePicture: string | null;
        cnic: string | null;
        phone: string | null;
        dob: Date | null;
        otp: number | null;
        averageRatingGiven: import("@prisma/client/runtime/library").Decimal | null;
        ratingCount: number | null;
        weightage: import("@prisma/client/runtime/library").Decimal | null;
        cnicPhoto: string | null;
        isSignUpVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    sendOtp(name: string, otp: number): Promise<void>;
    resendOtp(email: string): Promise<{
        message: string;
    }>;
}
