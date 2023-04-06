import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Headers,
  HttpException,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';

// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';

import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll() {
    // @Req() Request
    // if (!Request.cookies.auth_token)
    //   throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    return this.productService.findAll();
  }

  // @Get('category/:category')
  // async findAllByCategory(@Param('category') category: string) {
  //   return this.productService.findAllByCategory(category);
  // }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    // , @Req() Request
    // if (!Request.cookies.auth_token)
    //   throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
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
  async remove(@Param('id') id: number, @Req() Request) {
    if (!Request.cookies.auth_token)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    console.log(id, '===>>');
    return this.productService.remove(id);
  }

  @Post('cart')
  async create(@Body() body, @Req() Request, @Res() Response) {
    // if (!Request.cookies.auth_token)
    //   throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    Response.cookie('product', body, { httpOnly: true });
    Response.send('data added into cart');
    return;
  }
}
