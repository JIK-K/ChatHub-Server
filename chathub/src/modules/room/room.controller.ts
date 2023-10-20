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
import { RoomDTO } from '../DTOs/room.dto';
import { ResponseDTO } from 'src/common/DTOs/response.dto';
import { ResponseUtil } from 'src/utils/response.util';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  private logger: Logger = new Logger('Room');

  @Post()
  async createRoom(@Body() roomDTO: RoomDTO): Promise<ResponseDTO<RoomDTO>> {
    this.logger.log(
      'maxUser: ' +
        roomDTO.roomMaxUser +
        ' roomName: ' +
        roomDTO.roomName +
        ' roomPassword: ' +
        roomDTO.roomPassword +
        ' User.Id(Sequence): ' +
        roomDTO.userId,
    );
    return ResponseUtil.makeSuccessResponse(
      await this.roomService.create(roomDTO),
    );
  }

  @Get('/list')
  async findList(): Promise<RoomDTO[]> {
    this.logger.log(`Get Room List`);
    return this.roomService.findList();
  }

  @Get('/check')
  async duplicateCheck(@Query('room') id: string): Promise<boolean> {
    this.logger.log(`Check Id Data : ${id}`);
    return this.roomService.getRoom(id);
  }

  @Patch('/join')
  async joinRoom(@Body('roomName') room: string): Promise<RoomDTO> {
    this.logger.log(`Join Room : ${room}`);
    return this.roomService.joinRoom(room);
  }
}
