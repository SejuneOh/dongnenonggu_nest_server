import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @ApiProperty({ description: '생성 게시글 제목' })
  title: string;

  @IsString()
  @ApiProperty({ description: '생성 게시글 내용' })
  content: string;

  @IsString()
  @ApiProperty({ description: '농구장 주소' })
  location: string;

  @IsString()
  @ApiProperty({ description: '농구장 상세 주소' })
  locationDetail: string;

  @IsNumber()
  @ApiProperty({ description: '농구장 주소 지역번호' })
  zoneNumber: number;

  @IsNumber()
  @ApiProperty({ description: '필요 게스트 인원수' })
  guestCnt: number;

  @IsString()
  @ApiProperty({ description: '작성자 uuid' })
  writerId: string;

  @IsNumber()
  @ApiProperty({ description: '1인 게스트 비용' })
  price: number;

  @IsBoolean()
  @ApiProperty({ description: '야외, 실내 농구장 여부' })
  isOutdoor: boolean;
}
