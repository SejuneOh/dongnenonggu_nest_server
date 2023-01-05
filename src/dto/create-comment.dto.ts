import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  @ApiProperty({ description: '댓글이 작성 된 게시글 번호' })
  boardNo: number;

  @IsString()
  @ApiProperty({ description: '댓글 작성자 uuid ' })
  writerId: string;

  @IsString()
  @ApiProperty({ description: '댓글 내용' })
  content: string;
}
