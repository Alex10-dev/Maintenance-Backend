import { UUID } from "src/common/adapters/uuid.adapter";

export const fileNamer = ( req: Express.Request, file: Express.Multer.File, callback: Function ) => {

    const fileExtension = file.mimetype.split('/')[1];
    const filename = `${UUID.v4()}.${fileExtension}`;

    callback(null, filename);
}