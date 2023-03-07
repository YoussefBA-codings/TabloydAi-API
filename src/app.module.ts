import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';

// Import Controllers
import { UserController } from '@/controllers/user.controller';
import { LoginController } from '@/controllers/login.controller';
import { AiController } from '@/controllers/ai.controller';

// Import Services
import { UserService } from '@/services/user.service';
import { LoginService } from '@/services/login.service';
import { PrismaService } from '@/services/prisma.service';
import { FirebaseService } from '@/services/firebase.service';
import { EncryptService } from '@/services/encrypt.service';
import { AiService } from '@/services/ai.service';

// Import Middleware
import { PreAuthMiddleware } from '@/middlewares/auth.mw';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    // MulterModule.register({ dest: './uploads' })
  ],
	controllers: [UserController, LoginController, AiController],
	providers: [
		UserService,
		LoginService,
		PrismaService,
		FirebaseService,
		EncryptService,
    AiService
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): any {
		consumer
			.apply(PreAuthMiddleware)
			.exclude(
				...[
					{
						path: '/api/login',
						method: RequestMethod.POST,
					},
				],
			)
			.forRoutes(
				...[
					{
						path: '/api/*',
						method: RequestMethod.ALL,
					},
				],
			);
	}
}
