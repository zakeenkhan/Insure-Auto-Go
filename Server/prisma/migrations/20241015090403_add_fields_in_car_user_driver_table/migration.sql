-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "ratingCount" INTEGER DEFAULT 0,
ADD COLUMN     "weightage" DECIMAL(65,30) DEFAULT 0;

-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "ratingCount" INTEGER DEFAULT 0,
ADD COLUMN     "weightage" DECIMAL(65,30) DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ratingCount" INTEGER DEFAULT 0,
ADD COLUMN     "weightage" DECIMAL(65,30) DEFAULT 0;
