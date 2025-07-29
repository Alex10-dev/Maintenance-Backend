import * as fs from 'fs';
import * as path from 'path';
import { FileUsage } from 'src/common/enums/file-usage.enum';

export function fileDestination(folderName: FileUsage){
    
  return (req: Express.Request, file: Express.Multer.File, callback: Function) => {
    const uploadPath = path.resolve('./uploads', folderName);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    callback(null, uploadPath);
  };
}