/* eslint-disable prettier/prettier */
import { Cr } from "src/cr/entities/cr.entity";
import { Todo } from "src/to-do/entities/to-do.entity";

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id : number;
      
    @Column()
    firstName : string;

    @Column()
    lastName : string;

    @Column()
    email: string;

    @Column()
    password : string;

    @Column()
    role : string;

    //one user can have multiple crs
    @OneToMany(()=> Cr ,  (cr)=>cr.user)
    crs : Cr[];

    @OneToMany(()=> Todo ,  (todo)=>todo.user)
    todos : Todo[];
}
