import { Product } from './../../product/product.entity';
import {
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Product, (product) => product.shoppingCart, {
    eager: true,
  })
  @JoinTable()
  product: Product[];
}
