import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { UserEntity } from "src/users/entities/user.entity";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy, 'jwt' ) {

    constructor(
        private readonly userService: UsersService,
        configService: ConfigService,
    ){
        const secret = configService.get<string>('jwt_secret');
        if (!secret) {
            throw new Error('JWT secret not configured');
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret,
            ignoreExpiration: false,
        });
    }

    async validate( payload: JwtPayload ): Promise<UserEntity>{
        
        const { sub } = payload;
        // console.log(`ejecutando validacion de usuario: ${payload.sub}`);
        const result = await this.userService.findOne(sub);
        if( !result ) throw new UnauthorizedException('Token no valid');
        if( !result.isActive ) throw new UnauthorizedException('Inactive user, talk with an admin');

        return UserEntity.fromDB( result );
    }
}   