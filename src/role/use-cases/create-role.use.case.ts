import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateRoleDto } from "../dto/create-role.dto";
import { RoleService } from "../role.service";

@Injectable()
export class CreateRoleUseCase {

    constructor(
        private readonly roleService: RoleService,
    ){};

    public async execute( createRoleDto: CreateRoleDto ) {
        
        try {
            const roleExist = await this.roleService.findOneByName( 
                createRoleDto.name.toLocaleLowerCase().trim()
            );
            if( roleExist ) throw new BadRequestException(`Role ${ createRoleDto.name } already exist`);
            
            const role = await this.roleService.create(
                createRoleDto.name.toLowerCase().trim(),
                createRoleDto.description.toLowerCase().trim(),
            );
            return role;

        } catch( error ) {
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }

    }
}