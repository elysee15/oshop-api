import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCart)
    private shoppingCartRepository: Repository<ShoppingCart>,
  ) {}

  async create(createShoppingCartDto) {
    const shoppingCart = this.shoppingCartRepository.create(
      createShoppingCartDto,
    );
    return await this.shoppingCartRepository.save(shoppingCart);
  }

  async findAll() {
    return await this.shoppingCartRepository.find();
  }

  async findOne(id: number) {
    return await this.shoppingCartRepository.findOne(id);
  }

  async update(id: number, updateShoppingCartDto: any) {
    const shoppingCart = await this.shoppingCartRepository.preload({
      id: +id,
      ...updateShoppingCartDto,
    });
    return await this.shoppingCartRepository.update(id, shoppingCart);
  }

  async remove(id: number) {
    const shoppingCart = await this.findOne(id);
    if (shoppingCart) await this.shoppingCartRepository.remove(shoppingCart);
    return null;
  }
}
