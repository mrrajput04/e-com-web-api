import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column({ type: 'json', nullable: true })
  rating: {
    overall: number;
    rating: string;
  };

  @Column({ type: 'json', nullable: true })
  price: {
    discountPrice: number;
    actualPrice: number;
    discountPercentage: number;
  };

  @Column()
  imageurl: string;

  @Column()
  description: string;

  @Column({ type: 'json', nullable: true })
  colorandsizeavailable: string;

  @Column({ type: 'json', nullable: true })
  highlight: string;
}
