import { Module } from '@nestjs/common';
import { RoleFunctionalPermissionsService } from './role-functional-permissions.service';
import { RoleFunctionalPermissionsController } from './role-functional-permissions.controller';

@Module({
  controllers: [RoleFunctionalPermissionsController],
  providers: [RoleFunctionalPermissionsService],
  exports: [RoleFunctionalPermissionsService],
})
export class RoleFunctionalPermissionsModule {}
