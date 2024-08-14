import {
  Controller,
  Post,
  UseGuards,
  Headers,
  Get,
  Param,
} from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SearchRequest } from '../shared/decorators/search-request.decorator';
import { CognitoProfileDto } from '../shared/global-dto/cognito-profile.dto';
import { ServiceResponseDto } from '../shared/global-dto/service-response.dto';
import { ResponseAccessTokenDto } from '../shared/global-dto/payload.dto';
import { CognitoService } from '../tools/AWS/cognito/cognito.service';

@ApiTags('Authorization')
@Controller()
export class AuthorizationController {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly cognitoService: CognitoService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('cognito'))
  @Post('login')
  login(
    @SearchRequest('user') user: CognitoProfileDto,
  ): Promise<ServiceResponseDto<ResponseAccessTokenDto>> {
    return this.authorizationService.login(user);
  }

  @Post('refresh-token')
  refreshToken(
    @Headers('refresh-token') refreshToken: string,
  ): Promise<ServiceResponseDto<ResponseAccessTokenDto>> {
    return this.authorizationService.refreshToken(refreshToken);
  }

  @Get('testing-data/:email')
  async getTestingData(@Param('email') email: string) {
    const data = await this.cognitoService.getUserByEmail(email);
    console.log(data);
    return data;
  }
}
