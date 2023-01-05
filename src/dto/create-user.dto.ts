import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

// dto는 받을 데이터 유효성 검사 타입을 지정한다.
export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: '가입 이메일' })
  readonly email: string;

  @IsString()
  @ApiProperty({ description: '가입 회원 비밀번호' })
  readonly password: string;

  @IsString()
  @ApiProperty({ description: '가입 닉네임' })
  readonly name: string;
}
