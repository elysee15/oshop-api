import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'HardThinkedJWTSecretKEY',
            signOptions: {
                expiresIn: 86400,
            },
        }),
        TypeOrmModule.forFeature([
            UserEntity, UserRepository,
        ])
    ],
    controllers: [UserController],
    providers: [AuthService, UserRepository, JwtStrategy],
    exports: [PassportModule]
})
export class AuthModule {}
