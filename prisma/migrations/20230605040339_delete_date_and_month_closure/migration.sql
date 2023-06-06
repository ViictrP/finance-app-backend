/*
  Warnings:

  - Added the required column `deleteDate` to the `credit_card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deleteDate` to the `finance_app_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deleteDate` to the `invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deleteDate` to the `recurring_expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deleteDate` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "credit_card" ADD COLUMN     "deleteDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "finance_app_user" ADD COLUMN     "deleteDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "invoice" ADD COLUMN     "deleteDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "recurring_expense" ADD COLUMN     "deleteDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "deleteDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "month_closure" (
    "id" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleteDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "month_closure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "month_closure_month_year_user_id_key" ON "month_closure"("month", "year", "user_id");

-- AddForeignKey
ALTER TABLE "month_closure" ADD CONSTRAINT "month_closure_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "finance_app_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
