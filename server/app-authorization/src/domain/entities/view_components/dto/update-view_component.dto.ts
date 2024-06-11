import { PartialType } from '@nestjs/swagger';
import { CreateViewComponentDto } from './create-view_component.dto';

export class UpdateViewComponentDto extends PartialType(
  CreateViewComponentDto,
) {}
