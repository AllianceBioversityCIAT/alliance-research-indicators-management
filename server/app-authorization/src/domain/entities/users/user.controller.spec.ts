import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserAgressoContractService } from '../../complementary-entities/secondary/user-agresso-contracts/user-agresso-contract.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { OrmConfigTestModule } from '../../../db/config/mysql/orm-connection-test.module';
import { UserRolesService } from '../user-roles/user-roles.service';
import { UserRoleContractsService } from '../user-role-contracts/user-role-contracts.service';
import { UserRoleResultsService } from '../user-role-results/user-role-results.service';
import { UserRolesRepository } from '../user-roles/user-roles.repository';

describe('UsersController (with real DB for tests)', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        UserAgressoContractService,
        UserRolesService,
        UserRoleContractsService,
        UserRoleResultsService,
        UserRolesRepository,
      ],
      imports: [OrmConfigTestModule],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should create a new user in the test database', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@email.test.com',
      first_name: 'Test',
      last_name: 'User',
      role_id: 1,
    };

    const result = await controller.create(createUserDto);

    expect(result.status).toBe(HttpStatus.CREATED);
    expect(result.data.email).toBe('test@email.test.com');
  }, 10000);

  it('should find a user by id in the test database', async () => {
    const result = await controller.findById('1');

    expect(result.status).toBe(HttpStatus.OK);
    expect(result.data.email).toBe('test@test.com');
  });

  it('should update a user in the test database', async () => {
    const updateUserDto: UpdateUserDto = {
      first_name: 'Updated Name',
      last_name: 'Updated Last Name',
    };

    const result = await controller.update('1', updateUserDto);

    expect(result.status).toBe(HttpStatus.OK);
    expect(result.data.first_name).toBe('Updated Name');
    expect(result.data.last_name).toBe('Updated Last Name');
  });
});
