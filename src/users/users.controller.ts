import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserRolesUseCase } from './use-cases/update-user-roles.use-case';
import { Auth } from 'src/common/decorators/auth.decorator';
import { RequiredRoles } from 'src/common/enums/required-roles';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
    private readonly updateUserRoles: UpdateUserRolesUseCase,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post('/add-role/:userId/:roleId')
  @Auth(RequiredRoles.ADMIN)
  addRole(
    @Param('userId', new ParseUUIDPipe({
      exceptionFactory: () => new BadRequestException('user id must be a valid UUID'),
    })) userId: string,
    @Param('roleId', new ParseUUIDPipe({
      exceptionFactory: () => new BadRequestException('role id must be a valid UUID')
    })) roleId: string,
  ) {
    // return 'Hello';
    // return this.usersService.addRoleToUser(userId, roleId);
    return this.updateUserRoles.execute(userId, roleId, "Add");
  }

  @Delete('/remove-role/:userId/:roleId')
  @Auth(RequiredRoles.ADMIN)
  removeRole(
    @Param('userId', new ParseUUIDPipe({
      exceptionFactory: () => new BadRequestException('user id must be a valid UUID'),
    })) userId: string,
    @Param('roleId', new ParseUUIDPipe({
      exceptionFactory: () => new BadRequestException('role id must be a valid UUID')
    })) roleId: string,
  ) {
    // return 'Hello';
    // return this.usersService.addRoleToUser(userId, roleId);
    return this.updateUserRoles.execute(userId, roleId, "Remove");
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
