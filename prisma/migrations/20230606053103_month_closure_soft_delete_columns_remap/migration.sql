/*
  Warnings:

  - You are about to drop the column `backgroundColor` on the `credit_card` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `credit_card` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `finance_app_user` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `isClosed` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `recurring_expense` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `installmentAmount` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `installmentId` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `installmentNumber` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `isInstallment` on the `transaction` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "credit_card_number_user_id_key";

-- AlterTable
ALTER TABLE "credit_card" DROP COLUMN "backgroundColor",
DROP COLUMN "createAt",
ADD COLUMN     "background_color" TEXT NOT NULL DEFAULT 'bg-zinc-900',
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "delete_date" TIMESTAMP(3),
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "finance_app_user" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "delete_date" TIMESTAMP(3),
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "invoice" DROP COLUMN "createdAt",
DROP COLUMN "isClosed",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_closed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "recurring_expense" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "delete_date" TIMESTAMP(3),
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "createdAt",
DROP COLUMN "installmentAmount",
DROP COLUMN "installmentId",
DROP COLUMN "installmentNumber",
DROP COLUMN "isInstallment",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "delete_date" TIMESTAMP(3),
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "installment_amount" INTEGER,
ADD COLUMN     "installment_id" TEXT,
ADD COLUMN     "installment_number" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "is_installment" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "month_closure" (
    "id" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "delete_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DECIMAL(10,2) NOT NULL,
    "expenses" DECIMAL(10,2) NOT NULL,
    "available" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "month_closure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "credit_card_number_user_id_idx" ON "credit_card"("number", "user_id");

-- AddForeignKey
ALTER TABLE "month_closure" ADD CONSTRAINT "month_closure_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "finance_app_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
