import { Module } from '@nestjs/common';
import { OrganizationalEntitiesService } from './organizational-entities.service';
import { OrganizationalEntitiesController } from './organizational-entities.controller';

@Module({
  controllers: [OrganizationalEntitiesController],
  providers: [OrganizationalEntitiesService],
})
export class OrganizationalEntitiesModule {}
