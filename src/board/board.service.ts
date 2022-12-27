import { Board, BoardDocument } from './board.schema';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBoardDto } from 'src/dto/create-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
  ) {}
  async createBoard(boardData: CreateBoardDto): Promise<BoardDocument> {
    const lastBoard = await this.boardModel.findOne().sort({ boardNo: -1 }); //-1 가장 최근값
    const index = lastBoard ? lastBoard.boardNo + 1 : 0;

    try {
      const createBoard = new this.boardModel({
        ...boardData,
        boardNo: index,
        commentId: 0,
        createAt: new Date(),
        updateAt: null,
        deleteAt: null,
      });

      return createBoard.save();
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
