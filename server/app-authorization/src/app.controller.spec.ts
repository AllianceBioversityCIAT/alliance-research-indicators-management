import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Request } from 'express';
import { HttpStatus } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(
        appController.mainPage({
          ip: '::1',
          headers: { 'user-agent': 'test' },
        } as Request),
      ).toEqual({
        description: 'Aliance Management',
        status: HttpStatus.OK,
        data: {
          message: 'Welcome to the Aliance Management API',
          author: 'One CGIAR - IBD',
          ip: '::1',
          client: 'test',
        },
      });
    });
  });
});
