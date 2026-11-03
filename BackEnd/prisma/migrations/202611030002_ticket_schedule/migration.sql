-- Chamados antigos não têm agendamento, por isso as colunas aceitam nulo.
ALTER TABLE "Ticket" ADD COLUMN "scheduledDate" DATE,
ADD COLUMN "scheduledHour" TEXT;

-- O Prisma não representa índice parcial no schema: encerrar o chamado libera o horário.
CREATE UNIQUE INDEX "Ticket_active_schedule_key" ON "Ticket"("technicianId", "scheduledDate", "scheduledHour")
WHERE "status" <> 'ENCERRADO';

-- O funcionamento passa a ser das 08:00 às 20:00: o último atendimento começa às 19:00.
UPDATE "User"
SET "availability" = ARRAY(
  SELECT hour FROM unnest("availability") AS hour
  WHERE hour >= '08:00' AND hour <= '19:00'
  ORDER BY hour
);
