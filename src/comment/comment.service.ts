import { CreateReplyDto } from './../dto/create-reply.dto';
import { CreateCommentDto } from './../dto/create-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Comment, CommentDocument } from './comment.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { BoardService } from 'src/board/board.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private readonly userService: UserService,
    private readonly boardService: BoardService,
  ) {}

  async createComment(param: CreateCommentDto) {
    // 게시글 확인
    const board = await this.boardService.findOneByBoardId(param.boardNo);
    if (!board) throw new NotFoundException('Can not found board');

    // 작성자 확인
    const user = await this.userService.findOneByUuid(param.writerId);
    if (!user) throw new NotFoundException('Can not found user');

    // index binding
    const index = await this.createNewCommentIdx();

    const newComment = new this.commentModel({
      commentId: index,
      boardNo: param.boardNo,
      writerId: param.writerId,
      cotent: param.content,
      deps: 0,
      order: 0,
      createAt: new Date(),
      deleteAt: null,
      group: index,
    });

    return newComment.save();
  }

  async creatReply(param: CreateReplyDto) {
    // 댓글 id로 댓글 리스트를 가져온다.
    const comments = await this.commentModel
      .find({ boardNo: param.boardNo, group: param.commentId })
      .sort({ deps: 1 });

    if (comments.length === 0)
      throw new NotFoundException('Can not found comment');

    // index 생성
    const index = await this.createNewCommentIdx();

    // 신규 reply 생성
    const newReply = new this.commentModel({
      commentId: index,
      boardNo: param.boardNo,
      writerId: param.writerId,
      cotent: param.content,
      deps: 1,
      order: comments[comments.length - 1].order + 1,
      createAt: new Date(),
      deleteAt: null,
      group: param.commentId,
    });

    return newReply.save();
  }

  async createNewCommentIdx(): Promise<number> {
    const lastComment = await this.commentModel
      .findOne()
      .sort({ commentId: -1 });

    // index binding
    const index = lastComment ? lastComment.commentId + 1 : 0;

    return index;
  }

  // todo: 2차원 배열로 comment 나눠서  response하기
  async getComments(boardNo: string) {
    return this.commentModel
      .find({ boardNo: parseInt(boardNo) })
      .sort({ order: 1 });
  }
}
