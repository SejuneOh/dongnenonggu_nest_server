import { User } from 'src/user/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Board } from 'src/board/board.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ unique: true, required: true })
  commentId: number;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'boards',
    boards: Board,
  })
  boardNo: number;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'users',
    users: User,
  })
  writerId: string;

  @Prop()
  writerName: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  deps: number;

  @Prop()
  order: number;

  @Prop()
  createAt: Date;

  @Prop()
  deleteAt: Date;

  @Prop()
  group: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
