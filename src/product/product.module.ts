import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'src/user/user.module';

import { ProductController } from './product.controller';

import { ProductService } from './product.service';
import { Products } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products]), UserModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
