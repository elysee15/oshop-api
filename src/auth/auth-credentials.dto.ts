import { IsNotEmpty } from "class-validator";

export class AuthCredentialsDTO{

    firstName: string;

    lastName: string;

    @IsNotEmpty({message: 'This field is required'})
    email: string;

    @IsNotEmpty({message: 'This field is required'})
    password: string;
}