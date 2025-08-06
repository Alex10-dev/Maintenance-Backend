import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { ConfigAppModule } from './config/config.module';
import { RoleModule } from './role/role.module';
import { NotificationModule } from './notification/notification.module';
import { FilesModule } from './files/files.module';
import { ExternalNotificationsModule } from './external-notifications/external-notifications.module';
import { IssuesModule } from './issues/issues.module';

@Module({
  imports: [
    ConfigAppModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    CommonModule,
    RoleModule,
    NotificationModule,
    FilesModule,
    ExternalNotificationsModule,
    IssuesModule,
  ]
})
export class AppModule {}
