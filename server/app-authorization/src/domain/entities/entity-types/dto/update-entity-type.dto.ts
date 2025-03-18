import { PartialType } from '@nestjs/swagger';
import { CreateEntityTypeDto } from './create-entity-type.dto';

export class UpdateEntityTypeDto extends PartialType(CreateEntityTypeDto) {}
