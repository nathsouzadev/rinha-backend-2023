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
            getById: jest.fn(),
            findByTerm: jest.fn(),
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

  it('should return user with id', async () => {
    const mockUserId = randomUUID();
    const mockGet = jest
      .spyOn(mockPeopleRepository, 'getById')
      .mockImplementation(() =>
        Promise.resolve({
          id: mockUserId,
          apelido: 'Deusa',
          nome: 'Ada Lovelace',
          nascimento: '2000-10-01',
          stack: ['C#', 'Node', 'Oracle'],
        }),
      );

    const user = await service.findOne(mockUserId);
    expect(mockGet).toHaveBeenCalledWith(mockUserId);
    expect(user).toMatchObject({
      id: mockUserId,
      apelido: 'Deusa',
      nome: 'Ada Lovelace',
      nascimento: '2000-10-01',
      stack: ['C#', 'Node', 'Oracle'],
    });
  });

  it('should return error if user not exists', async () => {
    const mockUserId = randomUUID();
    const mockGet = jest
      .spyOn(mockPeopleRepository, 'getById')
      .mockImplementation(() => Promise.resolve(null));

    await expect(service.findOne(mockUserId)).rejects.toThrow(
      new Error('User not found'),
    );
    expect(mockGet).toHaveBeenCalledWith(mockUserId);
  });

  it('should return all users with term', async () => {
    const mockFind = jest
      .spyOn(mockPeopleRepository, 'findByTerm')
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

    const users = await service.findByTerm('c#');
    expect(mockFind).toHaveBeenCalledWith('c#');
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
