import { PaginationDto } from 'src/utils/dto/pagination.dto';
export declare class GetRatingDto extends PaginationDto {
    rating?: number;
    review?: string;
    carId?: number;
    driverId?: number;
    bookingId?: number;
    search?: string;
}
