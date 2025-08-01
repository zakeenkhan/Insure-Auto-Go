import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ConversationService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: Prisma.ConversationUncheckedCreateInput): Promise<{
        userId: number;
        driverId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createMessage(dto: Prisma.MessageUncheckedCreateInput): Promise<{
        driver: {
            email: string;
            cnic: string;
            fullName: string;
            phone: string;
            dob: Date;
            profilePicture: string;
            id: number;
            isVerified: boolean;
            role: string;
        };
        user: {
            email: string;
            cnic: string;
            fullName: string;
            phone: string;
            dob: Date;
            profilePicture: string;
            id: number;
            isVerified: boolean;
            role: string;
        };
        messages: ({
            sender: {
                email: string;
                cnic: string;
                fullName: string;
                phone: string;
                dob: Date;
                profilePicture: string;
                id: number;
                isVerified: boolean;
                role: string;
            };
            receiver: {
                email: string;
                cnic: string;
                fullName: string;
                phone: string;
                dob: Date;
                profilePicture: string;
                id: number;
                isVerified: boolean;
                role: string;
            };
        } & {
            id: number;
            senderId: number;
            receiverId: number;
            userId: number;
            driverId: number;
            isSeen: boolean;
            content: string;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } & {
        userId: number;
        driverId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(userId: number): Promise<({
        driver: {
            email: string;
            cnic: string;
            fullName: string;
            phone: string;
            dob: Date;
            profilePicture: string;
            id: number;
            isVerified: boolean;
            role: string;
        };
        user: {
            email: string;
            cnic: string;
            fullName: string;
            phone: string;
            dob: Date;
            profilePicture: string;
            id: number;
            isVerified: boolean;
            role: string;
        };
        messages: ({
            sender: {
                email: string;
                cnic: string;
                fullName: string;
                phone: string;
                dob: Date;
                profilePicture: string;
                id: number;
                isVerified: boolean;
                role: string;
            };
            receiver: {
                email: string;
                cnic: string;
                fullName: string;
                phone: string;
                dob: Date;
                profilePicture: string;
                id: number;
                isVerified: boolean;
                role: string;
            };
        } & {
            id: number;
            senderId: number;
            receiverId: number;
            userId: number;
            driverId: number;
            isSeen: boolean;
            content: string;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } & {
        userId: number;
        driverId: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(driverId: number, userId: number): Promise<{
        driver: {
            email: string;
            cnic: string;
            fullName: string;
            phone: string;
            dob: Date;
            profilePicture: string;
            id: number;
            isVerified: boolean;
            role: string;
        };
        user: {
            email: string;
            cnic: string;
            fullName: string;
            phone: string;
            dob: Date;
            profilePicture: string;
            id: number;
            isVerified: boolean;
            role: string;
        };
        messages: ({
            sender: {
                email: string;
                cnic: string;
                fullName: string;
                phone: string;
                dob: Date;
                profilePicture: string;
                id: number;
                isVerified: boolean;
                role: string;
            };
            receiver: {
                email: string;
                cnic: string;
                fullName: string;
                phone: string;
                dob: Date;
                profilePicture: string;
                id: number;
                isVerified: boolean;
                role: string;
            };
        } & {
            id: number;
            senderId: number;
            receiverId: number;
            userId: number;
            driverId: number;
            isSeen: boolean;
            content: string;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } & {
        userId: number;
        driverId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    unReadConv(driverId: number, userId: number, reqUserId: number): Promise<{
        driver: {
            email: string;
            cnic: string;
            fullName: string;
            phone: string;
            dob: Date;
            profilePicture: string;
            id: number;
            isVerified: boolean;
            role: string;
        };
        user: {
            email: string;
            cnic: string;
            fullName: string;
            phone: string;
            dob: Date;
            profilePicture: string;
            id: number;
            isVerified: boolean;
            role: string;
        };
        messages: ({
            sender: {
                email: string;
                cnic: string;
                fullName: string;
                phone: string;
                dob: Date;
                profilePicture: string;
                id: number;
                isVerified: boolean;
                role: string;
            };
            receiver: {
                email: string;
                cnic: string;
                fullName: string;
                phone: string;
                dob: Date;
                profilePicture: string;
                id: number;
                isVerified: boolean;
                role: string;
            };
        } & {
            id: number;
            senderId: number;
            receiverId: number;
            userId: number;
            driverId: number;
            isSeen: boolean;
            content: string;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } & {
        userId: number;
        driverId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
