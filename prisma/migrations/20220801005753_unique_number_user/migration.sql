/*
  Warnings:

  - A unique constraint covering the columns `[number,user_id]` on the table `credit_card` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "credit_card_number_key";

-- CreateIndex
CREATE UNIQUE INDEX "credit_card_number_user_id_key" ON "credit_card"("number", "user_id");
