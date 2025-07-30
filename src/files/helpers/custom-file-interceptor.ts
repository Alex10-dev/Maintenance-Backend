import { FileInterceptor } from "@nestjs/platform-express";
import { FileUsage } from "src/common/enums/file-usage.enum";
import { fileFilter } from "./fileFilter.helper";
import { diskStorage } from "multer";
import { fileDestination } from "./file-destination.helper";
import { fileNamer } from "./file-namer.helper";

export function customFileInterceptor( data: {
    folder: FileUsage, 
    validExtensions: string[]
}){
    return FileInterceptor('file', {
        fileFilter: fileFilter(...data.validExtensions),
        storage: diskStorage({
            destination: fileDestination(data.folder),
            filename: fileNamer,
        })
    });
}