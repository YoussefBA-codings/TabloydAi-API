import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod, } from '@nestjs/common';

// Import Controllers
import { UserController } from '@/controllers/user.controller';

// Import Services
import { UserService } from '@/services/user.service';
import { PrismaService } from '@/services/prisma.service';
import { FirebaseApp } from '@/services/firebase.service';
import { PreAuthMiddleware } from '@/middlewares/auth.mw';


@Module({
	imports: [],
	controllers: [UserController],
  providers: [UserService, PrismaService, FirebaseApp],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(PreAuthMiddleware).forRoutes({
      path: '/secure/*',
      method: RequestMethod.ALL,
    });
  }
}
