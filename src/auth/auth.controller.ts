import { HttpExceptionFilter } from './../http-exception/http-exception.filter';
import { UserService } from './../user/user.service';
import { CreateUserDto } from './../dto/create-user.dto';
import { LocalAuthGuard } from './local.auth-gaurd';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
  Version,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Version('1')
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    const access_token = await (
      await this.authService.login(req.user)
    ).access_token;

    return res
      .set({ access_token: access_token })
      .status(HttpStatus.OK)
      .json(user);
  }

  @Version('1')
  @Post('signout')
  async signOut(@Req() req: Request, @Res() res: Response) {
    const access_token = await (await this.authService.logout()).access_token;

    return res
      .set({ access_toke: access_token })
      .status(HttpStatus.OK)
      .json('');
  }

  @Version('1')
  @Post('signup')
  signUp(@Body() newUserData: CreateUserDto, @Res() res: Response) {
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
