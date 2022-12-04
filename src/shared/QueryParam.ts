import { SORT } from './Sort';

export class QueryParam {
  public asc?: string;
  public desc?: string;
  public sort?: SORT;
  public page?: number;
  public lang?: string;
}
