import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from '../dto/products.dto';
import { Products } from '../entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async createProduct(product: CreateProductDto) {
    const productFound = await this.productsRepository.findOne({
      where: {
        Barcode: product.Barcode,
      },
    });
    if (productFound) {
      throw new HttpException('Product already exist', HttpStatus.CONFLICT);
    }
    const newProduct = this.productsRepository.create(product);
    return this.productsRepository.save(newProduct);
  }

  getProducts() {
    return this.productsRepository.find();
  }

  async getProduct(id: number) {
    const product = await this.productsRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  deleteProduct(id: number) {
    return this.productsRepository.delete({ id });
  }

  async updateProduct(id: number, payload: UpdateProductDto) {
    const product = await this.getProduct(id);
    this.productsRepository.merge(product, payload);
    return this.productsRepository.save(product);
  }
}
