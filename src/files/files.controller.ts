import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileUsage } from 'src/common/enums/file-usage.enum';
import { customFileInterceptor } from './helpers/custom-file-interceptor';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('test')
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
}
