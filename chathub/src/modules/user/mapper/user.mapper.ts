import { Builder } from 'builder-pattern';
import { Injectable } from '@nestjs/common';
import { User } from '../entites/user.entity';
import { UserDTO } from '../DTOs/user.dto';

@Injectable()
export class UserMapper {
  constructor() {}

  toDTO(userEntity: User): UserDTO {
    const {
      id,
      userName,
      userId,
      userPassword,
      userEmail,
      userBirthday,
      userPhoneNumber,
      userNickName,
    } = userEntity;

    return Builder<UserDTO>()
      .id(id)
      .userName(userName)
      .userId(userId)
      .userPassword(userPassword)
      .userEmail(userEmail)
      .userBirthday(userBirthday)
      .userPhoneNumber(userPhoneNumber)
      .userNickName(userNickName)
      .build();
  }

  toDTOList(userEntities: User[]): UserDTO[] {
    const userDTOList = [];

    userEntities.forEach((userEntity) => {
      userDTOList.push(this.toDTO(userEntity));
    });

    return userDTOList;
  }
}
