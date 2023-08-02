import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  ValidationPipe,
} from '@nestjs/common';
import { PeopleService } from './service/people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

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
  findOne(@Param('id') id: string) {
    return this.peopleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.peopleService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peopleService.remove(+id);
  }
}
