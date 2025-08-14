import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from '@aws-sdk/client-s3';
import * as multerS3 from 'multer-s3';
import { JwtAuthGuard, RoleGuard } from 'src/guards';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('s3-upload')
export class UploadS3Controller {
  constructor() {}

  @Post('photo')
  // @UseGuards(JwtAuthGuard, RoleGuard(['admin', 'appUser']))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: (() => {
        const hasAllAwsEnv = [
          'AWS_REGION',
          'AWS_ACCESS_KEY_ID',
          'AWS_ACCESS_SECRET',
          'AWS_BUCKET',
          'AWS_ACL',
          'AWS_CDN_ROOT_PATH',
          'AWS_CDN_URL',
        ].every((key) => !!process.env[key]);

        if (!hasAllAwsEnv) {
          return diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
              const ext = extname(file.originalname);
              const filename = `${uniqueSuffix}${ext}`;
              callback(null, filename);
            },
          });
        }

        return multerS3({
          s3: new AWS.S3Client({
            region: process.env.AWS_REGION,
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_ACCESS_SECRET,
            },
          }),
          bucket: process.env.AWS_BUCKET,
          acl: process.env.AWS_ACL,
          contentType: multerS3.AUTO_CONTENT_TYPE,
          key: (req, file, cb) => {
            const fileName = `${process.env.AWS_CDN_ROOT_PATH}/${Date.now().toString()}-${file.originalname}`;
            cb(null, fileName);
          },
        });
      })(),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const hasAllAwsEnv = [
      'AWS_REGION',
      'AWS_ACCESS_KEY_ID',
      'AWS_ACCESS_SECRET',
      'AWS_BUCKET',
      'AWS_ACL',
      'AWS_CDN_ROOT_PATH',
      'AWS_CDN_URL',
    ].every((key) => !!process.env[key]);

    if (hasAllAwsEnv) {
      return {
        url: `${process.env.AWS_CDN_URL}/${(file as any).key}`,
        key: (file as any).key,
      };
    }

    return {
      url: `/uploads/${(file as any).filename}`,
      key: (file as any).filename,
    };
  }
}
