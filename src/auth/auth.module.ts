import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports:[TypeOrmModule.forFeature([User]),

  ConfigModule,
  JwtModule.registerAsync({
    imports:[ConfigModule],
    inject:[ConfigService],

    useFactory:(configService:ConfigService)=>({
      secret:configService.get<string>('JWT_SECRET'),
      signOptions:{
        expiresIn:configService.get<string>('JWT_EXPIRES_IN') as any,
      },
    }),


  }),
],

  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
