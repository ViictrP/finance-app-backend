/*
  Warnings:

  - Made the column `created_at` on table `month_closure` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "month_closure" ALTER COLUMN "created_at" SET NOT NULL;
