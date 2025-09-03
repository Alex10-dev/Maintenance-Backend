import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CreateIssueUseCase } from './use-cases/create-issue.use-case';
import { ExternalNotificationsModule } from 'src/external-notifications/external-notifications.module';
import { DeleteOneIssueUseCase } from './use-cases/delete-one-issue.use-case';
import { FindOneIssueUseCase } from './use-cases/find-one-issue.use-case';
import { UpdateIssueUseCase } from './use-cases/update-issue.use-case';
import { FilesModule } from 'src/files/files.module';
import { UploadFileToIssueUseCase } from './use-cases/upload-file-to-issue.use-case';

@Module({
  controllers: [IssuesController],
  providers: [
    IssuesService,
    FindOneIssueUseCase,
    CreateIssueUseCase,
    DeleteOneIssueUseCase,
    UpdateIssueUseCase,
    UploadFileToIssueUseCase,
  ],
  imports: [
    PrismaModule,
    ExternalNotificationsModule,
    FilesModule,
  ]
})
export class IssuesModule {}
