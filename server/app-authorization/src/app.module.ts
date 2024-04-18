import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamoDBModule } from './db/config/dynamo/dynamo.module';
import { dataSourceOptions } from './db/config/mysql/orm.config';
import { env } from 'process';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { GlobalExceptions } from './domain/shared/error-management/global.exception';
import { AuthorizationModule } from './domain/authorization.module';
import { LoggingInterceptor } from './domain/shared/Interceptors/logging.interceptor';
import { ResponseInterceptor } from './domain/shared/Interceptors/response.interceptor';
import { routes as mainRoutes } from './domain/routes/main.routes';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    DynamoDBModule.forRoot({
      region: env.ARIM_DYNAMO_REGION,
      credentials: {
        accessKeyId: env.ARIM_DYNAMO_ACCESS_KEY,
        secretAccessKey: env.ARIM_DYNAMO_SECRET_ACCESS_KEY,
      },
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    RouterModule.register(mainRoutes),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthorizationModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptions,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
