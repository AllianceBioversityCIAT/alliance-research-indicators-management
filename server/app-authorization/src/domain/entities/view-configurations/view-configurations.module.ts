import { Module } from '@nestjs/common';
import { ViewConfigurationsService } from './view-configurations.service';
import { ViewConfigurationsController } from './view-configurations.controller';
import { RoleFunctionalPermissionsModule } from '../role_functional_permissions/role_functional_permissions.module';

@Module({
  controllers: [ViewConfigurationsController],
  providers: [ViewConfigurationsService],
  imports: [RoleFunctionalPermissionsModule],
})
export class ViewConfigurationsModule {}
