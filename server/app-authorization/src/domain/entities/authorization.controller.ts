import {
  Controller,
  Post,
  UseGuards,
  Headers,
  HttpStatus,
  Patch,
} from '@nestjs/common';
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
import {
  ResponseAccessTokenDto,
  ValidJwtResponse,
} from '../shared/global-dto/payload.dto';
import { ResponseUtils } from '../shared/utils/response.utils';
import { MessagePattern, Payload } from '@nestjs/microservices';

@ApiTags('Authorization')
@Controller()
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('cognito'))
  @ApiOperation({ summary: 'Authenticate user and return access token' })
  @Post('login')
  async login(
    @SearchRequest('user') user: CognitoProfileDto,
  ): Promise<ServiceResponseDto<ResponseAccessTokenDto>> {
    return this.authorizationService.login(user).then((response) =>
      ResponseUtils.format({
        status: HttpStatus.OK,
        description: 'User logged is successfully',
        data: response,
      }),
    );
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
    return this.authorizationService
      .refreshToken(refreshToken)
      .then((response) =>
        ResponseUtils.format({
          status: HttpStatus.OK,
          description: 'Token refreshed successfully',
          data: response,
        }),
      );
  }

  @MessagePattern('valid-jwt')
  async findAgreementById(@Payload() jwt: string): Promise<ValidJwtResponse> {
    return this.authorizationService.validJwt(jwt);
  }

  @Patch('validate-token')
  @ApiOperation({ summary: 'Validate the access token' })
  @ApiHeader({
    name: 'access-token',
    required: true,
  })
  async validateToken(@Headers('access-token') accessToken: string) {
    return this.authorizationService.validJwt(accessToken).then((response) =>
      ResponseUtils.format({
        status: HttpStatus.OK,
        description: 'Token is valid',
        data: response,
      }),
    );
  }
}
