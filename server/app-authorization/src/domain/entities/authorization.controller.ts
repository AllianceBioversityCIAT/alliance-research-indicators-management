import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
//import { SearchRequest } from '../shared/decorators/search-request.decorator';
import { CognitoProfileDto } from '../shared/global-dto/cognito-profile.dto';

@Controller()
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @ApiBearerAuth('access-token')
  @Post('login')
  @UseGuards(AuthGuard('cognito'))
  async login(/*@SearchRequest('user') user: CognitoProfileDto*/) {
    return this.authorizationService.login({
      email: 'd.casanas@cgiar.org',
    } as CognitoProfileDto);
  }
}
