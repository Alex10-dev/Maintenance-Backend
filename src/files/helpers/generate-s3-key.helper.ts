import { FileUsage } from "src/common/enums/file-usage.enum";

export function generateS3Key(folder: FileUsage, file: Express.Multer.File): string {

    return `${folder}/new-file-${Date.now()}.${file.mimetype.split('/')[1]}`
}