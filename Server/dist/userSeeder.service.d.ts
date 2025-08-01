import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
export declare class UserSeederService implements OnModuleInit {
    private readonly prisma;
    private config;
    constructor(prisma: PrismaService, config: ConfigService);
    onModuleInit(): Promise<void>;
    seedUsers(): Promise<void>;
}
