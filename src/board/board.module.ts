import { Board, boardSchema } from './board.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './../auth/jwt.strategy';
import { forwardRef, Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { UserModule } from 'src/user/user.module';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Board.name,
        schema: boardSchema,
      },
    ]),
    JwtModule,
    UserModule,
    forwardRef(() => CommentModule),
  ],
  providers: [BoardService, JwtStrategy],
  controllers: [BoardController],
  exports: [BoardService],
})
export class BoardModule {}
