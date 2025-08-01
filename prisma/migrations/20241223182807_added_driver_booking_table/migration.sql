-- CreateTable
CREATE TABLE "DriverBooking" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "driverId" INTEGER,
    "status" "BookingStatus" NOT NULL DEFAULT 'Pending',
    "isInsured" BOOLEAN DEFAULT false,
    "insurance" TEXT,
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "isPaid" BOOLEAN DEFAULT false,
    "amountPaid" INTEGER,
    "cancelledAt" TIMESTAMP(3),
    "cancelledById" INTEGER,
    "clientContactNo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DriverBooking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DriverBooking" ADD CONSTRAINT "DriverBooking_cancelledById_fkey" FOREIGN KEY ("cancelledById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverBooking" ADD CONSTRAINT "DriverBooking_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverBooking" ADD CONSTRAINT "DriverBooking_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;
