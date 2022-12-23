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
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';

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
  async searchUser(@Query() params: SearchUserDto) {
    if (!params) {
      throw new NotFoundException("Can't found user");
    }

    return await this.userService.findUser(params);
  }

  @Version('1')
  @Post('regist')
  register(@Body() newUserData: CreateUserDto) {
    console.log('user regist controller call');
    const result = this.userService.register(newUserData);

    return result;
  }
}
