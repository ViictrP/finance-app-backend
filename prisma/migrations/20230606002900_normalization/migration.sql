/*
  Warnings:

  - You are about to drop the column `createdAt` on the `finance_app_user` table. All the data in the column will be lost.
  - You are about to drop the column `deleteDate` on the `finance_app_user` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `isClosed` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `month_closure` table. All the data in the column will be lost.
  - You are about to drop the column `deleteDate` on the `month_closure` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `recurring_expense` table. All the data in the column will be lost.
  - You are about to drop the column `deleteDate` on the `recurring_expense` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `deleteDate` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `installmentAmount` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `installmentId` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `installmentNumber` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `isInstallment` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `installment_amount` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "finance_app_user" DROP COLUMN "createdAt",
DROP COLUMN "deleteDate",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "delete_date" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "invoice" DROP COLUMN "createdAt",
DROP COLUMN "isClosed",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_closed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "month_closure" DROP COLUMN "createdAt",
DROP COLUMN "deleteDate",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "delete_date" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "recurring_expense" DROP COLUMN "createdAt",
DROP COLUMN "deleteDate",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "delete_date" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "createdAt",
DROP COLUMN "deleteDate",
DROP COLUMN "installmentAmount",
DROP COLUMN "installmentId",
DROP COLUMN "installmentNumber",
DROP COLUMN "isInstallment",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "delete_date" TIMESTAMP(3),
ADD COLUMN     "installment_amount" INTEGER NOT NULL,
ADD COLUMN     "installment_id" TEXT,
ADD COLUMN     "installment_number" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "is_installment" BOOLEAN NOT NULL DEFAULT false;
