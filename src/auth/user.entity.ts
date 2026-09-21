import { Column,CreateDateColumn,PrimaryGeneratedColumn,Entity } from "typeorm";
import { Role } from "../enums.js";

@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type:'varchar',unique: true})
    email: string;

    @Column({ type:'varchar' })
    password: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER,
    })
    role: Role;

    @CreateDateColumn()
    createdAt:Date;
}