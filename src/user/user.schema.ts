import { UserModel } from '../models/user.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
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
  uuid: String;

  @Prop({ required: true })
  email: String;

  @Prop({ required: true })
  name: String;

  @Prop({ required: true })
  password: String;

  @Prop({ type: Date, required: true })
  createAt: Date;

  @Prop()
  updateAt: Date;

  @Prop({ type: String, default: '' })
  token: String;

  @Prop({ type: String, default: '' })
  image: String;
}

export const UserSchema = SchemaFactory.createForClass(User);
