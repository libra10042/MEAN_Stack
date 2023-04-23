import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { CatsService } from '../service/cats.service';
import { CreateCatDto } from '../dto/CreateCatDto';
import { Cat } from '../interface/cat.interface';
import { HttpExceptionFilter } from 'src/common/middleware/http-exception.filter';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
