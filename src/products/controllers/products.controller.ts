import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { Products } from '../entities/products.entity';
import { ProductsService } from '../services/products.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto } from '../dto/products.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-authentication.guard';

@ApiTags('Products')
@UseGuards(JwtAuthGuard)
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
  createProduct(@Body() newProduct: CreateProductDto) {
    return this.productService.createProduct(newProduct);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }

  @Put(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, product);
  }
}
