/*
  Warnings:

  - You are about to drop the column `backgroundColor` on the `credit_card` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `credit_card` table. All the data in the column will be lost.
  - You are about to drop the column `deleteDate` on the `credit_card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "credit_card" DROP COLUMN "backgroundColor",
DROP COLUMN "createAt",
DROP COLUMN "deleteDate",
ADD COLUMN     "background_color" TEXT NOT NULL DEFAULT 'bg-zinc-900',
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "delete_date" TIMESTAMP(3);
