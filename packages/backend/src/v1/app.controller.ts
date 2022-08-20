import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('/')
@ApiTags('root')
export class AppController {
  @Get()
  getHealthCheck(): string {
    return 'OK';
  }
}
