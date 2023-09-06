import { BaseDTO } from 'src/base/base.dto';

export interface UserDTO extends BaseDTO {
  userName: string;

  userId: string;

  userPassword: string;

  userEmail: string;

  userBirthday: string;

  userPhoneNumber: string;

  userNickName: string;

  createAt?: Date;
  updateAt?: Date;
}
