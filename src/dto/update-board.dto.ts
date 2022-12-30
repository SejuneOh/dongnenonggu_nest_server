import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateBoardDto {
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

  @Type(() => Number)
  @IsNumber()
  price: number;

  @IsBoolean()
  isOutdoor: boolean;
}
