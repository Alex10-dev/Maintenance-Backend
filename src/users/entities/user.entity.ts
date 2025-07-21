import { Role, User, UserRole } from "generated/prisma";

export class UserEntity {

    constructor(
        public id: string,
        public name: string,
        public lastName: string,
        public gender: string,
        public createdAt: Date,
        public isActive: Boolean,
        public photoId?: String, 
        public birthdate?: Date,
        public roles?: {}[],
    ){}

    static fromDB(user: User & { userRoles?: { role: Role }[] }): UserEntity {

        const roles = user.userRoles?.map(ur => ({
            id: ur.role.id,
            name: ur.role.name,
            description: ur.role.description
        })) || [];

        return new UserEntity(
            user.id,
            user.name,
            user.lastName,
            user.gender,
            user.createdAt,
            user.isActive,
            user.photoId ?? undefined,
            user.birthdate ?? undefined,
            roles
        );
    }
}
