import { IsNotEmpty, IsString } from 'class-validator';

export class GetSignedUrlRequest {
  @IsNotEmpty()
  @IsString()
  contentType!: string;

  @IsNotEmpty()
  @IsString()
  filePath!: string;
}

export class GetSignedUrlResponse {
  s3Url!: string;
}
