import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  HttpException,
  ValidationPipe,
} from '@nestjs/common';
import { PeopleService } from './service/people.service';
import { CreatePersonDto } from './dto/create-person.dto';

@Controller()
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  async create(
    @Body(
      new ValidationPipe({
        transform: true,
        errorHttpStatusCode: 422,
      }),
    )
    createPersonDto: CreatePersonDto,
  ) {
    try {
      const user = await this.peopleService.create(createPersonDto);
      return { id: user.id };
    } catch (error) {
      if (error.message.includes('Unique constraint failed')) {
        throw new HttpException(
          'Unprocessable Entity',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
  }

  @Get()
  findAll() {
    return this.peopleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.peopleService.findOne(id);
      return user;
    } catch (error) {
      if (error.message === 'User not found') {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
    }
  }
}
