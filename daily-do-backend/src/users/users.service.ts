import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export type User = {
    userId: number,
    username: string,
    password: string
};

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>) {
    }

    async findOneByUsername(username: string): Promise<UserEntity | undefined> {
        return await this.usersRepository.findOne({ 
            where: { username: username }
        });
    }

    async create(userData: any): Promise<any> {
        const username = userData.username.trim().toLocaleLowerCase();
        
        const userExist = await this.findOneByUsername(username);
        if (userExist) throw new HttpException('User already exist', 409);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        
        const userEntity = new UserEntity();
        userEntity.username = username;
        userEntity.password = hashedPassword;

        await this.usersRepository.save(userEntity);
        return true;
    }
}
