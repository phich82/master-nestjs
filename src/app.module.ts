import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './events/services/event.service';
import { EventController } from './events/event.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiResponse } from './shared';
import { Event } from './events/entities/event.entity';
import ormConfig from 'orm.config';
import { EventRepository } from './events/repositories/event.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // TypeOrmModule.forRoot(
    //   {
    //     type: 'mysql',
    //     host: '127.0.0.1',
    //     port: 33060,
    //     database: 'master_nestjs',
    //     username: 'admin',
    //     password: 'admin123',
    //     entities: [Event],
    //     // entities: ['src/events/entities/**/*.ts'],
    //     synchronize: false, // false để khi bạn thay đổi trong entities nó sẽ không tự update DB
    //     dropSchema: false,
    //     migrations: [
    //       // "src/database/migrations/*.ts",
    //     ],
    //   }
    // )
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
      // envFilePath: `${process.env.NODE_ENV}.env`,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig,
      imports: undefined,
    }),
  ],
  controllers: [EventController, AppController],
  providers: [EventRepository, EventService, AppService, ApiResponse],
})
export class AppModule {}
