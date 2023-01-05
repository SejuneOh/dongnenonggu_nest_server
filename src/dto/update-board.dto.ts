import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateBoardDto {
  @IsString()
  @ApiProperty({ description: '게시글 변경 제목' })
  title: string;

  @IsString()
  @ApiProperty({ description: '게시글 변경 내용' })
  content: string;

  @IsString()
  @ApiProperty({ description: '농구장 변경 주소' })
  location: string;

  @IsString()
  @ApiProperty({ description: '농구장 상세주소 변경내용' })
  locationDetail: string;

  @IsNumber()
  @ApiProperty({ description: '변경 지역번호' })
  zoneNumber: number;

  @IsNumber()
  @ApiProperty({ description: '변경할 게스트 인원 수' })
  guestCnt: number;

  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: '변경할 게스트 비용' })
  price: number;

  @IsBoolean()
  @ApiProperty({ description: '실내, 야외 변경 내용 true: 야외, false: 실내' })
  isOutdoor: boolean;
}
