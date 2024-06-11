import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  public first_name: string;
  @ApiProperty()
  public last_name: string;
}
