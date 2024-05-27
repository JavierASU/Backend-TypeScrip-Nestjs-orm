import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { Repository } from 'typeorm';
import { createProductDto } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async createProduct(product: createProductDto) {
    const productFound = await this.productsRepository.findOne({
      where: {
        Barcode: product.Barcode,
      },
    });
    if (productFound) {
      return new HttpException('Product already exist', HttpStatus.CONFLICT);
    }
    const newProduct = this.productsRepository.create(product);
    return this.productsRepository.save(newProduct);
  }

  getProducts() {
    return this.productsRepository.find();
  }

  getProduct(id: number) {
    return this.productsRepository.findOne({
      where: {
        id,
      },
    });
  }

  deleteProduct(id: number) {
    return this.productsRepository.delete({ id });
  }

  updateProduct(id: number, product: updateProductDto) {
    return this.productsRepository.update({ id }, product);
  }
}
