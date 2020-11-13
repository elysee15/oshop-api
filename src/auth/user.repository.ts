import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityRepository, Repository, getRepository } from "typeorm";
import { UserEntity } from "./user.entity";

@Injectable()
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

    public constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
        ){
        super();
    }

    public async findById(id: number){
        return await this.userRepository.findOne(id);
    }

    public async findAll(){
        return await this.userRepository.find();
    }

    public async createObject(user: UserEntity){
        return await this.userRepository.save(user);
    }

    public async updateObject(id: number, user: UserEntity){
        return await this.userRepository.update(id, user);
    }

    public async deleteObject(user: UserEntity){
        return await this.userRepository.delete(user);
    }

    public async findByEmail(email: string): Promise<UserEntity>{
        return await getRepository(UserEntity)
          .createQueryBuilder('user')
          .where('user.email = :email', {email: email})
          .getOne();
    }
}