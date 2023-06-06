/*
  Warnings:

  - You are about to drop the column `amount` on the `month_closure` table. All the data in the column will be lost.
  - Added the required column `available` to the `month_closure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expenses` to the `month_closure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `month_closure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "month_closure" DROP COLUMN "amount",
ADD COLUMN     "available" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "expenses" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "total" DECIMAL(10,2) NOT NULL;
