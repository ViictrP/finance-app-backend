import { log } from '../logger/logger';
import monthClosureValidator from '../validators/month-closure.validator';
import { MONTHS } from '../enums/month.enum';
import MonthClosure from '../entities/month-closure';
import MonthClosureRepository from '../repositories/month-closure.repository';
import UserRepository from '../repositories/user.repository';
import ValidationError from '../errors/validation.error';
import User from '../entities/user';

const createMonthClosureUsecase = async (
  monthClosure: MonthClosure,
  repository: MonthClosureRepository,
  userRepository: UserRepository
) => {
  log(
    `[createMonthClosureUsecase]: validating month closure of ${monthClosure.month}/${monthClosure.year} information`
  );
  const isValid = monthClosureValidator({ ...monthClosure });
  if (!isValid) {
    log(
      `[createMonthClosureUsecase]: month closure of ${monthClosure.month}/${monthClosure.year} has invalid data`
    );
    throw new ValidationError(
      `the month closure of ${monthClosure.month}/${monthClosure.year} is invalid`
    );
  }

  log(
    '[createMonthClosureUsecase]: finding the owner of the new month closure',
    `${monthClosure.month}/${monthClosure.year}`
  );
  const user = await userRepository.get(monthClosure.user);
  const modifiedMonthClosure: MonthClosure = { ...monthClosure };
  modifiedMonthClosure.user = { id: user?.id } as User;
  modifiedMonthClosure.index = MONTHS.indexOf(monthClosure.month);

  log(
    `[createMonthClosureUsecase]: persisting new month closure of ${monthClosure.month}/${monthClosure.year}`
  );
  return repository.create(modifiedMonthClosure);
};

export default createMonthClosureUsecase;
