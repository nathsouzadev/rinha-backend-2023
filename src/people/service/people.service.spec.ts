import { Test, TestingModule } from '@nestjs/testing';
import { PeopleService } from './people.service';

describe('PeopleService', () => {
  let service: PeopleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeopleService],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
  });

  it('should create new user', () => {
    const user = service.create({
      apelido : "Deusa",
      nome : "Ada Lovelace",
      nascimento : "2000-10-01",
      stack : ["C#", "Node", "Oracle"]
    })

    expect(user).toMatchObject({ id: expect.any(String) })
  });
});
