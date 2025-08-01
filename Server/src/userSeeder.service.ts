// src/user-seeder.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
@Injectable()
export class UserSeederService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async onModuleInit() {
    await this.seedUsers();
  }

  async seedUsers() {
    const usersCount = await this.prisma.user.count();

    if (usersCount === 0) {
      const password = await argon.hash(this.config.get('ADMIN_PASSWORD'));
      // Create a new user if user count is zero
      await this.prisma.user.create({
        data: {
          cnic: this.config.get('ADMIN_CNIC'),
          password: password,
          email: this.config.get('ADMIN_EMAIL'),
          role: 'admin',
          isVerified: true,
        },
      });
    }
  }
}
