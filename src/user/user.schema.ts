import { UserModel } from '../models/user.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
/**
 * @interface
 * @type(
 *  uuid: 사용자 고유 id;
 *  email: 사용자 로그인 이메일;
 *  name: 사용자 이름
 *  password: 비밀번호
 *  creatAt: 생성일자
 *  updateAt: 업데이트 날짜
 *  token: Access token
 *  salt: password hash salt
 *  image: user avatar image
 * )
 */

export type userDocument = HydratedDocument<UserModel>;

@Schema()
export class User {
  @Prop({ required: true })
  @ApiProperty({ description: 'id' })
  uuid: String;

  @Prop({ required: true })
  @ApiProperty({ description: 'email' })
  email: String;

  @Prop({ required: true })
  @ApiProperty({ description: '닉네임' })
  name: String;

  @Prop({ required: true })
  @ApiProperty({ description: '비밀번호' })
  password: String;

  @Prop({ type: Date, required: true })
  @ApiProperty({ description: '생성 날짜' })
  createAt: Date;

  @Prop()
  @ApiProperty({ description: '업데이트 날짜' })
  updateAt: Date;

  @Prop({ type: String, default: '' })
  @ApiProperty({ description: '사용자 아바타 이미지' })
  image: String;
}

export const UserSchema = SchemaFactory.createForClass(User);
