-- AlterTable
ALTER TABLE "credit_card" ALTER COLUMN "deleteDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "finance_app_user" ALTER COLUMN "deleteDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "invoice" ALTER COLUMN "deleteDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "month_closure" ALTER COLUMN "deleteDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "recurring_expense" ALTER COLUMN "deleteDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "transaction" ALTER COLUMN "deleteDate" DROP NOT NULL;
