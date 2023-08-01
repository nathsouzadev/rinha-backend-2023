import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Rinha backend 2023 - Nathally Souza';
  }
}
