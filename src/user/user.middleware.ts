import { UserController } from './user.controller';
import { Injectable, NestMiddleware, Version, Body } from '@nestjs/common';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  @Version('1')
  use(req: any, res: any, next: () => void) {
    console.log('User Middle ware call');

    next();
  }
}
