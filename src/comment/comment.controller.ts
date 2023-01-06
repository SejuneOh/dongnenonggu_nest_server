import { Type } from 'class-transformer';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CreateCommentDto } from './../dto/create-comment.dto';
import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth-gaurd';
import { CommentService } from './comment.service';
import { CreateReplyDto } from 'src/dto/create-reply.dto';
import { Comment } from './comment.schema';

@Controller('comment')
@ApiTags(' 댓글 API')
export class CommentController {
  constructor(private readonly commentServcie: CommentService) {}

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '댓글 생성',
    description: '댓글 정보를 받아 댓글을 생성한다.',
  })
  @ApiBody({ type: CreateCommentDto })
  @ApiCreatedResponse({
    status: 200,
    description: '생성한 댓글 내용을 전달한다.',
    type: Comment,
  })
  @Post()
  async createComment(@Body() param: CreateCommentDto) {
    return this.commentServcie.createComment(param);
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '대댓글 생성 api',
    description: '부모 댓글 정보 및  댓글 내용을 전달 받아 대댓글 생성한다',
  })
  @ApiBody({ type: CreateReplyDto })
  @ApiCreatedResponse({
    status: 200,
    description: '생성한 대댓글 내용을 전달한다.',
    type: Comment,
  })
  @Post('reply')
  async createReply(@Body() param: CreateReplyDto) {
    return await this.commentServcie.creatReply(param);
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: '게시글 관련 댓글을 모두 가져온다',
    description: '게시글 id를 전달 받아서 관련 댓글 및 대댓글을 전달한다.',
  })
  @ApiParam({ name: 'id', type: String, description: '게시글 번호' })
  @ApiCreatedResponse({
    status: 200,
    description: '댓글 묶음인 group을 기준으로 댓글을 전달한다.',
    schema: {
      example: {
        data: [
          {
            group: 0,
            comments: [
              {
                _id: '63b51c1d7fe928b13a387ac1',
                commentId: 0,
                boardNo: 1,
                writerId: '400e4b02-a891-4e9c-b9e2-8d3ae3a3fcf6',
                writerName: '연희동커리',
                content: '작성자  댓글',
                deps: 0,
                order: 0,
                createAt: '2023-01-04T06:26:37.926Z',
                deleteAt: null,
                group: 0,
                __v: 0,
              },
            ],
          },
        ],
      },
    },
  })
  @Get(':id')
  async getComments(@Param('id') id: string) {
    return this.commentServcie.getComments(id);
  }
}
