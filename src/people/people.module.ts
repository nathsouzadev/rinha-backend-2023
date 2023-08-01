import { Module } from '@nestjs/common';
import { PeopleService } from './service/people.service';
import { PeopleController } from './people.controller';

@Module({
  controllers: [PeopleController],
  providers: [PeopleService]
})
export class PeopleModule {}
