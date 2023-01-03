import { CreateCommentDto } from './../dto/create-comment.dto';
import {
  Body,
  Controller,
  Logger,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth-gaurd';
import { CommentService } from './comment.service';
import { CreateReplyDto } from 'src/dto/create-reply.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentServcie: CommentService) {}

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Post()
  async createComment(@Body() param: CreateCommentDto) {
    return this.commentServcie.createComment(param);
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Post('reply')
  async createReply(@Body() param: CreateReplyDto) {
    return await this.commentServcie.creatReply(param);
  }
}
