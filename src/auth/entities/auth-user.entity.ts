import { Auth, User } from "generated/prisma";
import { AuthType } from "src/common/enums/auth-type.enum";
import { UserEntity } from "src/users/entities/user.entity";

export class AuthUserEntity {

    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly password: string,
        public readonly isActive: boolean,
        public readonly type: string,
        public readonly validated: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly user: UserEntity
    ) {}

    public static fromDB( auth: Auth & { user: User } ): AuthUserEntity {
        return new AuthUserEntity(
            auth.id,
            auth.providerId,
            auth.password!,
            auth.isActive,
            auth.type,
            auth.validated,
            auth.createdAt,
            auth.updatedAt,
            UserEntity.fromDB(auth.user)
        );
    }

    public toResponse() {
        return {
            user: this.user,
        }
    }
}