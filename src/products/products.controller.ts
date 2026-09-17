import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dtro/create-product.dto.js';
import { UpdateProductDto } from './dtro/update-product.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
    ){}

    @Post()
    create(@Body() createProductDto: CreateProductDto){
        return this.productsService.create(createProductDto)
    }

    @Get()
    findAll(){
        return this.productsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.productsService.findone(Number(id));
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateProdutcDto: UpdateProductDto,
    ){
        return this.productsService.update(
            Number(id),
            updateProdutcDto,
        );
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.productsService.remove(Number(id));
    }
}
