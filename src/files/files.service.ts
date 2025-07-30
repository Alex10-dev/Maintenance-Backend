import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AwsS3Adapter } from 'src/common/adapters/aws-s3.adapter';

@Injectable()
export class FilesService {

    constructor(
        private readonly S3: AwsS3Adapter
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
}
