import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../auth/user.entity.js';
import { Role } from '../enums.js';

const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User],
    synchronize: false,
});

async function seedAdmin() {
    await AppDataSource.initialize();

    const userRepository = AppDataSource.getRepository(User);

    const adminEmail = process.env.ADMIN_EMAIL!;
    const adminPassword = process.env.ADMIN_PASSWORD!;

    const existingAdmin = await userRepository.findOne({
        where: { email: adminEmail },
    });

    if (existingAdmin) {
        console.log('Admin already exists');
        await AppDataSource.destroy();
        return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const admin = userRepository.create({
        email: adminEmail,
        password: hashedPassword,
        role: Role.ADMIN,
    });

    await userRepository.save(admin);

    console.log('Admin created successfully');

    await AppDataSource.destroy();
}

seedAdmin().catch((error) => {
    console.error('Admin seed failed:', error);
    process.exit(1);
});