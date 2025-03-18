import { SaveRoles } from '../../view-configurations/dto/create-view-configuration.dto';

export class CreateRoleFunctionalPermissionDto {
  public component_code!: string;
  public roles: SaveRoles[];
}
