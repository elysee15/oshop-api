import { ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserEntity } from "./user.entity";
import { UserRepository } from "./user.repository";

export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'HardThinkedJWTSecretKEY'
        });
    }

    async validate(payload: any): Promise<UserEntity>{
        const {email} = payload;
        const user = this.userRepository.findByEmail(email);
        if(!user){
            throw new HttpException("Incorrect user. This Token might be corrupted", HttpStatus.NOT_ACCEPTABLE)
        }
        return user;
    }
}

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {

    canActivate(context: ExecutionContext){
        return super.canActivate(context);
    }

    handleRequest(err, user, info){
        if(err || !user){
            let message = "Invalid Authentication, please signin again";
            if (info) {
                switch (info.message) {
                    case 'jwt expired':
                        message = "Votre session a expiré. Veuillez vous reconnecter";
                        break;
                }
            }
            throw err || new UnauthorizedException(message);
        }
        return user
    }
}