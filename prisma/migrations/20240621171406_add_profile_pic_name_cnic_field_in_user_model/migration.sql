/*
  Warnings:

  - Added the required column `cnic` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cnic" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "profilePicture" TEXT;
