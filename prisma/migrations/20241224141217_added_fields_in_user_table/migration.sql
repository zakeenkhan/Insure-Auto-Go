-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cnicPhoto" TEXT,
ADD COLUMN     "isSignUpVerified" BOOLEAN NOT NULL DEFAULT false;
