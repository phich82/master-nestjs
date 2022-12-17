import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppJapanService } from './app-japan.service';
import { EventModule } from '@modules/events/event.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiResponse } from './shared';
import ormConfig from '@config/orm.config';
import { AppDummy } from './app-dummy';
import ormConfigProd from './config/orm.config.prod';

console.log('process.env => ', process.env.NODE_ENV)
@Module({
  imports: [
    EventModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
      envFilePath: `${process.env.NODE_ENV || ''}.env`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV != 'production' ? ormConfig : ormConfigProd,
      imports: undefined,
    }),
  ],
  controllers: [
    AppController,
  ],
  providers: [
    // AppJapanService,
    // AppService,
    ApiResponse,
    AppDummy,
    {
      provide: AppService,
      useClass: AppJapanService,
    },
    {
      provide: 'APP_NAME',
      useValue: 'Value from japan'
    },
    {
      provide: 'MESSAGE',
      inject: [AppDummy],
      useFactory: (app) => `${app.dummy()} Fatory!`,
    }
  ],
})
export class AppModule { }
