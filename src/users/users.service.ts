import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}
    async findAll(){
        return this.userRepository.find({
            select:{
                id: true,
                email:true,
                role:true,
                createdAt: true,
            },
        });
    }
}
