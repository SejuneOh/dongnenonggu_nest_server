import { User } from 'src/user/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Board } from 'src/board/board.schema';
import { ApiProperty } from '@nestjs/swagger';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ unique: true, required: true })
  @ApiProperty({ description: '댓글 고유 id' })
  commentId: number;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'boards',
    boards: Board,
  })
  @ApiProperty({ description: '댓글이 속한 게시글 고유 번호' })
  boardNo: number;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'users',
    users: User,
  })
  @ApiProperty({ description: '댓글 작성자 고유 id' })
  writerId: string;

  @Prop()
  @ApiProperty({ description: '댓글 작성자 이름' })
  writerName: string;

  @Prop({ required: true })
  @ApiProperty({ description: '댓글 내용' })
  content: string;

  @Prop()
  @ApiProperty({ description: '댓글의 대댓글 기준 깊이' })
  deps: number;

  @Prop()
  @ApiProperty({ description: '댓글의 순서' })
  order: number;

  @Prop()
  @ApiProperty({ description: '생성일' })
  createAt: Date;

  @Prop()
  @ApiProperty({ description: '삭제일' })
  deleteAt: Date;

  @Prop()
  @ApiProperty({ description: '댓글의 속한 부모 댓글 고유 id' })
  group: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
