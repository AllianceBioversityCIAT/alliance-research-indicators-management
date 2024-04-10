import { Injectable } from '@nestjs/common';
import { ResponseUtils } from './domain/shared/utils/response.utils';
import { ServiceResponseDto } from './domain/shared/global-dto/service-response.dto';

@Injectable()
export class AppService {
  getHello(): ServiceResponseDto<string> {
    return ResponseUtils.format({
      description: 'Hello World!',
      status: 200,
      data: 'Hello World!',
    });
  }
}
