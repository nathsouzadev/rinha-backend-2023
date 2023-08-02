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

  describe('POST /pessoas', () => {
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

    it('should return error when nascimento is invalid', () => {
      return request(app.getHttpServer())
        .post('/pessoas')
        .send({
          apelido: 'Grace',
          nome: 'Grace Hooper',
          nascimento: '01-01-2000',
          stack: null,
        })
        .expect(422);
    });
  });

  describe('GET /pessoas/:id', () => {
    it('should return person with id', () => {
      return request(app.getHttpServer())
        .get('/pessoas/e1347b38-dfcd-42a3-894c-42ccfc35a54f')
        .expect(200)
        .then(async (response) => {
          expect(response.body).toMatchObject({
            id: 'e1347b38-dfcd-42a3-894c-42ccfc35a54f',
            nome: 'Katherine Johnson',
            apelido: 'Kath',
            nascimento: '2000-01-01',
            stack: ['JS', 'Clojure', 'PHP'],
          });
        });
    });

    it('should return 400 when does not exists person with id', () => {
      return request(app.getHttpServer())
        .get('/pessoas/f9b6c273-ad03-4850-b214-67faf4055ceb')
        .expect(404);
    });
  });
});
