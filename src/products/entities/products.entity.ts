import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Handle: string;

  @Column()
  Title: string;

  @Column()
  Description: string;

  @Column()
  SKU: string;

  @Column()
  Grams: string;

  @Column()
  Stock: string;

  @Column()
  Price: string;

  @Column()
  ComparePrice: string;

  @Column({ unique: true })
  Barcode: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'varchar',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;
}