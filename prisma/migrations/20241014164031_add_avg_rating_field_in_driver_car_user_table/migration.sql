-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "averageRating" DECIMAL(65,30) DEFAULT 0;

-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "averageRating" DECIMAL(65,30) DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "averageRatingGiven" DECIMAL(65,30) DEFAULT 0;
