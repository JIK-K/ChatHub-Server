// user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entites/user.entity';
import { RoomData } from './room-data.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  roomId: number;

  @Column()
  roomName: string;

  @Column()
  roomMaxUser: string;

  @Column()
  roomConnectUser: number;

  @Column()
  roomPassword: string;

  @ManyToOne((type) => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' }) // userId 컬럼의 이름을 변경
  user!: User;

  @OneToMany((type) => RoomData, (room) => room.room)
  roomdata!: RoomData[];

  @CreateDateColumn()
  createAt: Date; // 'create_at' 컬럼에 대한 기본값이 현재 시간으로 설정됩니다.

  @UpdateDateColumn()
  updateAt: Date; // 'update_at' 컬럼에 대한 기본값이 현재 시간으로 설정됩니다.
}
