import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { User } from 'src/user/user.schema';

export type BoardDocument = HydratedDocument<Board>;

@Schema()
export class Board extends Document {
  @Prop({ unique: true, required: true })
  boardNo: number; //게시글 id

  @Prop({ required: true })
  title: string; // 제목

  @Prop({ required: true })
  content: string; // 내용

  @Prop({ required: true })
  location: string; // 경기장 위치

  @Prop({ required: true })
  locationDetail: string; // 상세주소

  @Prop({ require: true, type: mongoose.SchemaTypes.Number })
  zoneNumber: number;

  @Prop({ require: true, type: mongoose.SchemaTypes.Number })
  guestCnt: number;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'users',
    users: User,
  })
  writerId: string; //  작성자 id

  @Prop()
  commentId: number; // 댓글 id

  @Prop({ required: true, type: mongoose.SchemaTypes.Number })
  price: number;

  @Prop({ required: true, type: mongoose.SchemaTypes.Boolean })
  isOutdoor: boolean;

  @Prop({ type: mongoose.SchemaTypes.Date })
  createAt: Date;

  @Prop({ type: mongoose.SchemaTypes.Date })
  updateAt: Date;

  @Prop({ type: mongoose.SchemaTypes.Date })
  deleteAt: Date;
}

export const boardSchema = SchemaFactory.createForClass(Board);
