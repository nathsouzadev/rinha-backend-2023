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
              findUnique: jest.fn(),
              findMany: jest.fn(),
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

  it('should return user with id', async () => {
    const mockUserId = randomUUID();
    const mockFind = jest
      .spyOn<any, any>(mockPrismaService.person, 'findUnique')
      .mockImplementation(() =>
        Promise.resolve({
          id: mockUserId,
          apelido: 'Deusa',
          nome: 'Ada Lovelace',
          nascimento: '2000-10-01',
          stack: ['C#', 'Node', 'Oracle'],
        }),
      );

    const user = await repository.getById(mockUserId);
    expect(mockFind).toHaveBeenCalledWith({ where: { id: mockUserId } });
    expect(user).toMatchObject({
      id: mockUserId,
      apelido: 'Deusa',
      nome: 'Ada Lovelace',
      nascimento: '2000-10-01',
      stack: ['C#', 'Node', 'Oracle'],
    });
  });

  it('should return results contains term', async () => {
    const mockTerm = 'some';
    const mockFind = jest
      .spyOn<any, any>(mockPrismaService.person, 'findMany')
      .mockImplementation(() =>
        Promise.resolve([
          {
            id: randomUUID(),
            apelido: 'Deusa',
            nome: 'Ada Lovelace',
            nascimento: '2000-10-01',
            stack: ['C#', 'Node', 'Oracle'],
          },
        ]),
      );

    const users = await repository.findByTerm(mockTerm);
    expect(mockFind).toHaveBeenCalledWith({
      take: 50,
      where: {
        OR: [
          {
            apelido: {
              contains: mockTerm,
              mode: 'insensitive'
            },
          },
          {
            nome: {
              contains: mockTerm,
              mode: 'insensitive'
            },
          },
          {
            stack: {
              has: mockTerm,
            },
          },
        ],
      },
    });
    expect(users).toMatchObject([
      {
        id: expect.any(String),
        apelido: 'Deusa',
        nome: 'Ada Lovelace',
        nascimento: '2000-10-01',
        stack: ['C#', 'Node', 'Oracle'],
      },
    ]);
  });
});
