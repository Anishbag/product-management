import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-product.dto.js";
import { ProductStatus } from "../../enums.js";
import { IsEnum, IsOptional } from "class-validator";

export class UpdateProductDto extends PartialType(CreateProductDto){
    @IsOptional()
    @IsEnum(ProductStatus)
    status?:ProductStatus;
}
    
