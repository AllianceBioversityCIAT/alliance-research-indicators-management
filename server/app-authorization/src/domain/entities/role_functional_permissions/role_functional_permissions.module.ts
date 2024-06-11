import { Module } from '@nestjs/common';
import { RoleFunctionalPermissionsService } from './role_functional_permissions.service';
import { RoleFunctionalPermissionsController } from './role_functional_permissions.controller';

@Module({
  controllers: [RoleFunctionalPermissionsController],
  providers: [RoleFunctionalPermissionsService],
})
export class RoleFunctionalPermissionsModule {}
