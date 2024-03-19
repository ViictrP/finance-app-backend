import { log } from '../logger/logger';
import { MONTHS } from '../enums/month.enum';
import { randomUUID } from 'crypto';
import ValidationError from '../errors/validation.error';
import Transaction from '../entities/transaction';
import CreditCardRepository from '../repositories/credit-card.repository';
import CreditCard from '../entities/credit-card';
import User from '../entities/user';
import Invoice from '../entities/invoice';
import TransactionRepository from '../repositories/transaction.repository';
import transactionValidator from '../validators/transaction.validator';

const createTransactionUsecase = async (
  transaction: Transaction,
  creditCardRepository: CreditCardRepository,
  repository: TransactionRepository
) => {
  log('[createTransactionUsecase]: validating new transaction', transaction);
  const isValid = transactionValidator(transaction);
  if (!isValid) {
    log(`[createTransactionUseCase]: transaction ${transaction.description} has invalid data`);
    throw new ValidationError(`the transaction ${transaction.description} is invalid`);
  }
  transaction.date = new Date(transaction.date);
  const { invoice, user } = transaction;
  if (invoice) {
    return await createTransactionWithinInvoice(
      transaction,
      creditCardRepository,
      invoice,
      repository
    );
  } else {
    return await createTransactionWithoutInvoice(transaction, user, repository);
  }
};

async function createTransactionWithinInvoice(
  transaction: Transaction,
  creditCardRepository: CreditCardRepository,
  invoice: Invoice,
  repository: TransactionRepository
) {
  transaction.installmentAmount = transaction.installmentAmount > 0 ? Number(transaction.installmentAmount) : 1;
  const transactionAmout = transaction.amount / transaction.installmentAmount;
  const transactionDate = new Date(transaction.date);
  let yearIncrement = 1;
  log('[createTransactionUsecase]: getting credit card for this transaction', transaction);
  const creditCard = await creditCardRepository.get(invoice.creditCard, false);
  const installmentId = randomUUID();

  async function createNewInstallment(installmentNumber: number) {
    const newTransaction: Transaction = { ...transaction };
    const monthIndex = transactionDate.getMonth();
    newTransaction.date.setMonth(monthIndex + installmentNumber);
    newTransaction.date.setFullYear(transactionDate.getFullYear());
    newTransaction.amount = transactionAmout;
    newTransaction.installmentNumber = installmentNumber + 1;
    newTransaction.installmentId = installmentId;
    populateWithInvoice(newTransaction, creditCard);
    log('[createTransactionUsecase]: persisting new transaction for invoice', transaction);
    await repository.createInvoiceTransaction(newTransaction);
    return newTransaction;
  }

  for (let i = 0; i < transaction.installmentAmount; i++) {
    const newTransaction = await createNewInstallment(i);
    if (newTransaction.date.getMonth() === 11) {
      transactionDate.setFullYear(
        transactionDate.getFullYear() + yearIncrement
      );
    }
  }
  return transaction;
}

async function createTransactionWithoutInvoice(
  transaction: Transaction,
  user: User,
  repository: TransactionRepository
) {
  transaction.user = user!;
  log('[createTransactionUsecase]: persisting new transaction for user', transaction);
  return repository.create(transaction);
}

const populateWithInvoice = (
  transaction: Transaction,
  creditCard: CreditCard
) => {
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
  log('[createTransactionUsecase]: getting the invoice for this transaction', transaction);
  let _invoice = creditCard.invoices.filter(
    (invoice) => invoice.month === month && invoice.year === year
  )[0];
  if (!_invoice) {
    log('[createTransactionUsecase]: invoice doesnt exist yet, creating a new one', transaction);
    _invoice = {
      month: month,
      year: year,
      isClosed: false,
      creditCard: creditCard
    } as Partial<Invoice> as Invoice;
  }
  transaction.invoice = { ..._invoice, creditCard: creditCard };
};

export default createTransactionUsecase;
