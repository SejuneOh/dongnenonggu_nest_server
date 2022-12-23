import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';

export class SearchUserDto {
  @IsString()
  @Optional()
  email: string;

  @IsString()
  @Optional()
  name: string;

  @IsString()
  @Optional()
  uuid: string;
}
