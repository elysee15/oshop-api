import { CategoryService } from './category/category.service';
import { ProductService } from './product/product.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
import { UserController } from './auth/user.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
=======
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
>>>>>>> Feat: add shopping cart module

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'postgres',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductModule,
    CategoryModule,
<<<<<<< HEAD
    AuthModule,
=======
    ShoppingCartModule,
>>>>>>> Feat: add shopping cart module
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
