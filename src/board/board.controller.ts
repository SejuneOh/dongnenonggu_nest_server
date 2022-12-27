import { JwtAuthGuard } from 'src/auth/jwt.auth-gaurd';
import {
  Body,
  Controller,
  Put,
  UseGuards,
  Version,
  Post,
  Get,
  Delete,
  Query,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from 'src/dto/create-board.dto';
import { BoardDocument } from './board.schema';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  //  get all board list
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {}

  @Version('1')
  // @UseGuards(JwtAuthGuard)
  @Get('paging')
  async getPagingList(
    @Query('condition') condition: string,
    @Query('page') page: number,
    @Query('count') count: number,
  ) {
    return this.boardService.getBoardList(condition, page, count);
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOneBoard() {}

  // create
  @Version('1')
  // @UseGuards(JwtAuthGuard)
  @Post()
  async createBoard(@Body() param: CreateBoardDto): Promise<BoardDocument> {
    return await this.boardService.createBoard(param);
  }

  // 게시글 업데이트
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Put()
  async updateBoard() {}

  // id로 baord id 삭제
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteBoard() {}

  // 게시물 다 삭제
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteAllBoard() {}
}
