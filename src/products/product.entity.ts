import { Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn } from "typeorm";
import { ProductCategory, ProductStatus } from "../enums.js";

@Entity("products")
export class products {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;
    
    @Column()
    description:string;

    @Column('decimal')
    price:number;

    @Column({
        type:'enum',
        enum:ProductCategory,
    })
    category:ProductCategory;

    @Column()
    stock:number;

    @Column({
        type: 'enum',
        enum:ProductStatus,
        default: ProductStatus.ACTIVE
    })
    status:ProductStatus;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

}