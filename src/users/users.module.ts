import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RoleModule } from 'src/role/role.module';
import { UpdateUserRolesUseCase } from './use-cases/update-user-roles.use-case';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UpdateUserRolesUseCase,
  ],
  exports: [UsersService],
  imports: [
    PrismaModule,
    RoleModule,
  ]
})
export class UsersModule {}
