import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PaginationQuery } from 'src/common/dto/pagination-query';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async findProducts(@Query() paginationQuery: PaginationQuery) {
    return await this.productService.findAll(paginationQuery);
  }

  @Get('/:id')
  async findProduct(@Param('id', ParseIntPipe) id: number) {
    return {
      data: await this.productService.findOne(id),
      message: `Product #${id} found`,
      status_code: HttpStatus.OK,
    };
  }

  @Delete('/:id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return {
      data: await this.productService.remove(id),
      message: 'deleted',
      status_code: HttpStatus.OK,
    };
  }

  @Post('/')
  async createProduct(@Body() productDto: CreateProductDto) {
    return {
      data: await this.productService.create(productDto),
      message: `Product saved`,
      status_code: HttpStatus.CREATED,
    };
  }

  @Put('/:id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() productDto,
  ) {
    return {
      data: await this.productService.update(id, productDto),
      message: `Product #id updated`,
      status_code: HttpStatus.OK,
    };
  }
}
