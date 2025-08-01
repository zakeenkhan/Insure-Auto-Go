import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/createMessage.dto';
export declare class ConversationController {
    private readonly conversationService;
    constructor(conversationService: ConversationService);
    create(req: any, dto: CreateConversationDto): Promise<{
        userId: number;
        driverId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createMessage(req: any, dto: CreateMessageDto): Promise<{
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
    findAll(req: any): Promise<({
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
    findOne(req: any, id: string): Promise<{
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
    unReadConv(req: any, id: string): Promise<{
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
