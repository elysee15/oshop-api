import { Body, Controller, HttpException, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDTO } from './auth-credentials.dto';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';

@Controller()
export class UserController {

    public constructor(
        private readonly authService: AuthService
    ){}

    @Post('auth/register')
    public async createUser(@Body(new ValidationPipe({transform: true})) authCredentials: AuthCredentialsDTO){
        const userCreated = await this.authService.signup(authCredentials);
        if(userCreated){
            return {
                data: userCreated,
                message: 'user created successfully',
                statusCode: HttpStatus.OK,
            }
        }else{
            throw new HttpException('An error occured. Please retry later', HttpStatus.NOT_MODIFIED)
        }
    }

    @Post('auth/login')
    public async login(@Body(new ValidationPipe({transform: true})) authCredentials: AuthCredentialsDTO){
        const user = await this.authService.signin(authCredentials);
        if(user){
            return {
                data: user,
                message: 'user logged in successfully',
                statusCode: HttpStatus.OK,
            }
        }else{
            throw new HttpException('An error occured. Please retry later', HttpStatus.NOT_MODIFIED)
        }
    }
}
