import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { User } from 'src/user/user.schema';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { ApiProperty } from '@nestjs/swagger';

export type BoardDocument = HydratedDocument<Board>;

@Schema()
export class Board extends Document {
  @Prop({ unique: true, required: true })
  @ApiProperty({ description: '게시글 고유 번호' })
  boardNo: number; //게시글 id

  @Prop({ required: true })
  @ApiProperty({ description: '게시글 제목' })
  title: string; // 제목

  @Prop({ required: true })
  @ApiProperty({ description: '게시글 내용' })
  content: string; // 내용

  @Prop({ required: true })
  @ApiProperty({ description: '농구장 주소' })
  location: string; // 경기장 위치

  @Prop({ required: true })
  @ApiProperty({ description: '농구장 상세 주소' })
  locationDetail: string; // 상세주소

  @Prop({ require: true, type: mongoose.SchemaTypes.Number })
  @ApiProperty({ description: '농구장 지역번호 ' })
  zoneNumber: number;

  @Prop({ require: true, type: mongoose.SchemaTypes.Number })
  @ApiProperty({ description: '게스트 인원 수' })
  guestCnt: number;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'users',
    users: User,
  })
  @ApiProperty({ description: '게시글 작성자 uuid' })
  writerId: string; //  작성자 id

  @Prop()
  @ApiProperty({ description: '작성자 닉네임' })
  writerName: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.Number })
  @ApiProperty({ description: '게스트 비용' })
  price: number;

  @Prop({ required: true, type: mongoose.SchemaTypes.Boolean })
  @ApiProperty({ description: '야외, 실내 여부' })
  isOutdoor: boolean;

  @Prop({ type: mongoose.SchemaTypes.Date })
  @ApiProperty({ description: '게시글 생성 날짜' })
  createAt: Date;

  @Prop({ type: mongoose.SchemaTypes.Date })
  @ApiProperty({ description: '게시들 업데이트 날짜' })
  updateAt: Date;

  @Prop({ type: mongoose.SchemaTypes.Date })
  @ApiProperty({ description: '게시글 삭제 날짜' })
  deleteAt: Date;
}

const objSchema = SchemaFactory.createForClass(Board);
objSchema.plugin(mongoosePaginate);

export const boardSchema = objSchema;
