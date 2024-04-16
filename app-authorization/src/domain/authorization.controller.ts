import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthGuard } from '@nestjs/passport';
import { ResponseUtils } from './shared/utils/response.utils';
import { ApiBearerAuth, ApiHeader, ApiHeaders } from '@nestjs/swagger';

@Controller()
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @ApiBearerAuth('access-token')
  @Post('login')
  @UseGuards(AuthGuard('cognito'))
  async login() {
    return ResponseUtils.format({
      data: 'login success',
      description: 'login success',
      status: 200,
    });
  }
}
