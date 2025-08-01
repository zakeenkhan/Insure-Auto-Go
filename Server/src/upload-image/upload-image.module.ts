import { Module } from '@nestjs/common';

import { UploadImageController } from './upload-image.controller';
import { UploadS3Controller } from './s3.controller';

@Module({
  controllers: [UploadImageController, UploadS3Controller],
  providers: [],
})
export class UploadImageModule {}
