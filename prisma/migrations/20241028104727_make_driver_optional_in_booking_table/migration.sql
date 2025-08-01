-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_driverId_fkey";

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "driverId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;
