import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Rinha backend 2023 - Nathally Souza"', () => {
      expect(appController.getHello()).toBe(
        'Rinha backend 2023 - Nathally Souza',
      );
    });
  });
});
