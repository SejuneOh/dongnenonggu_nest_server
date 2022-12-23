import { isEmpty } from 'class-validator';
import { SearchUserDto } from './../dto/search-user.dto';
import { UserModel } from './../models/user.model';
import { CreateUserDto } from './../dto/create-user.dto';
import { Injectable, NotFoundException, Version } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, userDocument } from './user.schema';
import { funHash } from 'src/crypt/hash.service';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<userDocument>) {}

  @Version('1')
  async findAll(): Promise<User[]> {
    return this.userModel.find({}, { email: 1, name: 2, uuid: 3 }).exec();
  }

  @Version('1')
  async findUser(params: SearchUserDto): Promise<UserModel> {
    let searchParam = {};
    for (const el in params) {
      if (params[el])
        searchParam = {
          ...searchParam,
          [el]: params[el],
        };
    }

    const findUser = await this.userModel.findOne(
      { ...searchParam },
      { email: 1, name: 2, uuid: 3 },
    );

    if (isEmpty(findUser)) {
      throw new NotFoundException(`Can't Found User`);
    }

    return findUser;
  }

  @Version('1')
  async findUserKey(uuid: string): Promise<UserModel> {
    const findUser = this.userModel.findOne(
      { uuid },
      { email: 1, name: 2, uuid: 3 },
    );

    if (!findUser) {
      new NotFoundException(`Cannot Found User ${uuid}`);
    }

    return findUser;
  }

  @Version('1')
  async register(user: CreateUserDto): Promise<UserModel> {
    // hash 비밀번호
    const hash = await funHash(user.password);
    const uuid = uuidv4();
    const createUser = new this.userModel({
      ...user,
      password: hash,
      uuid,
      createAt: new Date(),
    });

    return createUser.save();
  }
}
