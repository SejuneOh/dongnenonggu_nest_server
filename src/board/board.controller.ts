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
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { type } from 'os';

@Controller('board')
@ApiTags('게시글 API')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: 'Pagination 적용한 게시글 리스트를 전달한다.',
    description:
      '사용자가 전달한 필요 게시글 개수를 기준으로한 페이징 정보 및 게시글 내용을 전달한다.',
  })
  @ApiQuery({ name: 'page', required: true, description: '페이지 수' })
  @ApiQuery({ name: 'count', required: true, description: '필요 게시글 수' })
  @ApiCreatedResponse({
    status: 200,
    description: '페이징 적용한 게시글 내용을 전달한다.',
    schema: {
      example: {
        docs: [
          {
            _id: '63afd80b958c68f77f501967',
            boardNo: 2,
            title: '게스트 테스트 ',
            content: '테스트 ',
            location: '강원 강릉시 가작로 6',
            locationDetail: ' 농구장',
            zoneNumber: 25511,
            guestCnt: 2,
            writerId: '400e4b02-a891-4e9c-b9e2-8d3ae3a3fcf6',
            writerName: '연희동커리',
            commentId: 0,
            price: 10000,
            isOutdoor: true,
            createAt: '2022-12-31T06:34:51.934Z',
            updateAt: '2023-01-03T11:01:14.061Z',
            deleteAt: null,
          },
        ],
        totalDocs: 21,
        limit: 12,
        totalPages: 1,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: true,
        hasNextPage: true,
        prevPage: null,
        nextPage: null,
      },
    },
  })
  @Get('paging')
  async getPagingList(
    @Query('page') page: number,
    @Query('count') count: number,
  ) {
    return this.boardService.getBoardList(page, count);
  }

  // @Version('1')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('access_token')
  // @Get(':id')
  // async getOneBoard() {}

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
  @ApiOperation({
    summary: '게시글 업데이트',
    description: '게시들 등록  업데이트 api ',
  })
  @ApiCreatedResponse({
    status: 200,
    description: '게시글 업데이트 내용을 전달 받아, 게시글을 업데이트 한다.',
    type: Board,
  })
  @ApiParam({ name: 'id', description: '게시글 번호' })
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
  @ApiOperation({
    summary: '특정 게시글 삭제하기',
    description: '게시글 번호를 통해서 특정 게시글 삭제 api ',
  })
  @ApiParam({ name: 'id', description: '게시글 번호' })
  @ApiCreatedResponse({
    status: 200,
    description: '삭제 성고 시 status 200이 외에는 모두 삭제 실패',
  })
  @Delete(':id')
  async deletBoardById(@Param('id') id: number) {
    this.boardService.deleteBoardById(id);
  }

  // 게시물 다 삭제
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '게시글 전부 삭제',
    description: '게시글 전부 삭제 api',
  })
  @ApiCreatedResponse({
    status: 200,
    description: '게시글 전부 삭제 완료시 status 200',
  })
  @Delete('all')
  async deleteAllBoard() {
    // 삭제
    return await this.boardService.deleteAllBoard();
  }
}
