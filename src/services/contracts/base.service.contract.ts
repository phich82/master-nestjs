import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";

export interface BaseServiceContract<T> {
  getAll(): Promise<T[]>;

  getOne(id: number): Promise<T>;

  getBy(conditions: FindOptionsWhere<T>): Promise<T[]>;

  store(data: any): Promise<T>;

  update(id: number, data: any): Promise<T>;

  destroy(id: number): Promise<void>;
}
