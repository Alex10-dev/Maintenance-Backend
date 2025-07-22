import { SetMetadata } from "@nestjs/common";
import { METADATA_ROLES } from "../constants/metadata.constants";

export const RoleProtected = (...args: string[]) => {
    
    return SetMetadata( METADATA_ROLES, args)
}