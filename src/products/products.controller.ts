import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { createProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Products } from './products.entity';
import { updateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  getProducts(): Promise<Products[]> {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id', ParseIntPipe) id: number): Promise<Products> {
    return this.productService.getProduct(id);
  }

  @Post()
  createProduct(@Body() newProduct: createProductDto) {
    return this.productService.createProduct(newProduct);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }

  @Patch(':id')
  updateProduct(@Param('id', ParseIntPipe) id: number,@Body() product: updateProductDto) {
    return this.productService.updateProduct(id, product);
  }
}
