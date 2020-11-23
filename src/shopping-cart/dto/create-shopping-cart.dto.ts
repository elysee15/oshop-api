import { IsArray } from 'class-validator';

export class CreateShoppingCartDto {
  @IsArray()
  product: string[];
}
