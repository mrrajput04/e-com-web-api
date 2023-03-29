import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column()
  rating: {
    overall: number;
    rating: string;
  };

  @Column()
  price: {
    discountPrice: number;
    actualPrice: number;
    discountPercentage: number;
  };

  @Column()
  imageURL: string;

  @Column({ length: 500 })
  description: string;

  @Column()
  colorAndSizeAvailable: {
    color: string;
    size: string;
  };

  @Column({
    array: true,
    default: [],
  })
  highlight: string;
}
