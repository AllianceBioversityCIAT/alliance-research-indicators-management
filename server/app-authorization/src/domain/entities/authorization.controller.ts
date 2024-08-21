import { Controller, Post, UseGuards, Headers } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SearchRequest } from '../shared/decorators/search-request.decorator';
import { CognitoProfileDto } from '../shared/global-dto/cognito-profile.dto';
import { ServiceResponseDto } from '../shared/global-dto/service-response.dto';
import { ResponseAccessTokenDto } from '../shared/global-dto/payload.dto';

@ApiTags('Authorization')
@Controller()
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('cognito'))
  @ApiOperation({ summary: 'Authenticate user and return access token' })
  @Post('login')
  login(
    @SearchRequest('user') user: CognitoProfileDto,
  ): Promise<ServiceResponseDto<ResponseAccessTokenDto>> {
    return this.authorizationService.login(user);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh the access token using a refresh token' })
  @ApiHeader({
    name: 'refresh-token',
    required: true,
  })
  refreshToken(
    @Headers('refresh-token') refreshToken: string,
  ): Promise<ServiceResponseDto<ResponseAccessTokenDto>> {
    return this.authorizationService.refreshToken(refreshToken);
  }
}
