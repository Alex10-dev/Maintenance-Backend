import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { CreateRoleUseCase } from './use-cases/create-role.use.case';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [RoleController],
  providers: [
    RoleService,
    CreateRoleUseCase,
  ],
  imports: [
    PrismaModule,
  ],
  exports: [
    RoleService,
  ]
})
export class RoleModule {}
