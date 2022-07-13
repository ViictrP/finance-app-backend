/*
  Warnings:

  - A unique constraint covering the columns `[month,year,credit_card_id]` on the table `invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "invoice_month_year_key";

-- CreateIndex
CREATE UNIQUE INDEX "invoice_month_year_credit_card_id_key" ON "invoice"("month", "year", "credit_card_id");
