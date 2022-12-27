import { Board, boardSchema } from './board.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './../auth/jwt.strategy';
import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Board.name,
        schema: boardSchema,
      },
    ]),
    JwtModule,
  ],
  providers: [BoardService, JwtStrategy],
  controllers: [BoardController],
  exports: [BoardModule],
})
export class BoardModule {}
