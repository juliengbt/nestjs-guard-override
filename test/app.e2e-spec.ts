import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { MyGuard } from '../src/guards/my.guard';

describe('AppController', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(MyGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const result = await app.inject({
        method: 'GET',
        url: '/',
      });

      expect(result.statusCode).toBe(200);
      expect(JSON.parse(result.body)).toBe('Hello World!');
    });
  });
});
