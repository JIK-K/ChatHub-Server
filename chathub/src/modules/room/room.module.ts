import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../entites/room.entity';
import { RoomMapper } from '../mapper/room.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  controllers: [RoomController],
  providers: [RoomService, RoomMapper],
  exports: [RoomService, RoomMapper],
})
export class RoomModule {}
