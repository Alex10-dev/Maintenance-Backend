import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";

export class LoginWithCredentialsDTO {

    @IsEmail()
    @IsNotEmpty({message: "Email must not be empty"})
    @MaxLength(255, {message: "Email length must be less than or equal 255"})
    email: string;

    @IsString()
    @IsNotEmpty({message: "Password must not be empty"})
    @MaxLength(128, {message: "Password length must be less than or equal 128"})
    password: string;

}