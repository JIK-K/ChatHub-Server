import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../entites/room.entity';
import { Repository } from 'typeorm';
import { RoomDTO } from '../DTOs/room.dto';
import { RoomMapper } from '../mapper/room.mapper';
import { Builder } from 'builder-pattern';
import { Paging } from 'src/common/classes/paging.class';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    private roomMapper: RoomMapper,
  ) {}

  /**
   * 채팅방 생성
   * @param roomDTO
   * @returns
   */
  async create(roomDTO: RoomDTO): Promise<RoomDTO> {
    const roomEntity: Room = Builder<Room>()
      .roomName(roomDTO.roomName)
      .roomMaxUser(roomDTO.roomMaxUser)
      .roomPassword(roomDTO.roomPassword)
      .userid(roomDTO.userId)
      .build();
    return this.roomMapper.toDTO(await this.roomRepository.save(roomEntity));
  }

  /**
   * 채팅방 리스트 조회
   * @param offset
   * @param limit
   * @returns
   */
  async findList(offset: number, limit: number): Promise<RoomDTO[]> {
    const paging: Paging = new Paging(offset, limit);
    const roomEntites: Room[] = await this.roomRepository
      .createQueryBuilder('office')
      .select()
      .offset(paging.offset)
      .limit(paging.limit)
      .getMany();

    return this.roomMapper.toDTOList(roomEntites);
  }
}
