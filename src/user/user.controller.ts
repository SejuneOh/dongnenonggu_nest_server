import { SearchUserDto } from './../dto/search-user.dto';
import { HttpExceptionFilter } from './../http-exception/http-exception.filter';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Post,
  UseFilters,
  Version,
  Get,
  Param,
  Query,
  NotFoundException,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { Response } from 'express';

@Controller('user')
// @UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Version('1')
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }
  @Version('1')
  @Get('uuid/:id')
  findUserkey(@Param('id') uuid: string) {
    return this.userService.findUserKey(uuid);
  }

  @Version('1')
  @Get('search')
  async searchUser(@Query() params: SearchUserDto, @Res() res: Response) {
    const findUser = await this.userService.findUser(params);

    console.log(`this controller find user ${findUser}`);

    if (!params) {
      throw new NotFoundException("Can't found user");
    }

    if (!findUser)
      return res.status(HttpStatus.OK).json({ success: false, user: {} });

    return res.status(HttpStatus.OK).json({ success: true, user: findUser });
  }

  @Version('1')
  @Post('regist')
  register(@Body() newUserData: CreateUserDto, @Res() res: Response) {
    console.log('user regist controller call');
    const result = this.userService.register(newUserData);

    if (result) {
      return res
        .status(HttpStatus.OK)
        .json({ success: true, msg: '회원가입 성공' });
    } else {
      return res
        .status(HttpStatus.OK)
        .json({ success: fail, msg: '회원가입 실패' });
    }
  }
}
