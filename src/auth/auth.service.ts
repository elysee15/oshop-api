import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { AuthCredentialsDTO } from './auth-credentials.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import * as argon2 from 'argon2';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {

    public constructor(
        private readonly userRepository: UserRepository,
        private jwtService: JwtService,
        ){}

    public async signup(user: AuthCredentialsDTO){
        const {email, password, firstName, lastName} = user
        const emailExists = await this.userRepository.findByEmail(email);
        if(emailExists){
            throw new HttpException("This email address is already linked to an account here", HttpStatus.NOT_ACCEPTABLE);
        }
        const passwordHashed = await argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 100,
            hashLength: 16,
        });

        const newUser = new UserEntity();
        newUser.setEmail(email);
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setPasswordHashed(passwordHashed)
        const userCreated = await this.userRepository.createObject(newUser);
        delete userCreated['passwordHashed'];
        return userCreated;
    }

    public async signin(credentials: AuthCredentialsDTO){
        const {email, password} = credentials;
        const userFound = await this.userRepository.findByEmail(email);
        if(!userFound){
            throw new HttpException("This email address is not linked to any account here", HttpStatus.NOT_ACCEPTABLE);
        }
        if(!await argon2.verify(userFound.getPassword(), password)){
            throw new HttpException("Incorrect password", HttpStatus.NOT_ACCEPTABLE);
        }
        
        const payload = {email};
        const accessToken = this.jwtService.sign(payload);
        const{passwordHashed, ...user} = userFound
        return {
            user,
            accessToken
        }

    }
}
