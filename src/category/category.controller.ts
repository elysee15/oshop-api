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
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  async findCategorys() {
    return await this.categoryService.findAll();
  }

  @Get('/:id')
  async findCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.findOne(id);
  }

  @Delete('/:id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.remove(id);
  }

  @Post('/')
  async createCategory(@Body() categoryDto: CreateCategoryDto) {
    console.log(categoryDto instanceof CreateCategoryDto);
    return {
      data: await this.categoryService.create(categoryDto),
      message: `Category saved`,
      status_code: HttpStatus.CREATED,
    };
  }

  @Put('/:id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() categoryDto: CreateCategoryDto,
  ) {
    return {
      data: await this.categoryService.update(id, categoryDto),
      message: `Category #id updated`,
      status_code: HttpStatus.OK,
    };
  }
}
