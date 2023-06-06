/*
  Warnings:

  - Added the required column `amount` to the `month_closure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "month_closure" ADD COLUMN     "amount" DECIMAL(10,2) NOT NULL;
