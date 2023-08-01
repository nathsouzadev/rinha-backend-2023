import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PeopleModule } from './people/people.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [PeopleModule,
    RouterModule.register([
      {
        path: '/',
        module: AppModule
      },
      {
        path: 'pessoas',
        module: PeopleModule
      }
    ])],
  controllers: [AppController]
})
export class AppModule {}
