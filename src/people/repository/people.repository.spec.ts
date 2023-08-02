import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { PeopleRepository } from './people.repository';

describe('PeopleRepository', () => {
  let repository: PeopleRepository;
  let mockPrismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleRepository,
        {
          provide: PrismaService,
          useValue: {
            person: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<PeopleRepository>(PeopleRepository);
    mockPrismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be create a new people', async () => {
    const mockCreate = jest
      .spyOn(mockPrismaService.person, 'create')
      .mockResolvedValue({
        id: randomUUID(),
        apelido: 'Deusa',
        nome: 'Ada Lovelace',
        nascimento: '2000-10-01',
        stack: ['C#', 'Node', 'Oracle'],
      });
    const customer = await repository.create({
      apelido: 'Deusa',
      nome: 'Ada Lovelace',
      nascimento: '2000-10-01',
      stack: ['C#', 'Node', 'Oracle'],
    });
    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        id: expect.any(String),
        apelido: 'Deusa',
        nome: 'Ada Lovelace',
        nascimento: '2000-10-01',
        stack: ['C#', 'Node', 'Oracle'],
      },
    });
    expect(customer).toMatchObject({
      id: expect.any(String),
    });
  });
});
