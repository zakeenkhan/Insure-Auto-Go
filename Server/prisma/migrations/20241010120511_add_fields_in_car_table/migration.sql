/*
  Warnings:

  - A unique constraint covering the columns `[registrationNo]` on the table `Car` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "insured" SET DEFAULT false,
ALTER COLUMN "insuranceRequired" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Car_registrationNo_key" ON "Car"("registrationNo");
