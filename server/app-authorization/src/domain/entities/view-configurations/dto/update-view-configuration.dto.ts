import { PartialType } from '@nestjs/swagger';
import { CreateViewConfigurationDto } from './create-view-configuration.dto';

export class UpdateViewConfigurationDto extends PartialType(
  CreateViewConfigurationDto,
) {}
