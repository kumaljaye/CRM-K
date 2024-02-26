/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repo/user.repository';
import { User } from './entities/user.entity';
import { Constants } from 'src/utils/constants';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class UserService {
  
  constructor(@InjectRepository(User) private readonly userRespository : UserRepository) {}
  
  create(createUserDto: CreateUserDto) {
    const user : User = new User();
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.password = createUserDto.password;
    user.role = Constants.ROLES.NORMAL_ROLE;
    return this.userRespository.save(user) ;
  }

  findUserById(id:number) {
    return this.userRespository.findOneOrFail({ where: { id: id} });
  }

  findAll() {
    return this.userRespository.find();
  }

  findUserByEmail(email: string) {
    return this.userRespository.findOne({ where: { email:  email} });
  }

  remove(id: number) {
    return this.userRespository.delete(id);
  }
}
