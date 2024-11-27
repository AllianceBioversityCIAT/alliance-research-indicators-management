import { Controller } from '@nestjs/common';
import { UserRoleContractsService } from './user-role-contracts.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { LinkUserRoleContractDto } from './dto/link-user-contract.dto';
import { FindUserRoleContractDto } from './dto/find-user-role-contract.dto';

@ApiTags('User Roles')
@Controller()
export class UserRoleContractsController {
  constructor(
    private readonly userRoleContractsService: UserRoleContractsService,
  ) {}

  @MessagePattern('link-user-contract')
  async linkUserContract(@Payload() payload: string) {
    const data: LinkUserRoleContractDto = JSON.parse(payload);
    return this.userRoleContractsService.create({
      primaryFilterKey: data.user_id,
      dataToSave: {
        contract_id: data.contract_id,
        role_id: data.role_id,
      },
      generalCompareKey: 'contract_id',
      otherAttributes: ['role_id'],
      onlyCreate: true,
    });
  }

  @MessagePattern('find-user-contract')
  async findUserContract(@Payload() payload: string) {
    const data: FindUserRoleContractDto = JSON.parse(payload);
    return this.userRoleContractsService.find(data.user_id, data.role_id);
  }
}
