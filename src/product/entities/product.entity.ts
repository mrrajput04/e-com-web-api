import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column('simple-json', { nullable: true })
  rating: {
    overall: number;
    rating: string;
  };

  @Column('simple-json', { nullable: true })
  price: {
    discountPrice: number;
    actualPrice: number;
    discountPercentage: number;
  };

  @Column()
  imageurl: string;

  @Column()
  description: string;

  @Column({
    array: true,
    default: [],
  })
  colorandsizeavailable: string;

  @Column({
    array: true,
    default: [],
  })
  highlight: string;
}
