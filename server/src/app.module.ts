import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { GlobalExceptions } from './domain/shared/error-management/global.exception';
import { LoggingInterceptor } from './domain/shared/Interceptors/logging.interceptor';
import { ResponseInterceptor } from './domain/shared/Interceptors/response.interceptor';
import { DynamoDBModule } from './db/config/dynamo/dynamo.module';
import { env } from 'process';
import { AuthorizationModule } from './domain/authorization/authorization.module';
import { routes } from './domain/routes/main.routes';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DynamoDBModule.forRoot({
      region: env.ARIM_DYNAMO_REGION,
      credentials: {
        accessKeyId: env.ARIM_DYNAMO_ACCESS_KEY,
        secretAccessKey: env.ARIM_DYNAMO_SECRET_ACCESS_KEY,
      },
    }),
    RouterModule.register(routes),
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
