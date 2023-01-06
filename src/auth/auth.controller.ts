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
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('권한 및 로그인, 로그아웃, 회원가입 API')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Version('1')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: '사용자 로그인',
    description:
      '사용자 email, password를 전달 받아 사용자 접근 토큰과 사용자 정보를 전달한다.',
  })
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @ApiCreatedResponse({
    status: 200,
    description:
      '사용자 고유 번호, 이메일, 닉네임을 전달한다. access 토큰은 헤더에 있다',
    schema: {
      example: {
        uuid: 'string',
        email: 'string',
        name: 'string',
      },
    },
  })
  @Post('signin')
  async signIn(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    const access_token = (await this.authService.login(req.user)).access_token;

    return res
      .set({ access_token: access_token })
      .status(HttpStatus.OK)
      .json(user);
  }

  @Version('1')
  @ApiOperation({
    summary: '사용자 로그아웃 Api',
    description: ' 사용자 로그아웃 시 jwt 초기화 해서 전달한다.',
  })
  @ApiResponse({
    status: 200,
    description:
      'JWT를 초기화 값을 받기 위한 함수일 뿐 클라이언트에서 초기화해도 상관없다.',
  })
  @Post('signout')
  async signOut(@Req() req: Request, @Res() res: Response) {
    const access_token = (await this.authService.logout()).access_token;

    return res
      .set({ access_toke: access_token })
      .status(HttpStatus.OK)
      .json('');
  }

  @Version('1')
  @ApiOperation({
    summary: '회원가입',
    description: '회원 정보를 받아 회원 가입한다.',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    status: 200,
    description: '회원가입 여부를 전달한다.',
    schema: {
      example: {
        data: {
          success: true,
          msg: '회원가입 성공',
        },
      },
    },
  })
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
