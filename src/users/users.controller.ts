import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { UsersService } from './users.service.js';
import { Role } from '../enums.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('users')
@UseGuards(JwtAuthGuard,RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()
    @Roles(Role.ADMIN)
    findAll(){
        return this.usersService.findAll();
    }
    
}
