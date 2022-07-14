-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_invoice_id_fkey";

-- AlterTable
ALTER TABLE "transaction" ALTER COLUMN "invoice_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
