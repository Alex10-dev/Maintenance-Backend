import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CommonModule } from 'src/common/common.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UploadFileToAWSUseCase } from './use-cases/upload-file-to-aws.use-case';

@Module({
  controllers: [FilesController],
  providers: [
    FilesService,
    UploadFileToAWSUseCase,
  ],
  imports: [
    CommonModule,
    PrismaModule,
  ],
  exports: [FilesService, UploadFileToAWSUseCase],
})
export class FilesModule {}
