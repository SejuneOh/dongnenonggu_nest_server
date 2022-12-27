import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  location: string;

  @IsString()
  locationDetail: string;

  @IsNumber()
  zoneNumber: number;

  @IsNumber()
  guestCnt: number;

  @IsString()
  writerId: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  isOutdoor: boolean;
}
