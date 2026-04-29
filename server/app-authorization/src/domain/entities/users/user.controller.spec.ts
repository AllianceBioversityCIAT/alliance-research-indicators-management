import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user and return CREATED payload', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@email.test.com',
      first_name: 'Test',
      last_name: 'User',
      role_id: 1,
    };

    mockUsersService.create.mockResolvedValue({
      email: 'test@email.test.com',
      first_name: 'Test',
      last_name: 'User',
      sec_user_id: 1,
    });

    const result = await controller.create(createUserDto);

    expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
    expect(result.status).toBe(HttpStatus.CREATED);
    expect(result.data.email).toBe('test@email.test.com');
  });

  it('should find a user by id', async () => {
    mockUsersService.findById.mockResolvedValue({
      sec_user_id: 1,
      email: 'test@test.com',
      first_name: 'Test',
      last_name: 'User',
    });

    const result = await controller.findById('1');

    expect(mockUsersService.findById).toHaveBeenCalledWith(1);
    expect(result.status).toBe(HttpStatus.OK);
    expect(result.data.email).toBe('test@test.com');
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUserDto = {
      first_name: 'Updated Name',
      last_name: 'Updated Last Name',
    };

    mockUsersService.update.mockResolvedValue({
      sec_user_id: 1,
      email: 'test@test.com',
      first_name: 'Updated Name',
      last_name: 'Updated Last Name',
    });

    const result = await controller.update('1', updateUserDto);

    expect(mockUsersService.update).toHaveBeenCalledWith(1, updateUserDto);
    expect(result.status).toBe(HttpStatus.OK);
    expect(result.data.first_name).toBe('Updated Name');
    expect(result.data.last_name).toBe('Updated Last Name');
  });
});
