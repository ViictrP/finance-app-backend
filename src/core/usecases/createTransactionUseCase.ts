import { Invoice, Transaction } from '../entities';
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
  const { invoice, user } = transaction;
  if (invoice) {
    await createInvoiceTransaction(transaction, invoice, creditCardRepository, repository);
    log('[createTransactionUseCase]: persisting new transaction for invoice', transaction);
    return repository.createInvoiceTransaction(transaction, invoice);
  } else {
    log('[createTransactionUseCase]: getting user for this transaction', transaction);
    const _user = await userRepository.get(user!);
    transaction.user = _user!;
    log('[createTransactionUseCase]: persisting new transaction for user', transaction);
    return repository.create(transaction);
  }
};

const createInvoiceTransaction = async (transaction: Transaction, invoice: Invoice, creditCardRepository: CreditCardRepository, repository: TransactionRepository) => {
  log('[createTransactionUseCase]: getting credit card for this transaction', transaction);
  const creditCard = await creditCardRepository.get(invoice.creditCard);
  const month = MONTHS[transaction.date.getMonth()];
  const year = transaction.date.getFullYear();
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
  transaction.invoice = _invoice;
};

export default createTransactionUseCase;
