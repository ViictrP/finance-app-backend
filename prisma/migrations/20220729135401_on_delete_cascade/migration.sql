-- DropForeignKey
ALTER TABLE "credit_card" DROP CONSTRAINT "credit_card_user_id_fkey";

-- DropForeignKey
ALTER TABLE "invoice" DROP CONSTRAINT "invoice_credit_card_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_invoice_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_user_id_fkey";

-- AddForeignKey
ALTER TABLE "credit_card" ADD CONSTRAINT "credit_card_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "finance_app_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_credit_card_id_fkey" FOREIGN KEY ("credit_card_id") REFERENCES "credit_card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "finance_app_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
