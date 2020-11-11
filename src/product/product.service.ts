import { Product } from './product.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQuery } from 'src/common/dto/pagination-query';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(paginationQuery: PaginationQuery) {
    const { limit, offset } = paginationQuery;
    return await this.productRepository.find({
      skip: offset || 0,
      take: limit || 10,
      order: { updated_at: 'DESC' },
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id);
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  async create(productDto) {
    const product = this.productRepository.create(productDto);
    return await this.productRepository.save(product);
  }

  async update(id: number, productDto: any) {
    const product = await this.productRepository.preload({
      id: +id,
      ...productDto,
    });
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (product) await this.productRepository.remove(product);
    return null;
  }
}
