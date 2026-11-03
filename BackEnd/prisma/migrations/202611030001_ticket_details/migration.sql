-- DropForeignKey
ALTER TABLE "TicketService" DROP CONSTRAINT "TicketService_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "TicketService" DROP CONSTRAINT "TicketService_serviceId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatarUrl";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "totalValue",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "number" SERIAL NOT NULL,
ADD COLUMN     "serviceId" TEXT NOT NULL,
ADD COLUMN     "servicePrice" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "TicketService";

-- CreateTable
CREATE TABLE "AdditionalService" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdditionalService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AdditionalService_ticketId_idx" ON "AdditionalService"("ticketId");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_number_key" ON "Ticket"("number");

-- CreateIndex
CREATE INDEX "Ticket_serviceId_idx" ON "Ticket"("serviceId");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdditionalService" ADD CONSTRAINT "AdditionalService_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

