import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { CommonModule } from 'src/common/common.module';
import { UsersModule } from 'src/users/users.module';
import { ValidateUserTokenUseCase } from './use-cases/validate-user-token.use-case';

@Module({
  providers: [
    NotificationGateway, 
    NotificationService,

    ValidateUserTokenUseCase,
  ],
  imports: [
    CommonModule,
    UsersModule
  ]
})
export class NotificationModule {}
