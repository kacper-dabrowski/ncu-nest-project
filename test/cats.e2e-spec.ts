import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Cats controller', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prismaService = await moduleFixture.resolve<PrismaService>(PrismaService);
    await prismaService.cat.deleteMany();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should return 404 if no cats found', async () => {
    await request(app.getHttpServer()).get('/cats').expect(404);
  });

  it('should return 200 and add a cat with name and surname', async () => {
    await request(app.getHttpServer())
      .post('/cats')
      .send({ name: 'Kacper', surname: 'Dąbrowski' })
      .expect(200);

    expect(await prismaService.cat.findMany()).toEqual([
      {
        name: 'Kacper Dąbrowski',
        id: expect.any(Number),
      },
    ]);
  });
});
