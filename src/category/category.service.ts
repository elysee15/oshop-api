import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    const product = await this.categoryRepository.findOne(id);
    if (!product) throw new NotFoundException(`Category #${id} not found`);
    return product;
  }

  async create(productDto) {
    const product = this.categoryRepository.create(productDto);
    return await this.categoryRepository.save(product);
  }

  async update(id: number, productDto: any) {
    const product = await this.categoryRepository.preload({
      id: +id,
      ...productDto,
    });
    if (!product) {
      throw new NotFoundException(`Category ${id} not found`);
    }
    return await this.categoryRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (product) await this.categoryRepository.remove(product);
    return null;
  }
}
