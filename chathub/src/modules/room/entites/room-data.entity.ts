// user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Unique,
} from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class RoomData {
  @PrimaryGeneratedColumn()
  roomDataId: number;

  @Column()
  connectUserId: number;

  @Column()
  connectUserName: string;

  @ManyToOne((type) => Room, (room) => room.roomdata, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roomId' }) // userId 컬럼의 이름을 변경
  room!: Room;

  @CreateDateColumn()
  createAt: Date; // 'create_at' 컬럼에 대한 기본값이 현재 시간으로 설정됩니다.

  @UpdateDateColumn()
  updateAt: Date; // 'update_at' 컬럼에 대한 기본값이 현재 시간으로 설정됩니다.
}
