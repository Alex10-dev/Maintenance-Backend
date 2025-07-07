import { HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { UsersService } from "src/users/users.service";
import { AuthType } from "src/common/enums/auth-type.enum";
import { PrismaService } from "src/prisma/prisma.service";
import { BcryptAdapter } from "src/common/adapters/bcrypt.adapter";
import { LoginWithCredentialsDTO } from "../dto/login-with-credentials.dto";
import { AuthUserEntity } from "../entities/auth-user.entity";
import { JwtAdapter } from "src/common/adapters/jwt.adapter";

@Injectable()
export class LoginWithCredentialsUseCase {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
        private readonly prismaService: PrismaService,
        private readonly hashingService: BcryptAdapter,
        private readonly jwtService: JwtAdapter,
    ){}

    async execute(loginDto: LoginWithCredentialsDTO) {
        try {

            const existedAuth = await this.authService.findOne(loginDto.email, AuthType.CREDENTIALS);
            if( !existedAuth ) 
                throw new UnauthorizedException(`Incorrect email or password`);

            const passwordMatched = await this.hashingService.compare(loginDto.password, existedAuth.password!);
            if( !passwordMatched ) 
                throw new UnauthorizedException(`Incorrect email or password`);

            const authUser = AuthUserEntity.fromDB( existedAuth );

            const token = this.jwtService.generateToken({
                sub: authUser.user.id
            });

            console.log('token',  token)

            return {
                ...authUser.toResponse(),
                token: token,
            };

        } catch( error ) {
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }

    
}