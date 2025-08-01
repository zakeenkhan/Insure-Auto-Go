import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { GetRatingDto } from './dto/get-rating.dto';
export declare class RatingService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createRatingDto: CreateRatingDto & {
        ratedById: number;
    }): Promise<{
        id: number;
        ratedById: number;
        driverId: number | null;
        bookingId: number;
        carId: number;
        rating: Prisma.Decimal;
        review: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(user: any, query: GetRatingDto): Promise<{
        data: {
            id: number;
            ratedById: number;
            driverId: number | null;
            bookingId: number;
            carId: number;
            rating: Prisma.Decimal;
            review: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        meta: {
            totalPages: number;
            totalRecords: number;
            currentPage: number;
        };
    }>;
    findOne(id: number): Promise<{
        id: number;
        ratedById: number;
        driverId: number | null;
        bookingId: number;
        carId: number;
        rating: Prisma.Decimal;
        review: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateRatingDto: UpdateRatingDto & {
        ratedById: number;
    }): Promise<{
        id: number;
        ratedById: number;
        driverId: number | null;
        bookingId: number;
        carId: number;
        rating: Prisma.Decimal;
        review: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): string;
    updateAverageRating(userId: number, driverId: number, carId: number): Promise<void>;
}
