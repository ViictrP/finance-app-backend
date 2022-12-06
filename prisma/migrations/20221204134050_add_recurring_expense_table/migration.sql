-- CreateTable
CREATE TABLE "recurring_expense" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "recurring_expense_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "recurring_expense" ADD CONSTRAINT "recurring_expense_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "finance_app_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
