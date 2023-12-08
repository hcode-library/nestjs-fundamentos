import { Controller, Get, Post  } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AppService } from './app.service';
import { Timeout } from './decorators/timeout.decorator';

@Timeout()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  async delay(ms:number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  @Get()
  async getHello(): Promise<string> {
    return 'Hcode';
  }
  
  @Post()
  async timeoutTest(): Promise<string> {

    await this.delay(15000);

    return 'OK';
  }

  @Cron(CronExpression.EVERY_SECOND)
  @Get('scheduling')
  scheduleA(): string {
    console.log('AppController', 'scheduleA', new Date());
    return 'OK';
  }
}
