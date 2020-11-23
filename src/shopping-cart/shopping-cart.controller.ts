import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';

@Controller('shopping-carts')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.shoppingCartService.findOne(+id);
  }

  @Post()
  create(@Body() createShoppingCartDto: CreateShoppingCartDto) {
    return this.shoppingCartService.create(createShoppingCartDto);
  }

  @Get()
  async findAll() {
    return this.shoppingCartService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateShoppingCartDto: any) {
    return this.shoppingCartService.update(+id, updateShoppingCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoppingCartService.remove(+id);
  }
}
