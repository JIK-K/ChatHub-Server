import { Body, Controller, Post, Query, Get, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './DTOs/user.dto';
import { ResponseDTO } from 'src/common/DTOs/response.dto';
import { ResponseUtil } from 'src/utils/response.util';
import { LoginDTO } from './DTOs/login.dto';
import { IntegerType } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  private logger: Logger = new Logger('Login');

  @Post()
  async signUp(@Body() userDTO: UserDTO): Promise<ResponseDTO<UserDTO>> {
    return ResponseUtil.makeSuccessResponse(
      await this.userService.create(userDTO),
    );
  }

  @Get('/check')
  async duplicateCheck(@Query('id') id: string): Promise<boolean> {
    this.logger.log(`Check Id Data : ${id}`);
    return this.userService.getUser(id);
  }

  @Get('/login')
  async login(
    @Query('id') id: string,
    @Query('pw') pw: string,
  ): Promise<boolean> {
    this.logger.log(`User Login : ${id}`);
    return this.userService.login(id, pw);
  }

  @Get('/id')
  async getId(@Query('id') id: string): Promise<IntegerType> {
    this.logger.log(`Search User Sequence ID : ${id}`);
    return this.userService.getSequenceId(id);
  }

  @Get('/profile')
  async getProfile(@Query('id') id: string): Promise<UserDTO> {
    this.logger.log(`Get User Profile : ${id}`);
    return this.userService.userProfile(id);
  }
}
