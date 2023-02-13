import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@/services/prisma.service';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

import { EncryptService } from '@/services/encrypt.service';
import { FirebaseService } from '@/services/firebase.service';

@Injectable()
export class LoginService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly firebaseApp: FirebaseService,
	) {}

	async login(userName, password): Promise<any> {
		let idToken: any;
		const user = await this.prisma.user.findFirstOrThrow({
			where: { userName },
		});

		if (EncryptService.decrypt(password, user.password)) {
			idToken = await this.firebaseApp.signIn(user.id, { expiresIn: 1 });
		} else throw new UnauthorizedException('Invalid password');

		return idToken;
	}
}
