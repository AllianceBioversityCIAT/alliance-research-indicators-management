import { PartialType } from '@nestjs/swagger';
import { CreateUserStatusDto } from './create-user-status.dto';

export class UpdateUserStatusDto extends PartialType(CreateUserStatusDto) {}
