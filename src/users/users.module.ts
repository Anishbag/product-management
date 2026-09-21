import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { User } from '../auth/user.entity.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

    AuthModule,

    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],

  controllers: [UsersController],

  providers: [UsersService],
})
export class UsersModule {}