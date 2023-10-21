import { IsEmail, IsString } from "class-validator";

export class UserRegisterDto {

    @IsString()
    name:string;

    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    resident:string;

    @IsString()
    phone:string;

    @IsString()
    lada:string;
    
    @IsString()
    shoe:string;

    @IsString()
    food:string;

    @IsString()
    data_arrival:string;

    @IsString()
    data_return:string;

    @IsString()
    time_arrival:string;

    @IsString()
    time_return:string;

    @IsString()
    airline_arrival:string;

    @IsString()
    airline_return:string;

    @IsString()
    origen:string;

    @IsString()
    destiny:string;

    @IsString()
    activityToDo:string;
}