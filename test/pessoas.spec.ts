import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query'] });

describe('PeopleController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create with all fields', () => {
    return request(app.getHttpServer())
      .post('/pessoas')
      .send({
        apelido: 'Deusa',
        nome: 'Ada Lovelace',
        nascimento: '2000-10-01',
        stack: ['C#', 'Node', 'Oracle'],
      })
      .expect(201)
      .then(async (response) => {
        const id = response.body.id;
        expect(response.body).toMatchObject({
          id: expect.any(String),
        });

        await prisma.person.delete({
          where: { id },
        });
      });
  });

  it('should create with stack null', () => {
    return request(app.getHttpServer())
      .post('/pessoas')
      .send({
        apelido: 'Deusa da guerra',
        nome: 'Grace Hooper',
        nascimento: '2000-10-01',
        stack: null,
      })
      .expect(201)
      .then(async (response) => {
        const id = response.body.id;
        expect(response.body).toMatchObject({
          id: expect.any(String),
        });

        await prisma.person.delete({
          where: { id },
        });
      });
  });

  it('should return error when apelido already exists', () => {
    return request(app.getHttpServer())
      .post('/pessoas')
      .send({
        apelido: 'Kath',
        nome: 'Grace Hooper',
        nascimento: '2000-10-01',
        stack: null,
      })
      .expect(422);
  });

  it('should return error when apelido is null', () => {
    return request(app.getHttpServer())
      .post('/pessoas')
      .send({
        apelido: null,
        nome: 'Grace Hooper',
        nascimento: '2000-10-01',
        stack: null,
      })
      .expect(422);
  });

  it('should return error when nome is null', () => {
    return request(app.getHttpServer())
      .post('/pessoas')
      .send({
        apelido: 'Grace',
        nome: null,
        nascimento: '2000-10-01',
        stack: null,
      })
      .expect(422);
  });

  it('should return error when nascimento is null', () => {
    return request(app.getHttpServer())
      .post('/pessoas')
      .send({
        apelido: 'Grace',
        nome: 'Grace Hooper',
        nascimento: null,
        stack: null,
      })
      .expect(422);
  });
});
