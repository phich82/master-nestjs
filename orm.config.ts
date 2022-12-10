import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { Profile } from './../auth/profile.entity';
// import { User } from './../auth/user.entity';
// import { Attendee } from './../events/attendee.entity';
// import { Event } from './../events/event.entity';
// import { Subject } from './../school/subject.entity';
// import { Teacher } from './../school/teacher.entity';


export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: process.env.DB_TYPE as 'mysql' | 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    // entities: [Event, Attendee, Subject, Teacher, User, Profile],
    synchronize: true,
    dropSchema: Boolean(parseInt(process.env.DB_DROP_SCHEMA)),
  }),
);

// import { TypeOrmModuleOptions } from "@nestjs/typeorm";
// import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

// const config: MysqlConnectionOptions = {
//   type: 'mysql',
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   database: process.env.DB_NAME,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   // entities: ['dist/models/**/*.entity{.ts,.js}'],
//   synchronize: false, // false để khi bạn thay đổi trong entities nó sẽ không tự update DB
//   dropSchema: false,
//   migrations: [
//     "src/database/migrations/*.ts",
//   ],
// }

// export default config;
