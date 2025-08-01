import { AuthService } from './auth.service';
import { AuthDto, UpdateUserDto, VerifyUserDto, VerifySignUpDto, loginDto } from './dto';
import { ResendOtpDto } from './dto/resendOtp.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: AuthDto): Promise<{
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
    signIn(dto: loginDto): Promise<{
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
    getUser(req: any): any;
    verifySignUp(req: any, dto: VerifySignUpDto): Promise<{
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
    verifyUser(req: any, dto: VerifyUserDto): Promise<{
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
    updateUser(req: any, dto: UpdateUserDto): Promise<{
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
    sendOtp(req: any, dto: ResendOtpDto): Promise<{
        message: string;
    }>;
}
