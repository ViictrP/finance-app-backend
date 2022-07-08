/*
  Warnings:

  - Made the column `salary` on table `finance_app_user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "finance_app_user" ALTER COLUMN "salary" SET NOT NULL;
