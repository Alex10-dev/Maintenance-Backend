import { Injectable } from "@nestjs/common";
import { JwtAdapter } from "src/common/adapters/jwt.adapter";
import { UserEntity } from "src/users/entities/user.entity";


@Injectable()
export class CheckAuthStatusUseCase {

    constructor(
        private readonly jwtService: JwtAdapter,
    ){}

    execute(user: UserEntity) {

        const token = this.jwtService.generateToken({
            sub: user.id
        });

        return {
            user,
            token
        }
    }
}