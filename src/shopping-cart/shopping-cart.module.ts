import { Product } from './../product/product.entity';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart])],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
})
export class ShoppingCartModule {}
