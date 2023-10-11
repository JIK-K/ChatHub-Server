import { Body, Controller, Logger, Post } from '@nestjs/common';
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
        ' fk: ' +
        roomDTO.userId,
    );
    return ResponseUtil.makeSuccessResponse(
      await this.roomService.create(roomDTO),
    );
  }
}