import { Builder } from 'builder-pattern';
import { Injectable } from '@nestjs/common';
import { Room } from '../entites/room.entity';
import { RoomDTO } from '../DTOs/room.dto';

@Injectable()
export class RoomMapper {
  constructor() {}

  toDTO(roomEntity: Room): RoomDTO {
    const { roomName, roomMaxUser, roomPassword, roomConnectUser, userid } =
      roomEntity;

    return Builder<RoomDTO>()
      .roomName(roomName)
      .roomMaxUser(roomMaxUser)
      .roomPassword(roomPassword)
      .roomConnectUser(roomConnectUser)
      .userId(userid)
      .build();
  }

  toDTOList(roomEntities: Room[]): RoomDTO[] {
    const roomDTOList = [];

    roomEntities.forEach((roomEntity) => {
      roomDTOList.push(this.toDTO(roomEntity));
    });

    return roomDTOList;
  }
}
