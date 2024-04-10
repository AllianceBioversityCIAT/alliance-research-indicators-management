import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { ResponseUtils } from '../shared/utils/response.utils';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

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
