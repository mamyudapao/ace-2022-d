import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetSignedUrlRequest, GetSignedUrlResponse } from '@v1/app.entity';
import { AppService } from '@v1/app.service';
import { UseAuth } from '@auth/auth.decorator';

@Controller('/')
@ApiTags('root')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealthCheck(): string {
    return 'OK';
  }

  @UseAuth()
  @Post('/signed-url')
  async getSignedUrl(
    @Body() getSignedUrlRequest: GetSignedUrlRequest
  ): Promise<GetSignedUrlResponse> {
    return {
      s3Url: await this.appService.getSignedUrl(
        getSignedUrlRequest.contentType,
        getSignedUrlRequest.filePath
      ),
    };
  }
}
