import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard, RoleGuard } from '../guards';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('upload')
export class UploadImageController {
  constructor() {}

  @Post('photo')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard(['admin', 'appUser']))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    const url = `/uploads/${file.filename}`;
    return { url };
  }
}
