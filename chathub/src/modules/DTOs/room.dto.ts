import { User } from '../user/entites/user.entity';

export interface RoomDTO {
  roomName: string;
  roomMaxUser: string;
  roomPassword: string;
  userId: number;
}
