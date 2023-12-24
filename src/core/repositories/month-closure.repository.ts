import MonthClosure from '../entities/month-closure';

export default interface MonthClosureRepository {
  create: (monthClosure: MonthClosure) => Promise<MonthClosure>;
}
