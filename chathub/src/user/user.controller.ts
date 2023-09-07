import { Body, Controller, Post, Query, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './DTOs/user.dto';
import { ResponseDTO } from 'src/common/DTOs/response.dto';
import { ResponseUtil } from 'src/utils/response.util';
import { LoginDTO } from './DTOs/login.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async signUp(@Body() userDTO: UserDTO): Promise<ResponseDTO<UserDTO>> {
    return ResponseUtil.makeSuccessResponse(
      await this.userService.create(userDTO),
    );
  }

  @Get('/login')
  async login(
    @Query('id') id: string,
    @Query('pw') pw: string,
  ): Promise<boolean> {
    return this.userService.login(id, pw);
  }
}
