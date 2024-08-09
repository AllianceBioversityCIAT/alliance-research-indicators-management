import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CognitoStrategy } from './cognito.strategy';
import { Observable, of, throwError } from 'rxjs';
import { CognitoProfileDto } from '../../../shared/global-dto/cognito-profile.dto';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

describe('CognitoStrategy', () => {
  let service: CognitoStrategy;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CognitoStrategy, ConfigService],
      imports: [HttpModule],
    }).compile();

    service = module.get<CognitoStrategy>(CognitoStrategy);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate and return profile data', async () => {
    const profileData: CognitoProfileDto = {
      email: 'test@test.com',
      email_verified: 'true',
      family_name: 'Test',
      given_name: 'Test',
      sub: '',
      identities: '',
      name: 'test',
      username: 'test@test.com',
    };

    const mockResponse = {
      data: { access_token: 'test_token' },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    const mockResponseProfile = {
      data: profileData,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };
    jest
      .spyOn(httpService, 'post')
      .mockReturnValue(of(mockResponse) as Observable<any>);

    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(of(mockResponseProfile) as Observable<any>);

    const req = {
      headers: {
        authorization: 'Bearer test_code',
      },
    };
    const result = await service.validate(req as any);
    expect(result).toEqual(profileData);
  });

  it('should throw UnauthorizedException when no valid authorization is provided', async () => {
    const req = {
      headers: {
        authorization: '',
      },
    };
    expect(service.validate(req as any)).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException when no authorization is provided', async () => {
    const req = {
      headers: {},
    };
    expect(service.validate(req as any)).rejects.toThrow(UnauthorizedException);
  });

  it('should throw an error when HttpService.post fails', async () => {
    jest
      .spyOn(httpService, 'post')
      .mockReturnValue(throwError(() => new BadRequestException()));
    const req = {
      headers: {
        authorization: 'Bearer test_code',
      },
    };
    expect(service.validate(req as any)).rejects.toThrow(BadRequestException);
  });

  it('should throw an error when HttpService.post fails 2', async () => {
    const mockResponse = {
      data: {},
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };
    jest
      .spyOn(httpService, 'post')
      .mockReturnValue(of(mockResponse) as Observable<any>);
    const req = {
      headers: {
        authorization: 'Bearer test_code',
      },
    };
    expect(service.validate(req as any)).rejects.toThrow(BadRequestException);
  });

  it('should throw an error when HttpService.get fails', async () => {
    const mockResponse = {
      data: { access_token: 'test_token' },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    jest
      .spyOn(httpService, 'post')
      .mockReturnValue(of(mockResponse) as Observable<any>);

    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(throwError(() => new BadRequestException()));

    const req = {
      headers: {
        authorization: 'Bearer test_code',
      },
    };
    expect(service.validate(req as any)).rejects.toThrow(BadRequestException);
  });

  it('should throw an error when HttpService.get fails 2', async () => {
    const mockResponse = {
      data: { access_token: 'test_token' },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    const mockResponseProfile = {
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    jest
      .spyOn(httpService, 'post')
      .mockReturnValue(of(mockResponse) as Observable<any>);

    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(of(mockResponseProfile) as Observable<any>);

    const req = {
      headers: {
        authorization: 'Bearer test_code',
      },
    };
    expect(service.validate(req as any)).rejects.toThrow(BadRequestException);
  });
});
