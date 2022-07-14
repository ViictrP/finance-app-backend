/*
  Warnings:

  - Added the required column `date` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
