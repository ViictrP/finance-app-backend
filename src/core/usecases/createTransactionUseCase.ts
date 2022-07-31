import { CreditCard, Invoice, Transaction } from '../entities';
import { CreditCardRepository, TransactionRepository, UserRepository } from '../repositories';
import { log } from '../logger/logger';
import { MONTHS } from '../enums/month.enum';
import { transactionValidator } from '../validators';

const createTransactionUseCase = async (transaction: Transaction, creditCardRepository: CreditCardRepository, userRepository: UserRepository, repository: TransactionRepository) => {
  log('[createTransactionUseCase]: validating new transaction', transaction);
  const isValid = transactionValidator(transaction);
  if (!isValid) {
    log(`[createTransactionUseCase]: transaction ${transaction.description} has invalid data`);
    throw new Error(`the transaction ${transaction.description} is invalid`);
  }
  transaction.date = new Date(transaction.date);
  transaction.installmentAmount = transaction.installmentAmount > 0 ? Number(transaction.installmentAmount) : 1;
  const transactionAmout = transaction.amount / transaction.installmentAmount;
  const transactionDate = new Date(transaction.date);
  let yearIncrement = 1;
  const { invoice, user } = transaction;
  if (invoice) {
    log('[createTransactionUseCase]: getting credit card for this transaction', transaction);
    const creditCard = await creditCardRepository.get(invoice.creditCard);
    for (let i = 0; i < transaction.installmentAmount; i++) {
      const newTransaction = { ...transaction };
      const monthIndex = transactionDate.getMonth();
      newTransaction.date.setMonth(monthIndex + i);
      newTransaction.date.setFullYear(transactionDate.getFullYear());
      newTransaction.amount = transactionAmout;
      newTransaction.installmentNumber = i + 1;
      populateWithInvoice(newTransaction, invoice, creditCard);
      log('[createTransactionUseCase]: persisting new transaction for invoice', transaction);
      await repository.createInvoiceTransaction(newTransaction);
      if (newTransaction.date.getMonth() === 11) {
        transactionDate.setFullYear(transactionDate.getFullYear() + yearIncrement);
      }
    }
    return transaction;
  } else {
    log('[createTransactionUseCase]: getting user for this transaction', transaction);
    const _user = await userRepository.get(user!);
    transaction.user = _user!;
    log('[createTransactionUseCase]: persisting new transaction for user', transaction);
    return repository.create(transaction);
  }
};

const populateWithInvoice = (transaction: Transaction, invoice: Invoice, creditCard: CreditCard) => {
  const day = transaction.date.getDate();
  let month = MONTHS[transaction.date.getMonth()];
  let year = transaction.date.getFullYear();
  if (day > creditCard.invoiceClosingDay) {
    let nextMonthIndex = transaction.date.getMonth() + 1;
    if (nextMonthIndex === 12) {
      nextMonthIndex = 0;
      year++;
    }
    month = MONTHS[nextMonthIndex];
  }
  log('[createTransactionUseCase]: getting the invoice for this transaction', transaction);
  let _invoice = creditCard.invoices.filter(invoice => invoice.month === month && invoice.year === year)[0];
  if (!_invoice) {
    log('[createTransactionUseCase]: invoice doesnt exist yet, creating a new one', transaction);
    _invoice = {
      month: month,
      year: year,
      isClosed: false,
      creditCard: creditCard,
    } as any;
  }
  transaction.invoice = { ..._invoice, creditCard: creditCard };
};

export default createTransactionUseCase;
