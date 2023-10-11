import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MysqlModule } from './mysql/mysql.module';
import { UserModule } from './modules/user/user.module';
import { RoomModule } from './modules/room/room.module';

@Module({
  imports: [MysqlModule, UserModule, RoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
