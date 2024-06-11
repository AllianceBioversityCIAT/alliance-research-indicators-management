import { Module } from '@nestjs/common';
import { ViewConfigurationsService } from './view-configurations.service';
import { ViewConfigurationsController } from './view-configurations.controller';

@Module({
  controllers: [ViewConfigurationsController],
  providers: [ViewConfigurationsService],
})
export class ViewConfigurationsModule {}
