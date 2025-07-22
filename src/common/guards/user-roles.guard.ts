import { CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { METADATA_ROLES } from "../constants/metadata.constants";

@Injectable()
export class UserRolesGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector,
    ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        let requiredRoles: string[] = [];
        requiredRoles = this.reflector.get(METADATA_ROLES, context.getHandler())
        //console.log('required roles ', requiredRoles);
        if( !requiredRoles || requiredRoles.length === 0 ) return true;

        const req = context.switchToHttp().getRequest();
        const user = req.user;
        if( !user ) throw new InternalServerErrorException(`Auth user not found`);

        const userRoles = user.roles?.map((role) => role['name']) ?? []
        //console.log('user roles ', userRoles);
        
        const hasRole = userRoles.some(userRole => requiredRoles.includes(userRole));
        if( !hasRole ) throw new ForbiddenException(`The user needs a valid role`);

        return true;
    }

}