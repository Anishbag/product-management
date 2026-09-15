import { IsEnum,IsInt,IsNotEmpty,isNotEmpty,IsNumber,IsString,Min, } from "class-validator";
import { ProductCategory } from "../../enums.js";


export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @Min(1)
    price: number;

    @IsEnum(ProductCategory)
    category: ProductCategory;

    @IsInt()
    @Min(0)
    stock:number;

    
}