import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  boardNo: number;

  @IsString()
  writerId: string;

  @IsString()
  content: string;
}
