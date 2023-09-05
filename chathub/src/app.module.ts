import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MysqlModule } from './mysql/mysql.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MysqlModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
