import { Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  //@Controller => define route Path / option : {host: "hostpath"}
  // @Version('1') => url path versioning
  // @HttpCode(200) => set status code
  // @Header('key: value': string) => set header option
  // @Redirect(url: string, code: number) or inject {"url": string, statusCode: number} => set redirected path
  // @Post('regist'), Get, Delete, Put, Patch, Option => http protocol type
  /*
  @description: token use host param
  @Controller({ host: ':account.example.com' })
  export class AccountController {
    @Get()
    getInfo(@HostParam('account') account: string) {
      return account;
    }
  }
*/
  /**
  @description: how to manage response
  @Post()
    getAll(@Res() res: Response){}
  */
}
