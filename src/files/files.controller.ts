import { BadRequestException, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileUsage } from 'src/common/enums/file-usage.enum';
import { customFileInterceptor } from './helpers/custom-file-interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { generateS3Key } from './helpers/generate-s3-key.helper';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('/test')
  @UseInterceptors(customFileInterceptor({
    folder: FileUsage.TEST, 
    validExtensions: ['jpg', 'png', 'jpeg']
  }))
  uploadTestFile(
    @UploadedFile() file: Express.Multer.File
  ){
    if( !file ) throw new BadRequestException('Make sure that the file is an image');
    
    return {
      filename: file.originalname,
    };
  }

  @Post('/test-aws')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter('png', 'jpg', 'jpeg'),
  }))
  findAll(
    @UploadedFile() file: Express.Multer.File
  ) {
    if( !file ) throw new BadRequestException('Make sure that the file is an image');
    const key = generateS3Key(FileUsage.TEST, file);
    return this.filesService.uploadFile(file, key);
  }

  @Get('/test-aws')
  getFiles() {
    return this.filesService.getFiles();
  }

  @Get('/test-aws/:fileName')
  getOne(@Param('fileName') fileName: string) {
    return this.filesService.getFiles();
  }
}
