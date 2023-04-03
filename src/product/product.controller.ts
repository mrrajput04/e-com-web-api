import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';

import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  // @Get('category/:category')
  // async findAllByCategory(@Param('category') category: string) {
  //   return this.productService.findAllByCategory(category);
  // }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  // @Post()
  // async create(@Body() createProductDto: CreateProductDto) {
  //   return this.productService.create(createProductDto);
  // }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() updateProductDto: UpdateProductDto,
  // ) {
  //   return this.productService.update(id, updateProductDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    console.log(id, '===>>');
    return this.productService.remove(id);
  }
}
