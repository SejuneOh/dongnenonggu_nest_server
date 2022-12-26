import { UserModel } from './../models/user.model';
import { SearchUserDto } from './../dto/search-user.dto';
import { HttpExceptionFilter } from './../http-exception/http-exception.filter';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Post,
  Version,
  Get,
  Param,
  Query,
  NotFoundException,
  Res,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/local.auth-gaurd';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth-gaurd';

@Controller('user')
// @UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Version('1')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
}
