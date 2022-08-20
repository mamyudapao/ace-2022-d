import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  async getSignedUrl(contentType: string, filePath: string): Promise<string> {
    const s3: S3 = new S3({ region: this.configService.get('S3_REGION'), signatureVersion: 'v4' });
    const expireSeconds = 60 * 5;

    /* eslint-disable */
    const params = {
      Bucket: this.configService.get('S3_BUCKET'),
      Key: filePath,
      Expires: expireSeconds,
      ContentType: contentType,
      ACL: 'public-read',
    };
    /* eslint-enable */

    return await s3.getSignedUrlPromise('putObject', params);
  }
}
