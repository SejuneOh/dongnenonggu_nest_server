import { IsDate, IsEmpty, isString, IsString, MinDate } from 'class-validator';
import { Optional } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';

// dto는 받을 데이터 유효성 검사 타입을 지정한다.
export class CreateUserDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly name: string;
}