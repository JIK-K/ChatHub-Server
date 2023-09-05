// user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
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

  @CreateDateColumn()
  createAt: Date; // 'create_at' 컬럼에 대한 기본값이 현재 시간으로 설정됩니다.

  @UpdateDateColumn()
  updateAt: Date; // 'update_at' 컬럼에 대한 기본값이 현재 시간으로 설정됩니다.
}
