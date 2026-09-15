import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity.js';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto.js';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>,
    ){}
    async register(registerDto:RegisterDto){
        const existingUser = await this.userRepository.findOne({
            where: {
                email:registerDto.email,
            },
        });

        if (existingUser){
            throw new ConflictException("Email is already registered")
        }

        const hashedPassword = await bcrypt.hash(registerDto.password,10);
        const user=this.userRepository.create({
            email:registerDto.email,
            password:hashedPassword,

        });
        return this.userRepository.save(user);
}
}