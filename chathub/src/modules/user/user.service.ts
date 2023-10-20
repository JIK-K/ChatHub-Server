import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entites/user.entity';
import { IntegerType, Repository } from 'typeorm';
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

  /**
   * User 생성
   * @param userDTO
   * @returns
   */
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

  /**
   * User SequenceId 가져오기
   * @param id
   * @returns
   */
  async getUser(id: string): Promise<boolean> {
    const userEntity: User = await this.userRepository
      .createQueryBuilder('user')
      .where('userId = :userid', {
        userid: id,
      })
      .getOne();
    if (userEntity) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * User 로그인
   * @param id
   * @param pw
   * @returns
   */
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

  /**
   * 사용자 DB 순차번호(PK) 얻기
   * @param id
   * @returns
   */
  async getSequenceId(id: string): Promise<IntegerType> {
    const userEntity: User = await this.userRepository
      .createQueryBuilder('user')
      .where('userId = :userid', {
        userid: id,
      })
      .getOne();
    return userEntity.id;
  }

  /**
   * User 프로필 가져오기
   * @param id
   * @returns
   */
  async userProfile(id: string): Promise<UserDTO> {
    const userEntity: User = await this.userRepository
      .createQueryBuilder('user')
      .where('userId = :userid', {
        userid: id,
      })
      .getOne();
    return userEntity;
  }
}
