import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { GetRatingDto } from './dto/get-rating.dto';
export declare class RatingController {
    private readonly ratingService;
    constructor(ratingService: RatingService);
    create(req: any, createRatingDto: CreateRatingDto): Promise<{
        id: number;
        ratedById: number;
        driverId: number | null;
        bookingId: number;
        carId: number;
        rating: import("@prisma/client/runtime/library").Decimal;
        review: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(req: any, query: GetRatingDto): Promise<{
        data: {
            id: number;
            ratedById: number;
            driverId: number | null;
            bookingId: number;
            carId: number;
            rating: import("@prisma/client/runtime/library").Decimal;
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
    findOne(id: string): Promise<{
        id: number;
        ratedById: number;
        driverId: number | null;
        bookingId: number;
        carId: number;
        rating: import("@prisma/client/runtime/library").Decimal;
        review: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(req: any, id: number, updateRatingDto: UpdateRatingDto): Promise<{
        id: number;
        ratedById: number;
        driverId: number | null;
        bookingId: number;
        carId: number;
        rating: import("@prisma/client/runtime/library").Decimal;
        review: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): string;
}
