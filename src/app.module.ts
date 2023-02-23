import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';

// Import Controllers
import { UserController } from '@/controllers/user.controller';
import { LoginController } from './controllers/login.controller';

// Import Services
import { UserService } from '@/services/user.service';
import { LoginService } from '@/services/login.service';
import { PrismaService } from '@/services/prisma.service';
import { FirebaseService } from '@/services/firebase.service';
import { EncryptService } from '@/services/encrypt.service';
import { TwilioService } from './services/twilio.service';
import { TokenService } from './services/token.service';

// Import Middleware
import { PreAuthMiddleware } from '@/middlewares/auth.mw';

@Module({
	imports: [],
	controllers: [UserController, LoginController],
	providers: [
		UserService,
		LoginService,
		PrismaService,
		FirebaseService,
		EncryptService,
		TwilioService,
		TokenService,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): any {
		consumer
			.apply(PreAuthMiddleware)
			.exclude(
				...[
					{
						path: '/api/pre-registration',
						method: RequestMethod.POST,
					},
					{
						path: '/api/registration',
						method: RequestMethod.POST,
					},
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
