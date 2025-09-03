import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { generateS3Key } from "../helpers/generate-s3-key.helper";
import { FileUsage } from "src/common/enums/file-usage.enum";
import { FilesService } from "../files.service";
import { UserEntity } from "src/users/entities/user.entity";

@Injectable()
export class UploadFileToAWSUseCase {

    constructor(
        private readonly filesService: FilesService,
    ){}

    public async execute(file: Express.Multer.File, folder: FileUsage, user: UserEntity) {
        try {
            if( !file ) throw new BadRequestException('Make sure that the file is an image');
            
            const key = generateS3Key(folder, file);
            const fileUploaded = await this.filesService.uploadFile(file, key);

            if( !fileUploaded.ok )
                throw new InternalServerErrorException('File could not be saved');

            const newFile = await this.filesService.create(
                user.id,
                file,
                folder,
                key,
                'alex-maintenance-aws',
                file.originalname,
            );
            return newFile;

        } catch( error ) {
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }
}