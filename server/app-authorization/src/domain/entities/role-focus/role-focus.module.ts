import { Module } from '@nestjs/common';
import { RoleFocusService } from './role-focus.service';
import { RoleFocusController } from './role-focus.controller';

@Module({
  controllers: [RoleFocusController],
  providers: [RoleFocusService],
})
export class RoleFocusModule {}
