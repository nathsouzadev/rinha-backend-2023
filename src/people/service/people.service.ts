import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from '../dto/create-person.dto';
import { PeopleRepository } from '../repository/people.repository';

@Injectable()
export class PeopleService {
  constructor(private readonly peopleRepository: PeopleRepository) {}

  create = async (createPersonDto: CreatePersonDto) => {
    const user = await this.peopleRepository.create({
      ...createPersonDto,
      stack: createPersonDto.stack ?? [],
    });

    return { id: user.id };
  };

  findByTerm = async (term: string) => this.peopleRepository.findByTerm(term);

  findOne = async (id: string) => {
    const user = await this.peopleRepository.getById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  };
}
