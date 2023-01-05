import { User } from './user.schema';
import { SearchUserDto } from './../dto/search-user.dto';
import { UserService } from './user.service';
import {
  Controller,
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
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.auth-gaurd';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('user')
@ApiTags('사용자 API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiOperation({
    summary: '모든 사용자 정보',
    description: 'JWT 토큰을 인증 후 모든 사용자 정보를 가져온다',
  }) //요약 및 설명
  @ApiBearerAuth('access_token')
  @ApiCreatedResponse({
    status: 200,
    description: '사용자 정보를 모두 가져온다.',
    type: User,
    isArray: true,
  })
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

    if (!params) {
      throw new NotFoundException("Can't found user");
    }

    if (!findUser)
      return res.status(HttpStatus.OK).json({ success: false, user: {} });

    return res.status(HttpStatus.OK).json({ success: true, user: findUser });
  }
}
