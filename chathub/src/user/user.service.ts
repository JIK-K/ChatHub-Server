import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entites/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './DTOs/user.dto';
import { UserMapper } from './mapper/user.mapper';
import { Builder } from 'builder-pattern';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userMapper: UserMapper,
  ) {}

  async create(userDTO: UserDTO): Promise<UserDTO> {
    const userEntity: User = Builder<User>()
      .userId(userDTO.userId)
      .userName(userDTO.userName)
      .userEmail(userDTO.userEmail)
      .userPassword(userDTO.userPassword)
      .userPhoneNumber(userDTO.userPhoneNumber)
      .userBirthday(userDTO.userBirthday)
      .userNickName(userDTO.userNickName)
      .build();

    return this.userMapper.toDTO(await this.userRepository.save(userEntity));
  }
}
