import {
  Body,
  Controller,
  Post,
  Query,
  Get,
  Logger,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './DTOs/user.dto';
import { ResponseDTO } from 'src/common/DTOs/response.dto';
import { ResponseUtil } from 'src/utils/response.util';
import { LoginDTO } from './DTOs/login.dto';
import { IntegerType } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  private logger: Logger = new Logger('User');

  /**
   * 유저 생성
   * @param userDTO
   * @returns
   */
  @Post()
  async signUp(@Body() userDTO: UserDTO): Promise<ResponseDTO<UserDTO>> {
    return ResponseUtil.makeSuccessResponse(
      await this.userService.create(userDTO),
    );
  }

  /**
   * 유저정보 업데이트
   * @param user
   * @returns
   */
  @Patch()
  async updateUser(@Body() user: UserDTO): Promise<ResponseDTO<UserDTO>> {
    this.logger.log(
      `Update User : ${user.id} <-> ${user.userName} | ${user.userNickName}`,
    );
    return ResponseUtil.makeSuccessResponse(
      await this.userService.update(user),
    );
  }

  /**
   * 유저 아이디 중복 체크
   * @param id
   * @returns
   */
  @Get('/check')
  async duplicateCheck(@Query('id') id: string): Promise<boolean> {
    this.logger.log(`Check Id Data : ${id}`);
    return this.userService.getUser(id);
  }

  /**
   * 유저 로그인
   * @param id
   * @param pw
   * @returns
   */
  @Get('/login')
  async login(
    @Query('id') id: string,
    @Query('pw') pw: string,
  ): Promise<boolean> {
    this.logger.log(`User Login : ${id}`);
    return this.userService.login(id, pw);
  }

  /**
   * 유저 시퀀스 넘버
   * @param id
   * @returns
   */
  @Get('/id')
  async getId(@Query('id') id: string): Promise<IntegerType> {
    this.logger.log(`Search User Sequence ID : ${id}`);
    return this.userService.getSequenceId(id);
  }

  /**
   * 유저 프로필
   * @param id
   * @returns
   */
  @Get('/profile')
  async getProfile(@Query('id') id: number): Promise<UserDTO> {
    this.logger.log(`Get User Profile : ${id}`);
    return this.userService.userProfile(id);
  }
}
