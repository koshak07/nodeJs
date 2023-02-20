import { IsEmail, IsString } from "class-validator";


export class UserRegisterDto{
    @IsEmail({},{message: 'Не верно указан емэйл'})
    email:string;
    @IsString({message: 'Не указан пароль'})
    password:string;
    @IsString({message: 'Не указано имя'})
    name:string;
}