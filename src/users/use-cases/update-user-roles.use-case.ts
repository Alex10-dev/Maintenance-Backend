import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { UsersService } from "../users.service";
import { RoleService } from "src/role/role.service";
import { Role } from "generated/prisma";

type action = 'Add' | 'Remove';

@Injectable()
export class UpdateUserRolesUseCase {

    constructor(
        private readonly usersService: UsersService,
        private readonly roleService: RoleService,
    ){}

    async execute(userId: string, roleId: string, action: action ) {
        try{
            const validRole = await this.roleService.findOne(roleId);
            if( !validRole ) 
                throw new BadRequestException(`Role with id: ${roleId} doesn't exist`);

            const validUser = await this.usersService.findOne(userId);
            if( !validUser )
                throw new BadRequestException(`User with id: ${userId} doesn't exist`);

            const userHasRole = await this.usersService.findOneWithRole(userId, roleId);
            let message: string = '';
            let userRole: Role;
            if( action == "Add" ) {
                if( userHasRole ) 
                    throw new BadRequestException(`User already had the role assigned`);
                message = "Role added to user";
                userRole = await this.usersService.addRoleToUser(userId, roleId);
            }

            if( action == "Remove" ) {
                if( !userHasRole ) 
                    throw new BadRequestException(`User doesn't have the role assigned`);
                message = "Role removed from user";
                userRole = await this.usersService.removeRoleFromUser(userId, roleId);
            }
            return {
                message,
                userId,
                role: userRole!,
            }

        }catch( error ){
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }
}