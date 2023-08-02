import { Test, TestingModule } from '@nestjs/testing';
import { PeopleService } from './people.service';
import { PeopleRepository } from '../repository/people.repository';
import { randomUUID } from 'crypto';

describe('PeopleService', () => {
  let service: PeopleService;
  let mockPeopleRepository: PeopleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleService,
        {
          provide: PeopleRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
    mockPeopleRepository = module.get<PeopleRepository>(PeopleRepository);
  });

  it('should create new user', async () => {
    const mockRequest = {
      apelido: 'Deusa',
      nome: 'Ada Lovelace',
      nascimento: '2000-10-01',
      stack: ['C#', 'Node', 'Oracle'],
    };
    const mockCreate = jest
      .spyOn(mockPeopleRepository, 'create')
      .mockImplementation(() =>
        Promise.resolve({
          id: randomUUID(),
          apelido: 'Deusa',
          nome: 'Ada Lovelace',
          nascimento: '2000-10-01',
          stack: ['C#', 'Node', 'Oracle'],
        }),
      );
    const user = await service.create(mockRequest);
    expect(mockCreate).toHaveBeenCalledWith(mockRequest);
    expect(user).toMatchObject({ id: expect.any(String) });
  });

  it('should create new user with stack null', async () => {
    const mockRequest = {
      apelido: 'Deusa',
      nome: 'Ada Lovelace',
      nascimento: '2000-10-01',
      stack: null,
    };
    const mockCreate = jest
      .spyOn(mockPeopleRepository, 'create')
      .mockImplementation(() =>
        Promise.resolve({
          id: randomUUID(),
          apelido: 'Deusa',
          nome: 'Ada Lovelace',
          nascimento: '2000-10-01',
          stack: [],
        }),
      );
    const user = await service.create(mockRequest);
    expect(mockCreate).toHaveBeenCalledWith({
      ...mockRequest,
      stack: [],
    });
    expect(user).toMatchObject({ id: expect.any(String) });
  });
});
