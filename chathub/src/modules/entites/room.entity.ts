// user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/entites/user.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  roomId: number;

  @Column()
  roomName: string;

  @Column()
  roomMaxUser: string;

  @Column()
  roomConnectUser: string;

  @Column()
  roomPassword: string;

  @ManyToOne((type) => User, (user) => user.id, { onDelete: 'CASCADE' })
  userid!: number;

  @CreateDateColumn()
  createAt: Date; // 'create_at' 컬럼에 대한 기본값이 현재 시간으로 설정됩니다.

  @UpdateDateColumn()
  updateAt: Date; // 'update_at' 컬럼에 대한 기본값이 현재 시간으로 설정됩니다.
}
