import { JwtService } from '@nestjs/jwt';
import { isHashValid } from './../crypt/hash.service';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const findUser = await this.userService.fineOne(email);

    if (findUser && (await isHashValid(pass, findUser.password))) {
      return findUser;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
