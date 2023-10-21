import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserRegister {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column( 'text' )
    name:string;

    @Column( 'text' , {
        unique  : true,
        nullable: true
    })
    email:string;

    @Column( 'text' )
    resident:string;

    @Column( 'text' )
    phone:string;

    @Column( 'text' )
    lada:string;

    @Column( 'text' )
    shoe:string;

    @Column( 'text' )
    food:string;

    @Column( 'text' )
    data_arrival:string;

    @Column( 'text' )
    data_return:string;

    @Column( 'text' )
    time_arrival:string;

    @Column( 'text' )
    time_return:string;

    @Column( 'text' )
    airline_arrival:string;

    @Column( 'text' )
    airline_return:string;

    @Column( 'text' )
    origen:string;

    @Column( 'text' )
    destiny:string;

    @Column( 'text' )
    activityToDo:string;
}