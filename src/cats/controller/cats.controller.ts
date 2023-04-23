import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CatsService } from '../service/cats.service';
import { CreateCatDto } from '../dto/CreateCatDto';
import { Cat } from '../interface/cat.interface';
import { HttpExceptionFilter } from 'src/common/middleware/http-exception.filter';
import { ValidationPipe } from 'src/common/pipe/validation-pipe';
import { RolesGuard } from 'src/common/auth/auth.guard';

@Controller('cats')
@UseGuards(new RolesGuard())
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.catsService.findOne(id);
  }
}
