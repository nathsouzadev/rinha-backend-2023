import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from '../dto/create-person.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class PeopleService {
  create(createPersonDto: CreatePersonDto) {
    const user = {
      id: randomUUID(),
      ...createPersonDto
    }
    
    return { id: user.id }
  }

  findAll() {
    return `This action returns all people`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
