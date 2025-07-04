import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { RegisterWithCredentialsDTO } from "../dto/register-with-credentials.dto";
import { AuthService } from "../auth.service";
import { UsersService } from "src/users/users.service";
import { AuthType } from "src/common/enums/auth-type.enum";
import { PrismaService } from "src/prisma/prisma.service";
import { BcryptAdapter } from "src/common/adapters/bcrypt.adapter";

@Injectable()
export class RegisterWithCredentialsUseCase {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
        private readonly prismaService: PrismaService,
        private readonly hashingService: BcryptAdapter,
    ){}

    async execute(registerDto: RegisterWithCredentialsDTO) {
        try {

            const existedAuth = await this.authService.findOne(registerDto.email, AuthType.CREDENTIALS);
            if( existedAuth ) throw new BadRequestException(`Emails is already registered`);

            const hashedPassword = await this.hashingService.hash(registerDto.password)

            return await this.prismaService.$transaction(async () => {

                const newUser = await this.userService.create({
                    name: registerDto.name,
                    lastName: registerDto.lastName,
                });

                await this.authService.create({
                    email: registerDto.email,
                    password: hashedPassword,
                    userId: newUser.id,
                });

                return newUser;
            })

        } catch( error ) {
            if( error instanceof HttpException ) throw error;
            throw new InternalServerErrorException(`${error}`);
        }
    }
}