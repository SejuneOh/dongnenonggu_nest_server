import { IsNumber } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';

export class CreateReplyDto extends PartialType(CreateCommentDto) {
  @IsNumber()
  @ApiProperty({ description: '답글이 작성된 댓글 고유 id' })
  readonly commentId: number;
}
