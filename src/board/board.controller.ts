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
import { Board, BoardDocument } from './board.schema';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBody,
} from '@nestjs/swagger';

@Controller('board')
@ApiTags('게시글 API')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @Get('paging')
  async getPagingList(
    @Query('page') page: number,
    @Query('count') count: number,
  ) {
    return this.boardService.getBoardList(page, count);
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @Get(':id')
  async getOneBoard() {}

  // create
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({ summary: '게시글 등록', description: '게시들 등록 api ' })
  @ApiCreatedResponse({
    status: 200,
    description:
      '게시글 정보를 게시글 내용을 전달 받아 새로운 게시글을 등록한다.',
    type: Board,
  })
  @ApiBody({ type: CreateBoardDto })
  @Post()
  async createBoard(@Body() param: CreateBoardDto): Promise<BoardDocument> {
    return await this.boardService.createBoard(param);
  }

  // 게시글 업데이트
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @Put(':id')
  async updateBoard(
    @Param('id') id: string,
    @Body() updateBoard: UpdateBoardDto,
  ) {
    return await this.boardService.update(id, updateBoard);
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @Delete(':id')
  async deletBoardById(@Param('id') id: number) {
    this.boardService.deleteBoardById(id);
  }

  // 게시물 다 삭제
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @Delete('all')
  async deleteAllBoard() {
    // 삭제
    return await this.boardService.deleteAllBoard();
  }
}
