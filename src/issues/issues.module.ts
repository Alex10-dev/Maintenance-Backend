import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CreateIssueUseCase } from './use-cases/create-issue.use-case';
import { ExternalNotificationsModule } from 'src/external-notifications/external-notifications.module';

@Module({
  controllers: [IssuesController],
  providers: [
    IssuesService,
    CreateIssueUseCase,
  ],
  imports: [
    PrismaModule,
    ExternalNotificationsModule
  ]
})
export class IssuesModule {}
