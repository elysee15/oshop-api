import { ShoppingCart } from './../shopping-cart/entities/shopping-cart.entity';
import { Category } from './../category/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  price: number;

  @ManyToOne(() => Category, (category) => category.id, {
    nullable: true,
    eager: true,
  })
  category: Category;

  @Column({ nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => ShoppingCart, (shoppingCart) => shoppingCart.product)
  shoppingCart: ShoppingCart[];
}
