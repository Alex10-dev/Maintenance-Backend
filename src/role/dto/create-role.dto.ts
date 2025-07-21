import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateRoleDto {

    @IsString()
    @IsNotEmpty({message: "Role name must not be empty"})
    @MaxLength(30, {message: "Role name length must be less than or equal 30"})
    @MinLength(3, {message: "Role name length must be greater than or equal 3"})
    name: string;

    @IsString()
    @IsNotEmpty({message: "Description must not be empty"})
    @MinLength(5, {message: "Description length must be greater than or equal 5"})
    description: string;

}
