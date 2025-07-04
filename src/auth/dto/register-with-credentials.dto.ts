import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";

export class RegisterWithCredentialsDTO {

    @IsString()
    @IsNotEmpty({message: "Name must not be empty"})
    @MaxLength(50, {message: "Name length must be less than or equal 50"})
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
        message: "Name must not contain special characters or numbers"
    })
    name: string;

    @IsString()
    @IsNotEmpty({message: "Last name must not be empty"})
    @MaxLength(50, {message: "Last name length must be less than or equal 50"})
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
        message: "Last name must not contain special characters or numbers"
    })
    lastName: string;

    @IsEmail()
    @IsNotEmpty({message: "Email must not be empty"})
    @MaxLength(255, {message: "Email length must be less than or equal 255"})
    email: string;

    @IsString()
    @IsNotEmpty({message: "Password must not be empty"})
    @MaxLength(128, {message: "Password length must be less than or equal 128"})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
        message: 'Password is too weak. It must contain at least 8 characters, including uppercase, lowercase, number, and special character.'
    })
    password: string;

}