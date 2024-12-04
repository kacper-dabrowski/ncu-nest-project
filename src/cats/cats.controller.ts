import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('/')
  async getAllCats() {
    const cats = await this.catsService.getAllCats();

    if (cats.length === 0) {
      throw new NotFoundException('No cats found');
    }

    return cats;
  }

  @Post('/')
  @HttpCode(200)
  async createCat(@Body() body: any) {
    const { name, surname } = body;
    return this.catsService.addCat(`${name} ${surname}`);
  }
}
