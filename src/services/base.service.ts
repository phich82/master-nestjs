import { LoggerService } from '@nestjs/common';
import { BaseEntity, Repository, DeleteResult, FindOptionsWhere, FindOneOptions } from 'typeorm';
import { BaseServiceContract } from '@/services/contracts/base-service.contract';

export class BaseService<T extends BaseEntity, R extends Repository<T>> implements BaseServiceContract<T> {
  protected readonly repository: R;
  protected readonly logger: LoggerService;

  constructor(repository: R, logger: LoggerService) {
    this.repository = repository
    this.logger = logger
  }

  getAll(): Promise<T[]> {
    return this.repository.find();
  }

  getBy(conditions: FindOptionsWhere<T>): Promise<T[]> {
    return this.repository.findBy(conditions);
  }

  getOne(id: number): Promise<T> {
    return this.repository.findOne(id as FindOneOptions<T>);
  }

  store(data: any): Promise<T> {
    return this.repository.save(data);
  }

  async update(id: number, data: any): Promise<T> {
    await this.repository.update(id, data);
    return this.getOne(id);
  }

  destroy(id: number): Promise<void> {
    return this.repository.delete(id)
      .then(result => Promise.resolve())
      .catch(error => Promise.reject(error));
  }
}
