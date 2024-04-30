import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { env } from 'process';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: env.ARIM_MYSQL_HOST,
  port: parseInt(env.DB_PORT),
  username: env.ARIM_MYSQL_USER_NAME,
  password: env.ARIM_MYSQL_USER_PASS,
  database: env.ARIM_MYSQL_NAME,
  entities: [`${__dirname}/../../../domain/**/*.entity{.ts,.js}`],
  synchronize: false,
  migrationsRun: false,
  bigNumberStrings: false,
  logging: false,
  migrations: [`${__dirname}/../../migrations/**/*{.ts,.js}`],
  migrationsTableName: 'migrations',
  metadataTableName: 'orm_metadata',
  extra: {
    namedPlaceholders: true,
    charset: 'utf8mb4_unicode_ci',
  },
};

export const dataSource: DataSource = new DataSource(dataSourceOptions);
