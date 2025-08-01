-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_driverId_fkey";

-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "city" TEXT;

-- AlterTable
ALTER TABLE "Rating" ALTER COLUMN "driverId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;
