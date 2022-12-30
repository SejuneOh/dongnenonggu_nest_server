import { UpdateBoardDto } from './../dto/update-board.dto';
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
  Param,
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
    @Query('page') page: number,
    @Query('count') count: number,
  ) {
    return this.boardService.getBoardList(page, count);
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
  // @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateBoard(
    @Param('id') id: string,
    @Body() updateBoard: UpdateBoardDto,
  ) {
    return await this.boardService.update(id, updateBoard);
  }

  @Version('1')
  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletBoardById(@Param('id') id: number) {
    this.boardService.deleteBoardById(id);
  }

  // 게시물 다 삭제
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Delete('all')
  async deleteAllBoard() {
    // 삭제
    return await this.boardService.deleteAllBoard();
  }
}
