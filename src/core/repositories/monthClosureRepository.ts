import { MonthClosure } from '../entities';

export type MonthClosureRepository = {
  create: (monthClosure: MonthClosure) => Promise<MonthClosure>;
}
