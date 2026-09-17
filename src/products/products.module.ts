import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller.js';
import { ProductsService } from './products.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { products } from './product.entity.js';
import { AuthModule } from '../auth/auth.module.js';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([products]),
  AuthModule,
  PassportModule.register({
    defaultStrategy: "jwt"
  }),
],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
