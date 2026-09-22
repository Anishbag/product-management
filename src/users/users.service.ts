import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity.js';
import { Repository } from 'typeorm';
import { Role } from '../enums.js';
import { NotFoundError } from 'rxjs';

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

    async updateRole(userId: number, role: Role){
        const user = await this.userRepository.findOne({
            where:{
                id: userId
            },
        });

        if(!user){
            throw new NotFoundException("user not found");
        }

        user.role = role;

        const updatedUser = await this.userRepository.save(user);

        return {
            message: "user role updated successfully",

            user:{
                id: updatedUser.id,
                email: updatedUser.email,
                role: updatedUser.role,
                createdAt: updatedUser.createdAt,
            },
        };
    }
}
