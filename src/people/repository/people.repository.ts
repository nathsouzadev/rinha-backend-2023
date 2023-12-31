import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePersonDto } from '../dto/create-person.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class PeopleRepository {
  constructor(private prisma: PrismaService) {}

  create = async (createPersonDto: CreatePersonDto) => {
    const user = await this.prisma.person.create({
      data: {
        id: randomUUID(),
        ...createPersonDto,
      },
    });

    return { id: user.id };
  };

  getById = async (id: string) =>
    this.prisma.person.findUnique({ where: { id } });

  findByTerm = async (term: string) =>
    this.prisma.person.findMany({
      take: 50,
      where: {
        OR: [
          {
            apelido: {
              contains: term,
              mode: 'insensitive'
            },
          },
          {
            nome: {
              contains: term,
              mode: 'insensitive'
            },
          },
          {
            stack: {
              has: term,
            },
          },
        ],
      },
    });
}
