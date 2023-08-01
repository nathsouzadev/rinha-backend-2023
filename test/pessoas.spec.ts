import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('PeopleController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/pessoas (POST)', () => {
    return request(app.getHttpServer())
      .post('/pessoas')
      .send({
        apelido : "Deusa",
        nome : "Ada Lovelace",
        nascimento : "2000-10-01",
        stack : ["C#", "Node", "Oracle"]
      })
      .expect(201)
      .then(async (response) => {
        expect(response.body).toMatchObject({
          id: expect.any(String)
        });
      });
  });
});
