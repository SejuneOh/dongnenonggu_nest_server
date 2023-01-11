import { UpdateBoardDto } from './../dto/update-board.dto';
import { Board, BoardDocument } from './board.schema';
import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { CreateBoardDto } from 'src/dto/create-board.dto';
import { UserService } from 'src/user/user.service';
import { CommentService } from 'src/comment/comment.service';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    @InjectModel(Board.name)
    private boardModelPge: PaginateModel<BoardDocument>,
    private userService: UserService,
    @Inject(forwardRef(() => CommentService))
    private commentService: CommentService,
  ) {}
  async createBoard(boardData: CreateBoardDto): Promise<BoardDocument> {
    const lastBoard = await this.boardModel.findOne().sort({ boardNo: -1 }); //-1 가장 최근값
    const index = lastBoard ? lastBoard.boardNo + 1 : 0;
    const user = await this.userService.findUserKey(boardData.writerId);

    try {
      const createBoard = new this.boardModel({
        ...boardData,
        writerName: user.name,
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

  async getBoardList(page: number, count: number) {
    const pageNaitonDoc = await this.boardModelPge.paginate(
      {},
      { sort: { createAt: -1 }, limit: count, page },
    );

    return pageNaitonDoc;
  }

  async deleteBoardById(id: number) {
    const board = await this.boardModel.findOne({ boardNo: id });

    if (!board) {
      throw new NotFoundException('Cant Found Board item');
    }

    // comment 삭제
    this.commentService.deleteCommentByBoardId(id);

    return await this.boardModel.deleteOne({ boardNo: id });
  }

  async deleteAllBoard() {
    const result = await this.boardModel.deleteMany({});

    return result;
  }

  async update(id: string, updateData: UpdateBoardDto) {
    const findBoard = await this.boardModel.findOne({ boardNo: parseInt(id) });

    if (!findBoard) {
      throw new NotFoundException("Can't found board");
    }

    const _id = findBoard._id;

    return await this.boardModel
      .findByIdAndUpdate(_id, {
        ...updateData,
        updateAt: new Date(),
      })
      .setOptions({ overwrite: false, new: true });
  }

  async findOneByBoardId(boardNo: number) {
    return await this.boardModel.findOne({ boardNo }).exec();
  }
}
