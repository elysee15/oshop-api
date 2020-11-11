import { IsCurrency, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsNumber()
  category: number;

  @IsUrl()
  imageUrl: string;
}
