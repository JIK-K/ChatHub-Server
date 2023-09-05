// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
  createAt: string;

  @Column()
  updateAt: string;
}
