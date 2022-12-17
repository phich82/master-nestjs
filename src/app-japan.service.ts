import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppJapanService {

  constructor(
    @Inject('APP_NAME')
    private readonly name: string,
    @Inject('MESSAGE')
    private readonly message
  ) {}

  getHello(): string {
    return `Hello World! Japan (${this.name}), ${this.message}`;
  }
}
