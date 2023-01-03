import { IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';

export class CreateReplyDto extends PartialType(CreateCommentDto) {
  @IsNumber()
  readonly commentId: number;
}
