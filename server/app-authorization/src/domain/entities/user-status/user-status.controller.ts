import { Controller } from '@nestjs/common';
import { UserStatusService } from './user-status.service';

@Controller('user-status')
export class UserStatusController {
  constructor(private readonly userStatusService: UserStatusService) {}
}
