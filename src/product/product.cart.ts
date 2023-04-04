import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ProductService } from './product.service';

@Controller('cart')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
}
