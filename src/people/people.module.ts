import { Module } from '@nestjs/common';
import { PeopleService } from './service/people.service';
import { PeopleController } from './people.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PeopleRepository } from './repository/people.repository';

@Module({
  controllers: [PeopleController],
  providers: [PeopleService, PrismaService, PeopleRepository],
})
export class PeopleModule {}
