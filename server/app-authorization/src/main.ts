import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from 'process';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const logger: Logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  const config = new DocumentBuilder()
    .setTitle('Alliance research indicator management system API')
    .setDescription('The Alliance research indicator management system API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const port: number = parseInt(env.ARIM_PORT);
  const document = SwaggerModule.createDocument(app, config);
  const swaggerPath: string = 'swagger';
  SwaggerModule.setup(swaggerPath, app, document);
  await app
    .listen(port)
    .then(() => {
      logger.debug(`Application is running http://localhost:${port}`);
      logger.debug(
        `Documentation is running http://localhost:${port}/${swaggerPath}`,
      );
    })
    .catch((err) => {
      const portValue: number | string = port || '<Not defined>';
      logger.error(`Application failed to start on port ${portValue}`);
      logger.error(err);
    });
}
bootstrap();
