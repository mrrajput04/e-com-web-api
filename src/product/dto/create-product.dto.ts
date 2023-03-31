import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly rating: {
    overall: number;
    rating: string;
  };

  @IsNumber()
  readonly price: {
    discountPrice: number;
    actualPrice: number;
    discountPercentage: number;
  };

  @IsString()
  readonly imageURL: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly colorAndSizeAvailable: {
    color: string;
    size: string;
  };

  @IsString()
  readonly category: string;
}
