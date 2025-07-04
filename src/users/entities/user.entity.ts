import { User } from "generated/prisma";

export class UserEntity {

    constructor(
        public id: string,
        public name: string,
        public lastName: string,
        public gender: string,
        public createdAt: Date,
        public isActivre: Boolean,
        public photoId?: String, 
        public birthdate?: Date,
    ){}

    static fromDB(user: User): UserEntity {
        return new UserEntity(
            user.id,
            user.name,
            user.lastName,
            user.gender,
            user.createdAt,
            user.isActive
        );
    }
}
