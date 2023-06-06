/*
  Warnings:

  - You are about to drop the column `deleteDate` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "invoice" DROP COLUMN "deleteDate",
DROP COLUMN "deleted";
