import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { products } from './product.entity.js';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtro/create-product.dto.js';
import { UpdateProductDto } from './dtro/update-product.dto.js';


@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(products)
        private readonly productRepository: Repository<products>
    ){}

    async create(CreateProductDto: CreateProductDto){
        const product = this.productRepository.create(CreateProductDto);

        return this.productRepository.save(product);
    }
    async findAll(){
        return this.productRepository.find();
    }

    async findone(id:number){
        const product = await this.productRepository.findOne({
            where:{
                id:id
            },
        });

        if(!product){
            throw new NotFoundException('product not found');
        }
        return product;
    }

    async update(id: number, updateProductDto: UpdateProductDto){
        const product = await this.findone(id);

        Object.assign(product, updateProductDto);
        
        return this.productRepository.save(product);
    }

    async remove(id:number) {
        const product = await this.findone(id);
        await this.productRepository.remove(product);

        return {
            message: 'product removed successfully'
        };
    }
}