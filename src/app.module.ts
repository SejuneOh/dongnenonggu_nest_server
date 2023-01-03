import { UserController } from './user/user.controller';
import { UserMiddleware } from './user/user.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/user.schema';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.erwfvfc.mongodb.net/?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', () => {
            console.log('저장 이전에 사용한다.');
          });

          return schema;
        },
      },
    ]),
    UserModule,
    AuthModule,
    BoardModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .exclude() // 제외해야할 path 설정 {path: string, method: RequestMethod.POST}
      .forRoutes(UserController);
  }
}
