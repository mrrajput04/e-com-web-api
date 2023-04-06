import { Body, Controller } from '@nestjs/common';

import { ProductService } from './product.service';

@Controller('cart')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
}
