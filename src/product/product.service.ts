import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Products } from './entities/product.entity';

// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
  ) {}

  async findAll() {
    const products = await this.productRepository.find();

    return products;
  }

  // async findAllByCategory(category: string) {
  //   const products = await this.productRepository.findOne({});

  //   return products;
  // }

  async findManyByIds(arrayOfIds: Array<string>) {
    const products = await this.productRepository
      .createQueryBuilder()
      .where('id IN(:...arrayOfIds)', { arrayOfIds })
      .getMany();

    return products;
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException(`There is no product under id ${id}`);
    }

    return product;
  }

  // async create(createProductDto: CreateProductDto) {
  //   const product = await this.productRepository.create(createProductDto);

  //   return this.productRepository.save(product);
  // }

  // async update(id: number, updateProductDto: UpdateProductDto) {
  //   const product = await this.productRepository.preload({
  //     id,
  //     ...updateProductDto,
  //   });

  //   if (!product) {
  //     throw new NotFoundException(`There is no product under id ${id}`);
  //   }

  //   return this.productRepository.save(product);
  // }

  async remove(id: number) {
    const product = await this.findOne(id);
    console.log(product);
    return this.productRepository.remove(product);
  }
}
