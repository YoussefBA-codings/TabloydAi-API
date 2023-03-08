import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';

// Import Controllers
import { UserController } from '@/controllers/user.controller';
<<<<<<< HEAD
import { LoginController } from '@/controllers/login.controller';
import { AiController } from '@/controllers/ai.controller';
=======
import { LoginController } from './controllers/login.controller';
import { ConversionTokenController } from './controllers/conversionToken.controller';
>>>>>>> 4df5aa542bd8faadb682713de4ff596ffc77bcb0

// Import Services
import { UserService } from '@/services/user.service';
import { LoginService } from '@/services/login.service';
import { PrismaService } from '@/services/prisma.service';
import { FirebaseService } from '@/services/firebase.service';
import { EncryptService } from '@/services/encrypt.service';
<<<<<<< HEAD
import { AiService } from '@/services/ai.service';
=======
import { TwilioService } from './services/twilio.service';
import { TokenService } from './services/token.service';
>>>>>>> 4df5aa542bd8faadb682713de4ff596ffc77bcb0

// Import Middleware
import { PreAuthMiddleware } from '@/middlewares/auth.mw';
import { MulterModule } from '@nestjs/platform-express';

@Module({
<<<<<<< HEAD
  imports: [
    // MulterModule.register({ dest: './uploads' })
  ],
	controllers: [UserController, LoginController, AiController],
=======
	imports: [],
	controllers: [UserController, LoginController, ConversionTokenController],
>>>>>>> 4df5aa542bd8faadb682713de4ff596ffc77bcb0
	providers: [
		UserService,
		LoginService,
		PrismaService,
		FirebaseService,
		EncryptService,
<<<<<<< HEAD
    AiService
=======
		TwilioService,
		TokenService,
>>>>>>> 4df5aa542bd8faadb682713de4ff596ffc77bcb0
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
