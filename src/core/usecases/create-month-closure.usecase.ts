import { MonthClosure, User } from '../entities';
import { MonthClosureRepository, UserRepository } from '../repositories';
import { log } from '../logger/logger';
import monthClosureValidator from '../validators/month-closure.validator';
import { MONTHS } from '../enums/month.enum';

const createMonthClosureUsecase = async (monthClosure: MonthClosure, repository: MonthClosureRepository, userRepository: UserRepository) => {
  log(`[createMonthClosureUsecase]: validating month closure of ${monthClosure.month}/${monthClosure.year} information`);
  const isValid = monthClosureValidator(monthClosure);
  if (!isValid) {
    log(`[createMonthClosureUsecase]: month closure of ${monthClosure.month}/${monthClosure.year} has invalid data`);
    throw new Error(`the month closure of ${monthClosure.month}/${monthClosure.year} is invalid`);
  }

  log('[createMonthClosureUsecase]: finding the owner of the new month closure', `${monthClosure.month}/${monthClosure.year}`);
  const user = await userRepository.get(monthClosure.user);
  monthClosure.user = { id: user!.id} as User;
  monthClosure.index = MONTHS.indexOf(monthClosure.month);

  log(`[createMonthClosureUsecase]: persisting new month closure of ${monthClosure.month}/${monthClosure.year}`);
  return repository.create(monthClosure);
};

export default createMonthClosureUsecase;
