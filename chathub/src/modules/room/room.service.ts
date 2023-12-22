import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entites/room.entity';
import { Repository } from 'typeorm';
import { RoomDTO } from './DTOs/room.dto';
import { RoomMapper } from './mapper/room.mapper';
import { Builder } from 'builder-pattern';
import { Paging } from 'src/common/classes/paging.class';
import { RoomData } from './entites/room-data.entity';
import { User } from '../user/entites/user.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    @InjectRepository(RoomData)
    private roomDataRepository: Repository<RoomData>,
    @InjectRepository(User) private userRepository: Repository<User>,
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
      .roomConnectUser(roomDTO.roomConnectUser)
      .user(roomDTO.user)
      .build();

    this.roomMapper.toDTO(await this.roomRepository.save(roomEntity));
    console.log(roomDTO.user.id);
    const userEntity: User = await this.userRepository
      .createQueryBuilder('user')
      .select()
      .where('id = :userId', {
        userId: roomDTO.user,
      })
      .getOne();
    // .findOneBy({
    //   id: roomDTO.user.id,

    // });
    console.log(userEntity);

    roomEntity.roomConnectUser = roomEntity.roomConnectUser + 1;
    const roomDataEntity: RoomData = Builder<RoomData>()
      .connectUserId(userEntity.id)
      .connectUserName(userEntity.userName)
      .room(roomEntity)
      .build();
    await this.roomDataRepository.save(roomDataEntity);

    return this.roomMapper.toDTO(await this.roomRepository.save(roomEntity));
  }

  /**
   * 채팅방 리스트 조회
   * @param offset
   * @param limit
   * @returns
   */
  async findList(): Promise<Room[]> {
    // const paging: Paging = new Paging(offset, limit);
    const roomEntites: Room[] = await this.roomRepository
      .createQueryBuilder('room')
      .select()
      .leftJoinAndSelect('room.user', 'user')
      // .offset(paging.offset)
      // .limit(paging.limit)
      .getMany();

    // return this.roomMapper.toDTOList(roomEntites);
    return roomEntites;
  }

  /**
   * 채팅방 이름 조회
   * @param name
   * @returns
   */
  async getRoom(name: string): Promise<boolean> {
    const roomEntity: Room = await this.roomRepository
      .createQueryBuilder('room')
      .where('roomName = :roomname', {
        roomname: name,
      })
      .getOne();
    if (roomEntity) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * DB roomConnectUser 컬럼 업데이트
   * @param roomName
   * @returns
   */
  async joinRoom(name: string, id: number): Promise<RoomDTO> {
    const roomEntity: Room = await this.roomRepository.findOneBy({
      roomName: name,
    });
    const userEntity: User = await this.userRepository.findOneBy({
      id: id,
    });
    const roomDataEntity: RoomData = await this.roomDataRepository
      .createQueryBuilder('room_data')
      .where('connectUserId = :userId AND roomId = :room', {
        userId: userEntity.id,
        room: roomEntity.roomId,
      })
      .getOne();

    if (roomEntity.roomConnectUser >= parseInt(roomEntity.roomMaxUser)) {
      console.log('room is full');
    } else {
      roomEntity.roomConnectUser = roomEntity.roomConnectUser + 1;
      const roomDataEntity: RoomData = Builder<RoomData>()
        .connectUserId(userEntity.id)
        .connectUserName(userEntity.userName)
        .room(roomEntity)
        .build();
      await this.roomDataRepository.save(roomDataEntity);
      return this.roomMapper.toDTO(await this.roomRepository.save(roomEntity));
    }
  }

  /**
   * 참여중인 방 정보 불러오기
   * @param id
   * @returns
   */
  async findJoinList(id: number): Promise<RoomData[]> {
    const roomDataEntites: RoomData[] = await this.roomDataRepository
      .createQueryBuilder('room_data')
      .select()
      .leftJoinAndSelect('room_data.room', 'room')
      .where('connectUserId = :id', {
        id: id,
      })
      .getMany();

    return roomDataEntites;
  }
}
