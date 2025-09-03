import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AwsS3Adapter } from 'src/common/adapters/aws-s3.adapter';
import { FileUsage } from 'src/common/enums/file-usage.enum';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FilesService {

    constructor(
        private readonly S3: AwsS3Adapter,
        private readonly prismaService: PrismaService,
    ){}

    async uploadFile(file: Express.Multer.File, key: string){
        try {
            const uploadedFile = await this.S3.uploadFile(key, file.buffer, file.mimetype);
            // console.log(uploadedFile);
            if( uploadedFile.$metadata.httpStatusCode !== 200 )
                throw new InternalServerErrorException('S3 upload file failed');
            
            return {
                ok: true,
                message: 'Uploaded File',
            }

        } catch( error ) {
            throw new InternalServerErrorException('An Error ocurred while uploading the file');
        }
    }

    async getFiles() {

        try{
            const files = await this.S3.getFiles();
            if( files.$metadata.httpStatusCode !== 200 )
                throw new InternalServerErrorException('S3 get files failed');
            // console.log(files);
            return files.Contents

        } catch( error ) {
             throw new InternalServerErrorException('An Error ocurred while getting the files');
        }
        
    }

    async create(
        uploadedById: string, 
        file: Express.Multer.File, 
        usage: FileUsage, 
        key: string, 
        bucketName: string,
        originalname?: string,
    ) {
        return await this.prismaService.file.create({
            data: {
                uploadedById,
                fileSize: file.size,
                mimeType: file.mimetype,
                usage,
                key,
                bucketName,
                originalFileName: originalname
            },
            include: {
                uploadedBy: true
            }
        });
    }
}
