import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  rating: {
    overall: number;
    rating: string;
  };

  @IsNumber()
  price: {
    discountPrice: number;
    actualPrice: number;
    discountPercentage: number;
  };

  @IsString()
  imageURL: string;

  @IsString()
  description: string;

  @IsString()
  colorAndSizeAvailable: {
    color: string;
    size: string;
  };

  @IsString()
  category: string;
}
