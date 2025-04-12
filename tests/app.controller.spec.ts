import { Test } from '@nestjs/testing';
import { describe, it, beforeEach } from 'vitest';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';

describe('AppController', () => {
  let appController: AppController;
  //let appService: AppService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      console.log(appController);
      //const result = 'Hello World!';
      //vi.spyOn(app.se, 'getHello').mockReturnValue(result);
      //expect(appController.getHello()).toBe(result);
    });
  });
});
