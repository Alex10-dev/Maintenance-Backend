import { JwtPayload } from "src/auth/interfaces/jwt-payload.interface";
import { JwtAdapter } from "src/common/adapters/jwt.adapter";
import { UsersService } from "src/users/users.service";
import { UserEntity } from "src/users/entities/user.entity";
import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";

@Injectable()
export class ValidateUserTokenUseCase {

    constructor(
        private readonly jwtService: JwtAdapter,
        private readonly usersService: UsersService,
    ) {}

    async execute( token: string ): Promise<UserEntity> {
        let payload: JwtPayload;
        
        try {
            payload = await this.jwtService.validateToken(token);
            if( !payload ) 
                throw new UnauthorizedException(`Invalid Token`);

            const user = await this.usersService.findOne( payload.sub );
            if( !user || !user.isActive)
                throw new UnauthorizedException('invalid user');
            
            return UserEntity.fromDB(user);
    
        } catch( error ) {
            if( error instanceof HttpException ) 
                throw new WsException(error.message);

            // console.log(error);
            throw new WsException('Cannot get user');
        }
    }
}