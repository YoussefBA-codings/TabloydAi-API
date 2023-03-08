import { JwtPayload } from 'jsonwebtoken';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PrismaService } from '@/services/prisma.service';
import { TwilioService } from './twilio.service';
import { FirebaseService } from '@/services/firebase.service';
import { EncryptService } from '@/services/encrypt.service';
import { UserService } from '@/services/user.service';
import { TokenService } from '@/services/token.service';

@Injectable()
export class LoginService {
	constructor(
		private readonly userService: UserService,
		private readonly prisma: PrismaService,
		private readonly firebaseApp: FirebaseService,
		private readonly twilio: TwilioService,
		private readonly tokenService: TokenService,
	) {}

	async login(userName, password): Promise<string> {
		let idToken: string;
		const user = await this.prisma.user.findFirstOrThrow({
			where: { userName },
		});

		if (EncryptService.decrypt(password, user.password)) {
			idToken = await this.firebaseApp.signIn(user.id, { expiresIn: 1 });
		} else throw new UnauthorizedException('Invalid password');

		return idToken;
	}

	async preRegistration(credential): Promise<string> {
		let newUser = {
			...credential,
			role: 'basic',
		};

		await this.twilio.verifySmsOrEmailRequest('email', newUser.email);
		return await this.tokenService.getToken(newUser);
	}

	async registration(registrationToken, verificationCode): Promise<boolean> {
		let credential: JwtPayload = await this.tokenService.decodeToken(
			registrationToken,
		);

		await this.twilio.verifySmsOrEmailResult(
			verificationCode,
			credential.email,
		);

		let newUser = {
			email: credential.email,
			userName: credential.userName,
			password: credential.password,
			role: 'basic',
		};

		this.userService.createUser({ data: newUser });

		return true;
	}
}
