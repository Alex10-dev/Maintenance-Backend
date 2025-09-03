import { File, IssueFile, User } from "generated/prisma";
import { FileEntity } from "src/files/entities/file.entity";

export class IssueFileEntity {
    
    constructor(
        public id: string,
        public issueId: string,
        public file: FileEntity,
    ){}

    public static fromDB(issueFile: IssueFile & { file: File & { uploadedBy: User } }) {

        const _file = FileEntity.fromDB(issueFile.file);

        return new IssueFileEntity(
            issueFile.id,
            issueFile.issueId,
            _file,
        )
    }
}