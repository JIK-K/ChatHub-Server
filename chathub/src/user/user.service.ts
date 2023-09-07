import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entites/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './DTOs/user.dto';
import { UserMapper } from './mapper/user.mapper';
import { Builder } from 'builder-pattern';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userMapper: UserMapper,
  ) {}

  async create(userDTO: UserDTO): Promise<UserDTO> {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(userDTO.userPassword, salt);

    const userEntity: User = Builder<User>()
      .userId(userDTO.userId)
      .userName(userDTO.userName)
      .userEmail(userDTO.userEmail)
      .userPassword(hashedPassword)
      .userPhoneNumber(userDTO.userPhoneNumber)
      .userBirthday(userDTO.userBirthday)
      .userNickName(userDTO.userNickName)
      .salt(salt)
      .build();

    return this.userMapper.toDTO(await this.userRepository.save(userEntity));
  }

  async login(id: string, pw: string): Promise<boolean> {
    const userEntity: User = await this.userRepository
      .createQueryBuilder('user')
      .where('userId = :userid', {
        userid: id,
      })
      .getOne();

    if (userEntity) {
      const hashedPassword = await bcrypt.hash(pw, userEntity.salt);
      if (hashedPassword === userEntity.userPassword) {
        return true; // 로그인 성공
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
