// user.entity.ts
import { Room } from 'src/modules/room/entites/room.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  userId: string;

  @Column()
  userPassword: string;

  @Column()
  userEmail: string;

  @Column()
  userBirthday: string;

  @Column()
  userPhoneNumber: string;

  @Column()
  userNickName: string;

  @Column()
  salt: string;

  @OneToMany((type) => Room, (room) => room.roomId)
  room!: Room[];

  @CreateDateColumn()
  createAt: Date; // 'create_at' 컬럼에 대한 기본값이 현재 시간으로 설정됩니다.

  @UpdateDateColumn()
  updateAt: Date; // 'update_at' 컬럼에 대한 기본값이 현재 시간으로 설정됩니다.
}
