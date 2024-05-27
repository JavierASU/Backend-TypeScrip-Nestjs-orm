import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  Handle: string;

  @ApiProperty()
  @IsString()
  Title: string;

  @ApiProperty()
  @IsString()
  Description: string;

  @ApiProperty()
  @IsString()
  SKU: string;

  @ApiProperty()
  @IsString()
  Grams: string;

  @ApiProperty()
  @IsString()
  Stock: string;

  @ApiProperty()
  @IsString()
  Price: string;

  @ApiProperty()
  @IsString()
  ComparePrice: string;

  @ApiProperty()
  @IsString()
  Barcode: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
