import {
  Body,
  Controller,
  Get,
  Logger,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDTO } from './DTOs/room.dto';
import { ResponseDTO } from 'src/common/DTOs/response.dto';
import { ResponseUtil } from 'src/utils/response.util';
import { RoomData } from './entites/room-data.entity';
import { Room } from './entites/room.entity';
import { JoinRoomDTO } from './DTOs/joinRoom.dto';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  private logger: Logger = new Logger('Room');

  /**
   * 채팅방 생성
   * @param roomDTO
   * @returns
   */
  @Post()
  async createRoom(@Body() roomDTO: RoomDTO): Promise<ResponseDTO<RoomDTO>> {
    this.logger.log(
      'maxUser: ' +
        roomDTO.roomMaxUser +
        ' roomName: ' +
        roomDTO.roomName +
        ' roomPassword: ' +
        roomDTO.roomPassword +
        ' User(Sequence): ' +
        roomDTO.user,
    );
    return ResponseUtil.makeSuccessResponse(
      await this.roomService.create(roomDTO),
    );
  }

  /**
   * 채팅방 접속
   * @param room
   * @returns
   */
  @Patch('/join')
  async joinRoom(@Body() joinRoomDTO: JoinRoomDTO): Promise<RoomDTO> {
    this.logger.log(`Join Room : ${joinRoomDTO.roomDTO.roomName}`);
    return this.roomService.joinRoom(
      joinRoomDTO.roomDTO.roomName,
      joinRoomDTO.userNumber,
    );
  }

  /**
   * 채팅방 목록 조회
   * @returns
   */
  @Get('/list')
  async findList(): Promise<Room[]> {
    this.logger.log(`Get Room List`);
    return this.roomService.findList();
  }

  /**
   * 채팅방 제목 중복 체크
   * @param id
   * @returns
   */
  @Get('/check')
  async duplicateCheck(@Query('room') id: string): Promise<boolean> {
    this.logger.log(`Check Id Data : ${id}`);
    return this.roomService.getRoom(id);
  }

  @Get('/joinlist')
  async findJoinList(@Query('id') id: number): Promise<RoomData[]> {
    this.logger.log(`Get Join Room List`);
    return this.roomService.findJoinList(id);
  }
}
