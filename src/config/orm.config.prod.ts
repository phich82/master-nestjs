import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Event } from '@modules/events/entities/event.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: process.env.DB_TYPE as 'mysql' | 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Event],
    synchronize: false,
    dropSchema: Boolean(parseInt(process.env.DB_DROP_SCHEMA)),
    // migrations: ["${rootDir}/src/database/migrations/**/*.{js,ts}"],
  }),
);
