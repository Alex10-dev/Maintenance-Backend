import { File, User } from "generated/prisma";
import { UserEntity } from "src/users/entities/user.entity";

export class FileEntity {

    constructor(
        public id: string,
        public bucketName: string,
        public key: string,
        public uploadedAt: Date,
        public fileSize: number,
        public mimeType: string,
        public usage: string,
        public uploadedBy: UserEntity,
        public originalFileName?: string,
    ){}

    public static fromDB(file: File & { uploadedBy: User }) {

        const uploadedBy = UserEntity.fromDB(file.uploadedBy);

        return new FileEntity(
            file.id,
            file.bucketName,
            file.key,
            file.uploadedAt,
            file.fileSize,
            file.mimeType,
            file.usage,
            uploadedBy,
            file.originalFileName ?? undefined,
        )
    }
}