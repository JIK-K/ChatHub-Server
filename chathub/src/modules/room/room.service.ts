import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../entites/room.entity';
import { Repository } from 'typeorm';
import { RoomDTO } from '../DTOs/room.dto';
import { RoomMapper } from '../mapper/room.mapper';
import { Builder } from 'builder-pattern';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    private roomMapper: RoomMapper,
  ) {}

  async create(roomDTO: RoomDTO): Promise<RoomDTO> {
    const roomEntity: Room = Builder<Room>()
      .roomName(roomDTO.roomName)
      .roomMaxUser(roomDTO.roomMaxUser)
      .roomPassword(roomDTO.roomPassword)
      .userid(roomDTO.userId)
      .build();
    return this.roomMapper.toDTO(await this.roomRepository.save(roomEntity));
  }
}
