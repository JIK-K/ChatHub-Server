import { BaseDTO } from 'src/base/base.dto';

export interface UserDTO extends BaseDTO {
  id: number;
  userName: string;

  userId: string;

  userPassword: string;

  userEmail: string;

  userBirthday: string;

  userPhoneNumber: string;

  userNickName: string;

  // salt: string;

  // createAt?: Date;
  // updateAt?: Date;
}
